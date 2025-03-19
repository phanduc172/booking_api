const db = require("../models");
const { sendResponse } = require("../public/common");
const Service = db.service;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");

module.exports = {
    create: async (req, res) => {
        try {
            const { name, icon } = req.body;
            const service = await Service.create({
                id: uuidv4(),
                name,
                icon
            });
            return sendResponse(res, 201, service, "Dịch vụ đã được tạo thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tạo dịch vụ", error);
        }
    },
    getAll: async (req, res) => {
        try {
            const { search } = req.query;

            const whereClause = {};

            if (search) {
                whereClause[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                ];
            }
            const service = await Service.findAll({
                where: search ? whereClause : {},
            });

            return sendResponse(res, 200, service, "Lấy danh sách dịch vụ thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách dịch vụ", error);
        }
    },
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const service = await Service.findByPk(id);
            if (!service) {
                return sendResponse(res, 404, null, "Không tìm thấy dịch vụ với ID này");
            }
            return sendResponse(res, 200, service, "Lấy thông tin dịch vụ thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy thông tin dịch vụ", error);
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, icon } = req.body;
            const service = await Service.findByPk(id);
            if (!service) {
                return sendResponse(res, 404, null, "Không tìm thấy dịch vụ với ID này");
            }
            await service.update({ name, icon });

            return sendResponse(res, 200, service, "Dịch vụ đã được cập nhật thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật dịch vụ", error);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const service = await Service.findByPk(id);
            if (!service) {
                return sendResponse(res, 404, null, "Không tìm thấy dịch vụ với ID này");
            }
            await service.destroy();
            return sendResponse(res, 200, null, "Dịch vụ đã được xóa thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa dịch vụ", error);
        }
    },
};
