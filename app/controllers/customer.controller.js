const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;


module.exports = {
    getAll: async (req, res) => {
        try {
            const customers = await Customer.findAll();
            return res.json(customers);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách khách hàng", error });
        }
    },


    // Thêm khách hàng mới
    create: async (req, res) => {
        try {
            const { name, room_type, check_in, check_out, status } = req.body;
            const newCustomer = await Customer.create({
                name,
                room_type,
                check_in,
                check_out,
                status,
            });

            return res.status(201).json(newCustomer);
        } catch (error) {
            return res.status(400).json({ message: "Lỗi khi tạo khách hàng", error });
        }
    },

    // Tìm khách hàng theo ID
    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const customer = await Customer.findByPk(id);

            if (customer) {
                return res.json(customer);
            } else {
                return res.status(404).json({ message: "Không tìm thấy khách hàng" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tìm khách hàng", error });
        }
    },

    // Cập nhật thông tin khách hàng
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const [updated] = await Customer.update(req.body, {
                where: { customer_id: id }
            });

            if (updated) {
                return res.json({ message: "Cập nhật khách hàng thành công" });
            } else {
                return res.status(400).json({ message: "Không thể cập nhật khách hàng" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật khách hàng", error });
        }
    },

    // Xóa khách hàng
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await Customer.destroy({ where: { customer_id: id } });

            if (deleted) {
                return res.json({ message: "Xóa khách hàng thành công" });
            } else {
                return res.status(400).json({ message: "Không thể xóa khách hàng" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa khách hàng", error });
        }
    }
};
