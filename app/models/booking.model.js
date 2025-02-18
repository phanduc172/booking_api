module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        booking_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        check_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_nights: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            amount: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number_of_guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
        }
    },
        {
            tableName: "bookings",
            timestamps: false,
            underscored: true,
        }
    );

    return Booking;
};
