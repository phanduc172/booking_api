const db = require("../models");
const { sendResponse } = require("../public/common");
const Staff = db.staff;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");

module.exports = {
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
            return sendResponse(
                res,
                201,
                staff,
                "Nhân viên đã được tạo thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo nhân viên", error });
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

            const staff = await Staff.findAll({
                where: search ? whereClause : {},
            });
            
            return sendResponse(
                res,
                200,
                staff,
                "Lấy danh sách khách hàng thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên", error });
        }
    },

    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return res.status(404).json({ message: "Không tìm thấy nhân viên với ID này" });
            }
            return sendResponse(
                res,
                200,
                staff,
                "Lấy nhân viên thành công"
            );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin nhân viên", error });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, position, email, phone, shift, salary, hire_date, status } = req.body;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return res.status(404).json({ message: "Không tìm thấy nhân viên với ID này" });
            }
            await staff.update({
                name,
                position,
                email,
                phone,
                shift,
                salary,
                hire_date,
                status
            });
            return sendResponse(res, 200, staff, "Nhân viên đã được cập nhật thành công");
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật nhân viên", error });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return res.status(404).json({ message: "Không tìm thấy nhân viên với ID này" });
            }
            await staff.destroy();
            return res.status(200).json({ message: "Nhân viên đã được xóa thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa nhân viên", error });
        }
    },
};
