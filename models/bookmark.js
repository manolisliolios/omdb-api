module.exports = (sequelize, DataTypes) => {

    const bookmark = sequelize.define('bookmark', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        movieId: DataTypes.INTEGER
    });

    bookmark.associate = models => {
        bookmark.belongsTo(models.user);
    }

    return bookmark;
};
