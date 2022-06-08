import NodeCache from "node-cache";


const cache = new NodeCache({
    useClones: false,
    stdTTL: 43200, // 12 hours caching of data
    checkperiod: 600
})

export default cache;