module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("Status", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // table_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // table_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_delete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: "status",
        timestamps: false,
        underscored: false,
    });

    Status.associate = (models) => {
        Status.hasMany(models.room, { foreignKey: "status", as: "room" });
        Status.hasMany(models.booking, { foreignKey: "status", as: "room" });
    };

    return Status;
};
