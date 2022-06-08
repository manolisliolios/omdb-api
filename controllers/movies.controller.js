import axios from "axios";
import ErrorHelper from "../helpers/error.helper"
import {prepareOMDBParams} from "../helpers/general.helper";

const findMovies = async (req, res) => {

    if(!req.query.s || req.query.s.length < 2) return res.status(200).send({});

    try{
        let params = prepareOMDBParams(req.query, ['s', 'type', 'y', 'r', 'page'])
        const data = await axios.get(process.env.OMDB_URL, {params});

        return res.status(200).send(data.data);

    }catch(e){
        console.error(e);
        return res.status(400).send(ErrorHelper.GENERAL);
    }
}

const findMovieById = async (req, res) => {

    try{

        let query = {...req.query}
        query.i = req.params.movieId;
        let params = prepareOMDBParams(query, ['i', 'type', 'plot']);

        const data = await axios.get(process.env.OMDB_URL, {params});

        return res.status(200).send(data.data);

    }catch(e){
        console.error(e);
        return res.status(400).send(ErrorHelper.GENERAL);
    }
}

module.exports = {
    findMovies,
    findMovieById
}

