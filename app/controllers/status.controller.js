const db = require("../models");
const { sendResponse } = require("../public/common");
const Status = db.status;
const Op = db.Sequelize.Op;

module.exports = {
    // Tạo trạng thái mới
    create: async (req, res) => {
        try {
            const { status, status_name, is_delete } = req.body;
            const newStatus = await Status.create({ status, status_name, is_delete });

            return sendResponse(res, 201, newStatus, "Trạng thái đã được tạo thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tạo trạng thái", error);
        }
    },

    // Lấy danh sách trạng thái
    getAll: async (req, res) => {
        try {
            const statuses = await Status.findAll();
            return sendResponse(res, 200, statuses, "Lấy danh sách trạng thái thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách trạng thái", error);
        }
    },

    // Lấy thông tin trạng thái theo ID
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const status = await Status.findByPk(id);

            if (!status) {
                return sendResponse(res, 404, null, "Không tìm thấy trạng thái với ID này");
            }
            return sendResponse(res, 200, status, "Lấy thông tin trạng thái thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy thông tin trạng thái", error);
        }
    },

    // Cập nhật trạng thái theo ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, status_name, is_delete } = req.body;
            const existingStatus = await Status.findByPk(id);

            if (!existingStatus) {
                return sendResponse(res, 404, null, "Không tìm thấy trạng thái với ID này");
            }

            await existingStatus.update({ status, status_name, is_delete });
            return sendResponse(res, 200, existingStatus, "Trạng thái đã được cập nhật thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật trạng thái", error);
        }
    },

    // Xóa trạng thái theo ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const existingStatus = await Status.findByPk(id);

            if (!existingStatus) {
                return sendResponse(res, 404, null, "Không tìm thấy trạng thái với ID này");
            }

            await existingStatus.destroy();
            return sendResponse(res, 200, null, "Trạng thái đã được xóa thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa trạng thái", error);
        }
    },
};
