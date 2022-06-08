
// A function to parse parameters from query and format requests only with acceptable ones.

const prepareOMDBParams = (query, acceptableParams) => {
    let params = {};

    for(let param of acceptableParams){
        if(query[[param]]){
            params[param] = query[param];
        }
    }

    params.apiKey = process.env.OMDB_KEY;

    return params;
}

module.exports = {
    prepareOMDBParams
}