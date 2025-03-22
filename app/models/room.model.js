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
        image: {
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
            type: DataTypes.INTEGER,
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
        tableName: "room",
        timestamps: false,
        underscored: true,
    });

    Room.associate = (models) => {
        Room.belongsTo(models.roomtype, { foreignKey: 'type_of_room_id', as: "roomType" });
        Room.belongsTo(models.status, { foreignKey: 'status', as: "roomStatus" });
        Room.hasMany(models.booking, { foreignKey: 'room_id' });

        Room.belongsToMany(models.facility, {
            through: "RoomFacility",
            foreignKey: "room_id",
            otherKey: "facility_id",
            as: "facilities",
        });
    };

    return Room;
};
