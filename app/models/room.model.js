module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        room_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_per_night: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availability: {
            type: DataTypes.ENUM("available", "occupied", "cleaning", "maintenance"),
            allowNull: false,
            defaultValue: "available",
        },
        bed_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amenities: {
            type: DataTypes.JSON, // Array of amenities
            allowNull: true,
        },
        image: {
            type: DataTypes.JSON, // Array of images
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        view: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check_in_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        check_out_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        discount: {
            type: DataTypes.JSON, // Discount details
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: "rooms",
        timestamps: false, // Disable Sequelize's automatic timestamps
        underscored: true, // Use snake_case for column names
    });

    Room.associate = (models) => {
        Room.hasMany(models.Booking, { foreignKey: 'room_id' });
    };

    return Room;
};
