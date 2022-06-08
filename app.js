require('dotenv').config();
import express from 'express';
import routes from "./routes";
import logging from "morgan"
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(logging('dev'));

app.get('/', (req, res)=>{return res.status(200).send('OMDB API is up and running.');});

app.use('/api/users', routes.users);
app.use('/api/movies', routes.movies);
app.use('/api/bookmarks', routes.bookmarks);

module.exports = app;
