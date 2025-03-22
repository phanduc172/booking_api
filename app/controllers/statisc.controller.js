const db = require("../models");
const Booking = db.booking;
const Customer = db.customer;
const Room = db.room;
const RoomType = db.roomtype;
const Status = db.status;
const Op = db.Sequelize.Op;
const { sendResponse } = require("../public/common");

module.exports = {
    getBookingStatusStatistics: async (req, res) => {
        try {
            const statistics = await Booking.findAll({
                attributes: [
                    'status',
                    [db.Sequelize.fn('COUNT', db.Sequelize.col('status')), 'total']
                ],
                group: ['status'],
                logging: console.log
            });
            const rawStatistics = statistics.map(stat => ({
                status: stat.getDataValue('status'),
                total: Number(stat.getDataValue('total'))
            }));
            const result = {};
            rawStatistics.forEach(stat => {
                result[stat.status] = stat.total;
            });

            return sendResponse(res, 200, result, "Thống kê tình trạng đặt phòng thành công");
        } catch (error) {
            console.error("Lỗi:", error);
            return sendResponse(res, 500, null, "Lỗi khi thống kê tình trạng đặt phòng");
        }
    },
    getMonthlyRevenue: async (req, res) => {
        try {
            const revenue = await Booking.findAll({
                attributes: [
                    [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('check_in'), '%Y-%m'), 'month'],
                    [db.Sequelize.fn('SUM', db.Sequelize.col('total_price')), 'total_revenue']
                ],
                group: ['month']
            });

            return sendResponse(res, 200, revenue, "Thống kê doanh thu theo tháng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi thống kê doanh thu theo tháng");
        }
    },
    getBookingStatisticsByDate: async (req, res) => {
        try {
            const statistics = await Booking.findAll({
                attributes: [
                    [db.Sequelize.fn('DATE', db.Sequelize.col('check_in')), 'date'],
                    [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'total_bookings']
                ],
                group: [db.Sequelize.fn('DATE', db.Sequelize.col('check_in'))],
                order: [[db.Sequelize.fn('DATE', db.Sequelize.col('check_in')), 'ASC']],
                raw: true
            });
            return sendResponse(res, 200, statistics, "Thống kê số lượng đặt phòng theo ngày thành công");
        } catch (error) {
            console.error("Lỗi:", error);
            return sendResponse(res, 500, null, "Lỗi khi thống kê số lượng đặt phòng");
        }
    }
,
    getRoomBookingStatistics: async (req, res) => {
        try {
            const roomStatistics = await Booking.findAll({
                attributes: [
                    'room_id',
                    [db.Sequelize.fn('COUNT', db.Sequelize.col('Booking.id')), 'total_bookings']
                ],
                include: [{
                    model: Room,
                    as: 'room',
                    attributes: ['name']
                }],
                group: ['Booking.room_id']
            });
            return sendResponse(res, 200, roomStatistics, "Thống kê số lượng đặt phòng theo phòng thành công");
        } catch (error) {
            return sendResponse(res, 500, null, "Lỗi khi thống kê tình hình đặt phòng theo phòng");
        }
    },

};
