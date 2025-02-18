module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_type: {
            type: DataTypes.STRING,
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
        status: {
            type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled"),
            allowNull: false,
            defaultValue: "Pending",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    }, {
        tableName: "customers",
        timestamps: false, // Tự động tạo `createdAt` và `updatedAt`
        underscored: true, // Dùng `snake_case` thay vì `camelCase` trong DB
    });

    Customer.associate = (models) => {
        Customer.hasMany(models.Booking, { foreignKey: 'customer_id' });
    };

    return Customer;
};
