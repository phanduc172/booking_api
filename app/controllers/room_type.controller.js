const db = require("../models");
const RoomOfType = db.roomtype;
const { sendResponse } = require("../public/common");

module.exports = {
    // Tạo mới một loại phòng
    create: async (req, res) => {
        try {
            const { id, name, status } = req.body;
            const roomtype = await RoomOfType.create({
                id,
                name,
                status
            });
            return res.status(201).json({ message: "Loại phòng đã được tạo thành công", roomtype });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo loại phòng", error });
        }
    },

    // Lấy danh sách tất cả loại phòng
    getAll: async (req, res) => {
        try {
            const roomtype = await RoomOfType.findAll();
            return sendResponse(
                res,
                200,
                roomtype,
                "Lấy danh sách loại phòng thành công"
            );

        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách loại phòng", error });
        }
    },

    // Lấy thông tin một loại phòng theo ID
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const roomtype = await RoomOfType.findByPk(id);
            if (!roomtype) {
                return res.status(404).json({ message: "Không tìm thấy loại phòng với ID này" });
            }
            return res.status(200).json(roomtype);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin loại phòng", error });
        }
    },

    // Cập nhật thông tin loại phòng theo ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, status } = req.body;
            const roomtype = await RoomOfType.findByPk(id);
            if (!roomtype) {
                return res.status(404).json({ message: "Không tìm thấy loại phòng với ID này" });
            }
            await roomtype.update({
                name,
                status
            });
            return res.status(200).json({ message: "Loại phòng đã được cập nhật thành công", roomtype });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật loại phòng", error });
        }
    },

    // Xóa loại phòng theo ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const roomtype = await RoomOfType.findByPk(id);
            if (!roomtype) {
                return res.status(404).json({ message: "Không tìm thấy loại phòng với ID này" });
            }
            await roomtype.destroy();
            return res.status(200).json({ message: "Loại phòng đã được xóa thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa loại phòng", error });
        }
    },
};
