module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_per_night: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        amount_adult: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount_child: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        type_of_room_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: "rooms",
        timestamps: false,
        underscored: true,
    });

    Room.associate = (models) => {
        Room.belongsTo(models.TypeOfRoom, { foreignKey: 'type_of_room_id' });
        Room.hasMany(models.Booking, { foreignKey: 'id' });
    };

    return Room;
};
