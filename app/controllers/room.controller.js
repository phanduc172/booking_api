const db = require("../models");
const Room = db.room;
const RoomOfType = db.roomtype;
const Status = db.status;
const Facility = db.facility;
const { sendResponse } = require("../public/common");
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { search, amount_adult, amount_child, status, type } = req.query;
            const whereClause = {};
            if (search) {
                whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
            }
            if (amount_adult) whereClause.amount_adult = { [Op.gte]: amount_adult };
            if (amount_child) whereClause.amount_child = { [Op.gte]: amount_child };
            if (status) whereClause.status = status;
            if (type) whereClause.type_of_room_id = type;

            const rooms = await Room.findAll({
                include: [
                    {
                        model: RoomOfType,
                        as: "roomType",
                        attributes: ["id", "name", "description"]
                    },
                    {
                        model: Status,
                        as: "roomStatus",
                        attributes: ["id", "status", "status_name"]
                    },
                    {
                        model: Facility,
                        as: "facilities",
                        attributes: ["id", "name", "description", "icon"],
                        through: { attributes: [] }
                    }
                ],
                where: whereClause
            });

            return sendResponse(res, 200, rooms, "Lấy danh sách phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách phòng");
        }
    },

    create: async (req, res) => {
        try {
            const { name, price_per_night, amount_adult, amount_child, status, type_of_room_id, facilities } = req.body;

            if (!name || !price_per_night || !amount_adult || !amount_child || !status || !type_of_room_id) {
                return sendResponse(res, 400, null, "Vui lòng cung cấp đầy đủ thông tin phòng");
            }

            // Tạo phòng mới
            const newRoom = await Room.create({
                id: uuidv4(),
                name,
                price_per_night,
                amount_adult,
                amount_child,
                status,
                type_of_room_id,
            });

            if (facilities && facilities.length > 0) {
                await newRoom.setFacilities(facilities);
            }

            const createdRoom = await Room.findByPk(newRoom.id, {
                include: [
                    {
                        model: Facility,
                        as: "facilities",
                        attributes: ["id", "name", "description", "icon"],
                        through: { attributes: [] }
                    }
                ]
            });

            return sendResponse(res, 201, createdRoom, "Thêm phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tạo phòng");
        }
    },

    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Room.findByPk(id, {
                include: [
                    {
                        model: RoomOfType,
                        as: "roomType",
                        attributes: ["id", "name", "description"]
                    },
                    {
                        model: Facility,
                        as: "facilities",
                        attributes: ["id", "name", "description", "icon"],
                        through: { attributes: [] }
                    },
                    {
                        model: Status,
                        as: "roomStatus",
                        attributes: ["id", "status", "status_name"]
                    },
                ]
            });

            if (!room) {
                return sendResponse(res, 404, null, "Không tìm thấy phòng với ID này");
            }
            return sendResponse(res, 200, room, "Lấy thông tin phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy thông tin phòng");
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price_per_night, amount_adult, amount_child, status, type_of_room_id, facilities } = req.body;

            const room = await Room.findByPk(id, {
                include: [
                    {
                        model: Facility,
                        as: "facilities",
                        attributes: ["id", "name", "description", "icon"],
                        through: { attributes: [] },
                    }
                ]
            });

            if (!room) {
                return sendResponse(res, 404, null, "Không tìm thấy phòng với ID này");
            }

            await room.update({
                name,
                price_per_night,
                amount_adult,
                amount_child,
                status,
                type_of_room_id,
            });

            if (facilities && Array.isArray(facilities)) {
                await room.setFacilities([]);
                await room.setFacilities(facilities);
            }

            const updatedRoom = await Room.findByPk(id, {
                include: [
                    {
                        model: Facility,
                        as: "facilities",
                        attributes: ["id", "name", "description", "icon"],
                        through: { attributes: [] },
                    }
                ]
            });

            return sendResponse(res, 200, updatedRoom, "Phòng đã được cập nhật thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật phòng");
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Room.findByPk(id);

            if (!room) {
                return sendResponse(res, 404, null, "Không tìm thấy phòng với ID này");
            }

            await room.destroy();
            return sendResponse(res, 200, null, "Phòng đã được xóa thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa phòng");
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const room = await Room.findByPk(id);
            if (!room) {
                return sendResponse(res, 404, null, "Không tìm thấy phòng với ID này");
            }

            await room.update({ status });

            return sendResponse(res, 200, room, "Trạng thái phòng đã được cập nhật thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật trạng thái phòng");
        }
    },

    getAvailableRooms: async (req, res) => {
        try {
            let { check_in, check_out, amount_adult, amount_child } = req.query;

            if (!check_in || !check_out) {
                return res.status(400).json({ message: "Vui lòng cung cấp ngày check-in và check-out" });
            }

            // Chuyển đổi định dạng từ DD-MM-YYYY sang YYYY-MM-DD HH:mm:ss
            check_in = moment(check_in, "DD-MM-YYYY").format("YYYY-MM-DD 14:00:00"); // Check-in mặc định 14:00
            check_out = moment(check_out, "DD-MM-YYYY").format("YYYY-MM-DD 12:00:00"); // Check-out mặc định 12:00

            console.log(`Check-in: ${check_in}, Check-out: ${check_out}`);

            // Điều kiện lọc
            const whereClause = {
                id: {
                    [Op.notIn]: Sequelize.literal(`
                    (SELECT room_id FROM booking 
                    WHERE check_in < '${check_out}' 
                    AND check_out > '${check_in}')
                `)
                },
                status: 1 // Chỉ lấy phòng có trạng thái "Còn trống"
            };

            if (amount_adult) whereClause.amount_adult = { [Op.gte]: amount_adult };
            if (amount_child) whereClause.amount_child = { [Op.gte]: amount_child };

            // Truy vấn danh sách phòng khả dụng
            const availableRooms = await Room.findAll({
                where: whereClause,
                include: [
                    {
                        model: RoomOfType,
                        as: "roomType",
                        attributes: ["id", "name", "description"]
                    }
                ]
            });

            return sendResponse(res, 200, availableRooms, "Danh sách phòng khả dụng");
        } catch (error) {
            console.error("Lỗi khi lấy phòng khả dụng:", error);
            return sendResponse(res, 500, null, "Lỗi server");
        }
    }
}