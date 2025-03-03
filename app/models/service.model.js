module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define("Service", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "service",
        timestamps: false,
        underscored: true,
    });

    return Service;
};
