const db = require("../models");
const Booking = db.booking;
const Customer = db.customer;
const Room = db.rooms;


module.exports = {
    getAll: async (req, res) => {
        try {
            const bookings = await Booking.findAll();
            return res.json(bookings);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi khi lấy danh sách đặt phòng", error });
        }
    },

    create: async (req, res) => {
        const { booking_id, customer_id, room_id, check_in, check_out, total_nights, total_price, discount, status, payment_method, number_of_guests, notes } = req.body;

        const newBooking = await Booking.create({
            booking_id,
            customer_id,
            room_id,
            check_in,
            check_out,
            total_nights,
            total_price,
            discount_amount: discount.amount,
            discount_type: discount.type,
            status,
            payment_method,
            number_of_guests,
            notes,
        });

        return res.status(201).json(newBooking);
    },

    findOne: async (req, res) => {
        const id = req.params.id;
        const booking = await Booking.findByPk(id, {
            include: [{ model: Customer, as: "customer" }, { model: Room, as: "room" }]
        });

        if (booking) {
            return res.json(booking);
        } else {
            return res.status(404).json({ message: "Booking not found" });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const [updated] = await Booking.update(req.body, {
            where: { booking_id: id }
        });

        if (updated) {
            return res.json({ message: "Booking updated successfully" });
        } else {
            return res.status(400).json({ message: "Failed to update booking" });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deleted = await Booking.destroy({ where: { booking_id: id } });

        if (deleted) {
            return res.json({ message: "Booking deleted successfully" });
        } else {
            return res.status(400).json({ message: "Failed to delete booking" });
        }
    }
};
