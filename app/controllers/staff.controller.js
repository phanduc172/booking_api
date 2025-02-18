const db = require("../models");
const Staff = db.staffs;
const Op = db.Sequelize.Op;

module.exports = {
    // Tạo nhân viên mới
    create: async (req, res) => {
        try {
            const { name, position, email, phone, shift, salary, hire_date, status } = req.body;
            const staff = await Staff.create({
                name,
                position,
                email,
                phone,
                shift,
                salary,
                hire_date,
                status
            });
            return res.status(201).json({ message: "Nhân viên đã được tạo thành công", staff });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo nhân viên", error });
        }
    },

    // Lấy tất cả nhân viên
    getAll: async (req, res) => {
        try {
            const staffs = await Staff.findAll();
            return res.json(staffs);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên", error });
        }
    },

    // Lấy thông tin nhân viên theo ID
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const staff = await Staff.findByPk(id);
            if (!staff) {
                return res.status(404).json({ message: "Không tìm thấy nhân viên với ID này" });
            }
            return res.status(200).json(staff);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin nhân viên", error });
        }
    },

    // Cập nhật thông tin nhân viên theo ID
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
            return res.status(200).json({ message: "Nhân viên đã được cập nhật thành công", staff });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật nhân viên", error });
        }
    },

    // Xóa nhân viên theo ID
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
