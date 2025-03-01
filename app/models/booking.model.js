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
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'booking',
        timestamps: false,
        underscored: true,
    });

    Booking.associate = (models) => {
        Booking.belongsTo(models.Room, { foreignKey: 'room_id' });
        Booking.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    };

    return Booking;
};
