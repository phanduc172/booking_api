function sendResponse(res, code = 200, data = '', message = '') {
    res.status(code).json({ code, data, message });
}

module.exports = { sendResponse };
