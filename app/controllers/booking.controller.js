const db = require("../models");
const Booking = db.booking;
const Customer = db.customer;
const Room = db.room;
const RoomType = db.roomtype;
const Status = db.status;
const Op = db.Sequelize.Op;
const { sendResponse } = require("../public/common");
const { v4: uuidv4 } = require("uuid");

module.exports = {

    getAll: async (req, res) => {
        try {
            const { search } = req.query;

            const whereClause = {};

            if (search) {
                whereClause[Op.or] = [
                    { '$customer.name$': { [Op.like]: `%${search}%` } }
                ];
            }

            const bookings = await Booking.findAll({
                where: search ? whereClause : {},
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
            return sendResponse(
                res,
                200,
                bookings,
                "Lấy danh sách đặt phòng thành công"
            );
        } catch (error) {
            return sendResponse(
                res,
                500,
                error,
                "Lỗi khi lấy danh sách đặt phòng"
            );
        }
    },

    create: async (req, res) => {
        try {
            const { room_id, customer_id, amount_night, check_in, check_out, discount } = req.body;

            const room = await Room.findByPk(room_id, {
                attributes: ["price_per_night"]
            });
            if (!room) {
                return res.status(404).json({ message: "Phòng không tồn tại" });
            }
            const total_price = (room.price_per_night * amount_night) - (room.price_per_night * amount_night * (discount / 100));
            const waitConfirm = 2
            const status = waitConfirm
            const newBooking = await Booking.create({
                id: uuidv4(),
                room_id,
                customer_id,
                amount_night,
                check_in,
                check_out,
                status,
                total_price,
                discount: 0
            });

            return sendResponse(
                res,
                201,
                newBooking,
                "Đặt phòng thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo booking", error });
        }
    },

    findOne: async (req, res) => {
        const id = req.params.id;
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

        if (booking) {
            return sendResponse(res, 200, booking, "Lấy thông tin đặt phòng thành công");
        } else {
            return res.status(404).json({ message: "Booking not found" });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const [updated] = await Booking.update(req.body, {
            where: { booking_id: id }
        });

        if (updated) {
            return res.json({ message: "Booking updated successfully" });
        } else {
            return res.status(400).json({ message: "Failed to update booking" });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deleted = await Booking.destroy({ where: { booking_id: id } });

        if (deleted) {
            return res.json({ message: "Booking deleted successfully" });
        } else {
            return res.status(400).json({ message: "Failed to delete booking" });
        }
    }
};
