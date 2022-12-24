import app from "./server.js"
import mongodb, { ClientSession } from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"


const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['Mongo_user'];
const mongo_password = process.env['Mongo_pass'];

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.llsqz88.mongodb.net/?retryWrites=true&w=majority`

const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize:50,
        writeConcern: {timeout:2500},
        useNewUrlParser : true
    }
).catch(err=>{
    console.error(err.stack);
    process.exit(1);
}).then(
    async Client=>{
        await ReviewsDAO.injectDB(Client)
        app.listen(port,()=>{
            console.log(`listening on port ${port}`)
        })
    }
)

