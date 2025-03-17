module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("Admin", "Customer"),
            allowNull: false,
            defaultValue: "Customer",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "123456a@",
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
        tableName: "customer",
        timestamps: false,
        underscored: true,
    });

    return Customer;
};

