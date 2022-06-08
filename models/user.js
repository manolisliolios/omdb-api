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
        googleLogin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    user.associate = models => {

        user.hasMany(models.bookmark);

    }

    return user;
};
