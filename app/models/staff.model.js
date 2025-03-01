module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define("Staff", {
        staff_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shift: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        hire_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: "staffs",
        timestamps: false,
        underscored: true,
    });

    Staff.associate = (models) => {
        Staff.belongsTo(models.Customer, { foreignKey: "customer_id", as: "customer" });
        Staff.belongsTo(models.Room, { foreignKey: "room_id", as: "room" });
    };

    return Staff;
};
