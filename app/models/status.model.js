module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("Status", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tableId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tableName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        statusName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: "status",
        timestamps: false,
        underscored: false,
    });

    return Status;
};
