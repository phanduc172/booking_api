module.exports = app => {
    const booking = require("../controllers/statisc.controller.js");

    var router = require("express").Router();

    router.get('/statistics/status', booking.getBookingStatusStatistics);

    router.get('/statistics/revenue/monthly', booking.getMonthlyRevenue);

    router.get('/statistics/daily', booking.getBookingStatisticsByDate);

    router.get('/statistics/room', booking.getRoomBookingStatistics);

    app.use('/api', router);
};
