const db = require("../models");
const { sendResponse } = require("../public/common");
const Staff = db.staff;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");

module.exports = {
    // Tạo nhân viên mới
    create: async (req, res) => {
        try {
            const { name, position, email, phone, shift, salary, hire_date, status } = req.body;
            const staff = await Staff.create({
                id: uuidv4(),
                name,
                position,
                email,
                phone,
                shift,
                salary,
                hire_date,
                status
            });
            return sendResponse(res, 201, staff, "Nhân viên đã được tạo thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tạo nhân viên", error);
        }
    },

    // Lấy danh sách nhân viên
    getAll: async (req, res) => {
        try {
            const { search } = req.query;

            const whereClause = {};
            if (search) {
                whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
            }

            const staff = await Staff.findAll({ where: search ? whereClause : {} });

            return sendResponse(res, 200, staff, "Lấy danh sách nhân viên thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy danh sách nhân viên", error);
        }
    },

    // Lấy thông tin nhân viên theo ID
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return sendResponse(res, 404, null, "Không tìm thấy nhân viên với ID này");
            }
            return sendResponse(res, 200, staff, "Lấy thông tin nhân viên thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi lấy thông tin nhân viên", error);
        }
    },

    // Cập nhật thông tin nhân viên theo ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, position, email, phone, shift, salary, hire_date, status } = req.body;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return sendResponse(res, 404, null, "Không tìm thấy nhân viên với ID này");
            }
            await staff.update({ name, position, email, phone, shift, salary, hire_date, status });

            return sendResponse(res, 200, staff, "Nhân viên đã được cập nhật thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật nhân viên", error);
        }
    },

    // Xóa nhân viên theo ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return sendResponse(res, 404, null, "Không tìm thấy nhân viên với ID này");
            }
            await staff.destroy();
            return sendResponse(res, 200, null, "Nhân viên đã được xóa thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa nhân viên", error);
        }
    },
};
