
import models from "../models"
import ErrorHelper from "../helpers/error.helper"
import { uuid } from 'uuidv4';

const addBookmark = async (req, res) => {

    try{

        const bookmarkExists = await models.bookmark.count({
            where:{
                movieId: req.body.movieId,
                userId: req.user.id
            }
        });

        if(bookmarkExists > 0) return res.status(200).send(ErrorHelper.BOOKMARK_ALREADY_EXISTS);


        const bookmark = await models.bookmark.create({
            id: uuid(),
            movieId: req.body.movieId,
            userId: req.user.id
        });

        return res.status(201).send(bookmark);



    }catch(e){

        console.error(e);
        return res.status(400).send(ErrorHelper.GENERAL);

    }
}


const removeBookmark = async (req, res) => {

    try{

        await models.bookmark.destroy({
            where:{
                userId: req.user.id,
                movieId: req.params.movieId
            }
        });

        return res.sendStatus(204);
    }catch(e){

        console.error(e);
        return res.status(200).send(ErrorHelper.GENERAL);

    }
}

const getUserBookmarks = async (req, res) => {
    try{

        let bookmarks = await models.bookmark.findAll({
            where:{
                userId: req.user.id
            },
            raw: true
        });

        bookmarks = bookmarks.map(x => x.movieId);
        return res.status(200).send(bookmarks);

    }catch(e){
        console.error(e);
        return res.status(200).send(ErrorHelper.GENERAL);
    }
}



module.exports = {
    getUserBookmarks,
    addBookmark,
    removeBookmark
}