const db = require("../models");
const Room = db.room;
const RoomOfType = db.roomtype;
const { sendResponse } = require("../public/common");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");


module.exports = {
    getAll: async (req, res) => {
        try {
            const { search } = req.query;

            const whereClause = {};

            if (search) {
                whereClause[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                ];
            }
            const rooms = await Room.findAll({
                include: [
                    {
                        model: RoomOfType,
                        as: "roomType",
                        attributes: ["id", "name"]
                    }
                ],
                where: search ? whereClause : {},
            });

            return sendResponse(
                res,
                200,
                rooms,
                "Lấy danh sách phòng thành công"
            );
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Lỗi khi lấy danh sách phòng", error });
        }
    },
    create: async (req, res) => {
        try {
            const { name, price_per_night, amount_adult, amount_child, status, type_of_room_id } = req.body;

            if (!name || !price_per_night || !amount_adult || !amount_child || !status || !type_of_room_id) {
                return sendResponse(res, 400, null, "Vui lòng cung cấp đầy đủ thông tin phòng");
            }

            const newRoom = await Room.create({
                id: uuidv4(),
                name,
                price_per_night,
                amount_adult,
                amount_child,
                status,
                type_of_room_id
            });
            return sendResponse(res, 201, newRoom, "Thêm phòng thành công");
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo phòng", error });
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
                        attributes: ["id", "name"]
                    }
                ]
            });
            if (!room) {
                return sendResponse(res, 404, "Không tìm thấy phòng với ID này");
            }
            return sendResponse(
                res,
                200,
                room,
                "Lấy danh sách phòng thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin phòng", error });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price_per_night, amount_adult, amount_child, status, type_of_room_id } = req.body;
            const room = await Room.findByPk(id);
            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng với ID này" });
            }
            await room.update({
                name,
                price_per_night,
                amount_adult,
                amount_child,
                status,
                type_of_room_id
            });
            return sendResponse(
                res,
                200,
                room,
                "Phòng đã được cập nhật thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật phòng", error });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Room.findByPk(id);
            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng với ID này" });
            }
            await room.destroy();
            return res.status(200).json({ message: "Phòng đã được xóa thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa phòng", error });
        }
    },
};
