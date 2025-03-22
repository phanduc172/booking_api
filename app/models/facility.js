module.exports = (sequelize, DataTypes) => {
    const Facility = sequelize.define("Facility", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "facility",
        timestamps: false,
        underscored: true,
    });


    Facility.associate = (models) => { 
        Facility.belongsToMany(models.room, {
            through: "RoomFacility",
            foreignKey: "facility_id",
            otherKey: "room_id",
            as: "rooms",
        });
    }

    return Facility;
};
