const db = require("../models");
const Room = db.rooms;
const Op = db.Sequelize.Op;

module.exports = {
    create: async (req, res) => {
        try {
            const { room_number, room_type, price_per_night, capacity, availability, bed_type, room_size, amenities, image, description, floor, view, check_in_time, check_out_time, discount } = req.body;
            const room = await Room.create({
                room_number,
                room_type,
                price_per_night,
                capacity,
                availability,
                bed_type,
                room_size,
                amenities,
                image,
                description,
                floor,
                view,
                check_in_time,
                check_out_time,
                discount
            });
            return res.status(201).json({ message: "Phòng đã được tạo thành công", room });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi tạo phòng", error });
        }
    },

    getAll: async (req, res) => {
        try {
            const rooms = await Room.findAll();
            return res.status(200).json(rooms);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách phòng", error });
        }
    },

    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Room.findByPk(id);
            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng với ID này" });
            }
            return res.status(200).json(room);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy thông tin phòng", error });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { room_number, room_type, price_per_night, capacity, availability, bed_type, room_size, amenities, image, description, floor, view, check_in_time, check_out_time, discount } = req.body;
            const room = await Room.findByPk(id);
            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng với ID này" });
            }
            await room.update({
                room_number,
                room_type,
                price_per_night,
                capacity,
                availability,
                bed_type,
                room_size,
                amenities,
                image,
                description,
                floor,
                view,
                check_in_time,
                check_out_time,
                discount
            });
            return res.status(200).json({ message: "Phòng đã được cập nhật thành công", room });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi cập nhật phòng", error });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Room.findByPk(id);
            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng với ID này" });
            }
            await room.destroy();
            return res.status(200).json({ message: "Phòng đã được xóa thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi xóa phòng", error });
        }
    },
};
