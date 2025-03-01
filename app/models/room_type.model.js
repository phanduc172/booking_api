module.exports = (sequelize, DataTypes) => {
    const RoomOfType = sequelize.define('RoomOfType', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName: "roomtype",
        timestamps: false, // Không tự động tạo `createdAt` và `updatedAt`
        underscored: false, // Sử dụng `camelCase` cho tên cột
    });

    return RoomOfType;
};
