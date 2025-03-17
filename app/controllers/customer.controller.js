const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;
const { sendResponse } = require("../public/common");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { search } = req.query;

            const whereClause = {};

            if (search) {
                whereClause[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { phone: { [Op.like]: `%${search}%` } },
                ];
            }

            const customers = await Customer.findAll({
                where: {
                    ...(search ? whereClause : {}),
                    role: "Customer",
                },
                attributes: { exclude: ["password"] },
            });
        
            return sendResponse(
                res,
                200,
                customers,
                "Lấy danh sách khách hàng thành công"
            );
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Lỗi khi lấy danh sách khách hàng", error });
        }
    },

    create: async (req, res) => {
        try {
            const { name, phone, email, country, passport } = req.body;

            if (!name || !phone || !email || !country || !passport) {
                return sendResponse(res, 400, null, "Vui lòng cung cấp đầy đủ thông tin khách hàng");
            }

            const newCustomer = await Customer.create({
                id: uuidv4(),
                name,
                phone,
                email,
                country,
                passport,
                role: "Customer",
            });

            return sendResponse(res, 201, newCustomer, "Thêm khách hàng thành công");
        } catch (error) {
            console.error("🔥 Lỗi khi tạo khách hàng:", error);
            return sendResponse(res, 500, null, "Lỗi khi tạo khách hàng", error);
        }
    },


    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);

            if (!customer) {
                return sendResponse(res, 404, null, "Không tìm thấy khách hàng");
            }

            return sendResponse(res, 200, customer, "Lấy thông tin khách hàng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi tìm khách hàng", error);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;

            const customer = await Customer.findByPk(id);
            if (!customer) {
                return sendResponse(res, 404, null, "Khách hàng không tồn tại");
            }

            const [updated] = await Customer.update(req.body, { where: { id } });

            if (!updated) {
                return sendResponse(res, 400, null, "Không thể cập nhật khách hàng");
            }

            return sendResponse(res, 200, null, "Cập nhật khách hàng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi cập nhật khách hàng", error);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const customer = await Customer.findByPk(id);
            if (!customer) {
                return sendResponse(res, 404, null, "Khách hàng không tồn tại");
            }

            await Customer.destroy({ where: { id } });

            return sendResponse(res, 200, null, "Xóa khách hàng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi xóa khách hàng", error);
        }
    }
};
