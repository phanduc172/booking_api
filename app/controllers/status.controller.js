const db = require("../models");
const { sendResponse } = require("../public/common");
const Status = db.status; // Kiểm tra nếu cần đổi thành db.status
const Op = db.Sequelize.Op;

module.exports = {
    // 🟢 Tạo mới trạng thái
    create: async (req, res) => {
        try {
            const { status, status_name, is_delete } = req.body;
            const newStatus = await Status.create({status, status_name, is_delete });

            return res.status(201).json({
                message: "Trạng thái đã được tạo thành công",
                status: newStatus,
            });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo trạng thái", error });
        }
    },

    // 🔵 Lấy danh sách tất cả trạng thái
    getAll: async (req, res) => {
        try {
            const statuses = await Status.findAll();
            return sendResponse (
                res,
                200,
                statuses,
                "Lấy danh sách khách hàng thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách trạng thái", error });
        }
    },

    // 🟡 Lấy thông tin trạng thái theo ID
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const status = await Status.findByPk(id);

            if (!status) {
                return res.status(404).json({ message: "Không tìm thấy trạng thái với ID này" });
            }
            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin trạng thái", error });
        }
    },

    // 🟠 Cập nhật trạng thái theo ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { tableId, tableName, status, statusName, isDelete } = req.body;
            const existingStatus = await Status.findByPk(id);

            if (!existingStatus) {
                return res.status(404).json({ message: "Không tìm thấy trạng thái với ID này" });
            }

            await existingStatus.update({ tableId, tableName, status, statusName, isDelete });
            return res.status(200).json({ message: "Trạng thái đã được cập nhật thành công", status: existingStatus });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật trạng thái", error });
        }
    },

    // 🔴 Xóa trạng thái theo ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const existingStatus = await Status.findByPk(id);

            if (!existingStatus) {
                return res.status(404).json({ message: "Không tìm thấy trạng thái với ID này" });
            }

            await existingStatus.destroy();
            return res.status(200).json({ message: "Trạng thái đã được xóa thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa trạng thái", error });
        }
    },
};
