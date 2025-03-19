const nodemailer = require("nodemailer");

const sendBookingEmail = async (toEmail, bookingDetails) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: "your-email@gmail.com",
            to: toEmail,
            subject: "🎉 Booking Confirmation at Our Hotel!",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: white;">
                <h2 class="text-center text-primary">🏨 Booking Confirmation</h2>
                <p class="text-muted">Hello <strong>${bookingDetails.customer.name}</strong>,</p>
                <p class="text-muted">We are pleased to inform you that your booking has been successfully confirmed.</p>

                <div class="card shadow-sm p-3 mb-3 bg-white rounded" style="border: 1px solid #dee2e6; padding: 15px;">
                    <h4 class="text-info">🛏 Booking Details</h4>
                    <p><strong>Room:</strong> ${bookingDetails.room.name} (${bookingDetails.roomType.name})</p>
                    <p><strong>Check-in Date:</strong> ${new Date(bookingDetails.booking.check_in).toLocaleDateString()}</p>
                    <p><strong>Check-out Date:</strong> ${new Date(bookingDetails.booking.check_out).toLocaleDateString()}</p>
                    <p><strong>Number of Nights:</strong> ${bookingDetails.booking.amount_night}</p>
                    <p><strong>Total Price:</strong> <span class="text-danger fw-bold">${bookingDetails.booking.total_price}$</span></p>
                    <p><strong>Discount:</strong> ${bookingDetails.booking.discount}%</p>
                </div>

                <div class="card shadow-sm p-3 mb-3 bg-white rounded" style="border: 1px solid #dee2e6; padding: 15px;">
                    <h4 class="text-success">👤 Customer Information</h4>
                    <p><strong>Full Name:</strong> ${bookingDetails.customer.name}</p>
                    <p><strong>Email:</strong> ${bookingDetails.customer.email}</p>
                    <p><strong>Phone Number:</strong> ${bookingDetails.customer.phone}</p>
                </div>

                <div class="card shadow-sm p-3 mb-3 bg-white rounded" style="border: 1px solid #dee2e6; padding: 15px;">
                    <h4 class="text-warning">📜 Room Description</h4>
                    <p class="text-muted">${bookingDetails.roomType.description}</p>
                </div>

                <hr>
                <p class="text-center text-muted">✨ Thank you for choosing our service. We wish you a wonderful stay!</p>
                <p class="text-center text-muted">📞 Contact: <strong>${process.env.PHONE_SUPPORT}</strong> | 📧 <strong>${process.env.EMAIL_USER}</strong></p>
            </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("📩 Email đã được gửi thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi gửi email:", error);
    }
};

module.exports = sendBookingEmail;
