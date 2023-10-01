import { blogsDbType } from "../types/blogsTypes"
import { client } from "./dataBase/blogsDb"

// export const __blogsDb : blogsDbType[] = [{
//     id: '0',
//     name: "Ilya",
//     description: "string",
//     websiteUrl: "string",
//     createdAt: "2023-09-12T15:45:16.047Z"
// }]


export const blogsRepository = {

    async getAllBlogs() : Promise<blogsDbType[]>{
        return await client.db('blogsDb').collection<blogsDbType>('blogs').find({}).toArray()
    },

    async findBlog(id: string) : Promise<blogsDbType | null>{

        return await client.db('blogsDb').collection<blogsDbType>('blogs').findOne({id : id})
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogsDbType>{

        const createdat = new Date()

        const newBlog : blogsDbType = {
            id: Math.floor(Math.random()* 10000).toString(),
            name,
            description,
            websiteUrl,
            createdAt: createdat.toISOString()
        }

        const result = await client.db('blogsDb').collection<blogsDbType>('blogs').insertOne(newBlog)
        return newBlog
    },

    async deleteBlog(id: string): Promise<boolean>{
        const result = await client.db('blogsDb').collection<blogsDbType>('blogs').deleteOne({id: id})
        return result.deletedCount === 1
    },
    async changeBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{

        const result = await client.db('blogsDb').collection<blogsDbType>('blogs').updateOne({id: id}, {$set: {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
        }, $currentDate: {lastModified: true}})   //  ? current date

        return result.matchedCount === 1
    }
    
}