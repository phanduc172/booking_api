const db = require("../models");
const Facility = db.facility;
const { sendResponse } = require("../public/common");
const { v4: uuidv4 } = require("uuid");
const Op = db.Sequelize.Op;

module.exports = {
    getAll: async (req, res) => {
        try {
            const { search } = req.query;
            const whereClause = {};

            if (search) {
                whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
            }

            const facilities = await Facility.findAll({
                where: search ? whereClause : {},
            });

            return sendResponse(res, 200, facilities, "Lấy danh sách tiện ích thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách tiện ích", error);
        }
    },
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const facility = await Facility.findByPk(id);

            if (!facility) {
                return sendResponse(res, 404, null, "Không tìm thấy tiện ích");
            }

            return sendResponse(res, 200, facility, "Lấy thông tin tiện ích thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tìm tiện ích", error);
        }
    },
    create: async (req, res) => {
        try {
            const { name, icon, description } = req.body;

            if (!name || !icon) {
                return sendResponse(res, 400, null, "Vui lòng cung cấp đầy đủ thông tin tiện ích");
            }

            const newFacility = await Facility.create({
                id: uuidv4(),
                name,
                icon,
                description: description || ""
            });

            return sendResponse(res, 201, newFacility, "Thêm tiện ích thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tạo tiện ích", error);
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;

            const facility = await Facility.findByPk(id);
            if (!facility) {
                return sendResponse(res, 404, null, "Tiện ích không tồn tại");
            }

            const [updated] = await Facility.update(req.body, { where: { id } });

            if (!updated) {
                return sendResponse(res, 400, null, "Không thể cập nhật tiện ích");
            }

            return sendResponse(res, 200, null, "Cập nhật tiện ích thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật tiện ích", error);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const facility = await Facility.findByPk(id);
            if (!facility) {
                return sendResponse(res, 404, null, "Tiện ích không tồn tại");
            }
            await Facility.destroy({ where: { id } });
            return sendResponse(res, 200, null, "Xóa tiện ích thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa tiện ích", error);
        }
    }
};
