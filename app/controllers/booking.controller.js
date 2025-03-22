const db = require("../models");
const Booking = db.booking;
const Customer = db.customer;
const Room = db.room;
const RoomType = db.roomtype;
const Status = db.status;
const Op = db.Sequelize.Op;
const { sendResponse } = require("../public/common");
const { v4: uuidv4 } = require("uuid");
const sendBookingEmail = require("../services/emailService");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { search } = req.query;
            const whereClause = {
                status: { [Op.not]: ["Completed", "Canceled"] },
            };


            if (search) {
                whereClause[Op.or] = [{ '$customer.name$': { [Op.like]: `%${search}%` } }];
            }

            const bookings = await Booking.findAll({
                where: whereClause,
                include: [
                    {
                        model: Room,
                        as: "room",
                        attributes: [
                            "id", "name", "price_per_night", "amount_adult", "amount_child", "status",
                            "type_of_room_id", "created_at", "updated_at"
                        ],
                        include: [
                            {
                                model: RoomType,
                                as: "roomType",
                                attributes: ["id", "name"]
                            }
                        ]
                    },
                    {
                        model: Customer,
                        as: "customer",
                        attributes: ["id", "name", "phone", "email", "country", "passport", "created_at", "updated_at"]
                    },
                    {
                        model: Status,
                        as: "roomStatus",
                        attributes: ["id", "status", "status_name"]
                    }
                ],
            });

            return sendResponse(res, 200, bookings, "Lấy danh sách đặt phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách đặt phòng");
        }
    },

    create: async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try {
            const { room_id, customer_id, amount_night, check_in, check_out, discount, customer_email } = req.body;
            const room = await Room.findByPk(room_id, {
                attributes: ["id", "name", "price_per_night"],
                transaction
            });
            if (!room) {
                return sendResponse(res, 404, null, "Phòng không tồn tại");
            }
            const total_price = (room.price_per_night * amount_night) - (room.price_per_night * amount_night * (discount / 100));
            const status = 'Pending';
            const newBooking = await Booking.create({
                id: uuidv4(),
                room_id,
                customer_id,
                amount_night,
                check_in,
                check_out,
                status,
                total_price,
                discount: discount || 0,
            }, { transaction });
            await room.update({ status: 2 }, { transaction });
            const responseCustomer = await Customer.findByPk(newBooking.customer_id, {
                attributes: ["id", "name", "email", "phone"],
                transaction
            });
            const responseRoom = await Room.findByPk(newBooking.room_id, {
                attributes: ["id", "name", "price_per_night", "type_of_room_id"],
                transaction
            });
            const responseRoomType = await RoomType.findByPk(responseRoom.type_of_room_id, {
                attributes: ["id", "name", "description"],
                transaction
            });
            await sendBookingEmail(customer_email, {
                booking: newBooking,
                customer: responseCustomer,
                room: responseRoom,
                roomType: responseRoomType
            });
            await transaction.commit();
            return sendResponse(res, 201, {
                booking: newBooking,
                customer: responseCustomer,
                room: responseRoom,
                roomType: responseRoomType
            }, "Đặt phòng thành công, email đã được gửi!");
        } catch (error) {
            await transaction.rollback();
            console.error("❌ Lỗi khi tạo booking:", error);
            return sendResponse(res, 500, null, "Lỗi khi tạo booking");
        }
    },

    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.findByPk(id, {
                include: [
                    { model: Customer, as: "customer" },
                    { model: Room, as: "room" },
                    {
                        model: Status,
                        as: "roomStatus",
                        attributes: ["id", "status", "status_name"]
                    }
                ],
            });
            if (!booking) {
                return sendResponse(res, 404, null, "Không tìm thấy đặt phòng");
            }
            return sendResponse(res, 200, booking, "Lấy thông tin đặt phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy thông tin đặt phòng");
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await Booking.update(req.body, { where: { id } });
            if (!updated) {
                return sendResponse(res, 400, null, "Cập nhật đặt phòng thất bại");
            }
            const updatedBooking = await Booking.findByPk(id);
            return sendResponse(res, 200, updatedBooking, "Cập nhật đặt phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật đặt phòng");
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Booking.destroy({ where: { id } });

            if (!deleted) {
                return sendResponse(res, 400, null, "Xóa đặt phòng thất bại");
            }
            return sendResponse(res, 200, null, "Xóa đặt phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa đặt phòng");
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                return sendResponse(res, 400, null, "Trạng thái không hợp lệ");
            }
            const [updated] = await Booking.update({ status }, { where: { id } });
            if (!updated) {
                return sendResponse(res, 400, null, "Cập nhật trạng thái thất bại");
            }
            const updatedBooking = await Booking.findByPk(id);
            return sendResponse(res, 200, updatedBooking, "Cập nhật trạng thái thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật trạng thái");
        }
    },

};
