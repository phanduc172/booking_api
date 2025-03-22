const db = require("../models");
const RoomOfType = db.roomtype;
const { sendResponse } = require("../public/common");

module.exports = {
    create: async (req, res) => {
        try {
            const { id, name, status } = req.body;
            const roomtype = await RoomOfType.create({ id, name, status });

            return sendResponse(res, 201, roomtype, "Loại phòng đã được tạo thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tạo loại phòng", error);
        }
    },
    getAll: async (req, res) => {
        try {
            const roomtype = await RoomOfType.findAll();
            return sendResponse(res, 200, roomtype, "Lấy danh sách loại phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách loại phòng", error);
        }
    },
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const roomtype = await RoomOfType.findByPk(id);

            if (!roomtype) {
                return sendResponse(res, 404, null, "Không tìm thấy loại phòng với ID này");
            }

            return sendResponse(res, 200, roomtype, "Lấy thông tin loại phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy thông tin loại phòng", error);
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, status } = req.body;
            const roomtype = await RoomOfType.findByPk(id);

            if (!roomtype) {
                return sendResponse(res, 404, null, "Không tìm thấy loại phòng với ID này");
            }

            await roomtype.update({ name, status });

            return sendResponse(res, 200, roomtype, "Loại phòng đã được cập nhật thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật loại phòng", error);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const roomtype = await RoomOfType.findByPk(id);

            if (!roomtype) {
                return sendResponse(res, 404, null, "Không tìm thấy loại phòng với ID này");
            }

            await roomtype.destroy();
            return sendResponse(res, 200, null, "Loại phòng đã được xóa thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa loại phòng", error);
        }
    },
};
