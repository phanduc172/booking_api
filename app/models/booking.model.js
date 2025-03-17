module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        room_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'room',
                key: 'id',
            },
        },
        customer_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'customer',
                key: 'id',
            },
        },
        amount_night: {
            type: DataTypes.INTEGER,
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
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("Pending", "Confirmed", "Canceled"),
            allowNull: false,
            defaultValue: "Pending",
        },
    }, {
        tableName: 'booking',
        timestamps: false,
        underscored: true,
    });

    Booking.associate = (models) => {
        Booking.belongsTo(models.room, { foreignKey: 'room_id', as: 'room' });
        Booking.belongsTo(models.customer, { foreignKey: 'customer_id', as: "customer" });
        Booking.belongsTo(models.status, { foreignKey: 'status', as: 'roomStatus' });
    };

    return Booking;
};
