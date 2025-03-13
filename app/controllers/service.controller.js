const db = require("../models");
const { sendResponse } = require("../public/common");
const Service = db.service;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");


module.exports = {
    // Tạo dịch vụ mới
    create: async (req, res) => {
        try {
            const { name, icon } = req.body;
            const service = await Service.create({
                id: uuidv4(),
                name,
                icon
            });
            return sendResponse(
                res,
                201,
                service,
                "Dịch vụ đã được tạo thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo dịch vụ", error });
        }
    },

    // Lấy danh sách tất cả dịch vụ
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
            return sendResponse(
                res,
                200,
                service,
                "Lấy danh sách dịch vụ thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách dịch vụ", error });
        }
    },

    // Lấy thông tin dịch vụ theo ID
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: "Không tìm thấy dịch vụ với ID này" });
            }
            return res.status(200).json(service);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin dịch vụ", error });
        }
    },

    // Cập nhật thông tin dịch vụ theo ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, icon } = req.body;
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: "Không tìm thấy dịch vụ với ID này" });
            }
            await service.update({
                name,
                icon
            });
            return res.status(200).json({ message: "Dịch vụ đã được cập nhật thành công", service });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật dịch vụ", error });
        }
    },

    // Xóa dịch vụ theo ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: "Không tìm thấy dịch vụ với ID này" });
            }
            await service.destroy();
            return res.status(200).json({ message: "Dịch vụ đã được xóa thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa dịch vụ", error });
        }
    },
};
