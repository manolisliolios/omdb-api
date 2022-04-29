module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        email:{
            type: DataTypes.STRING,
            unique: true
        },
        fullName: DataTypes.STRING,
        password: DataTypes.STRING, // password hash
    });

    user.associate = models => {

        user.hasMany(models.bookmark);

    }

    return user;
};
