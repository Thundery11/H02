import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()

const mongoUri = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
if(!mongoUri){
    throw new Error(`! Url doesn't found`)
}
export const client = new MongoClient(mongoUri)
export async function runDb() {
    try{
        await client.connect()
        await client.db("blogsDb").command({ping: 1})
        console.log("Connected succesfully to mongo server")
    } catch {
        console.log("Can't connect to mongo server")
        await client.close()
        
    }
}