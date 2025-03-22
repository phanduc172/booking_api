module.exports = (sequelize, DataTypes) => {
    const RoomFacility = sequelize.define("RoomFacility", {
        room_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: "room",
                key: "id",
            },
        },
        facility_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: "facility",
                key: "id",
            },
        },
    }, {
        tableName: "roomfacility",
        timestamps: false,
        underscored: true,
    });

    return RoomFacility;
};
