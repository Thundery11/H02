import { blogsDbType } from "../types/blogsTypes"
import { blogsCollection, client } from "./dataBase/blogsDb"

export const blogsRepository = {

    async getAllBlogs() : Promise<blogsDbType[]>{
        return await blogsCollection.find({}, { projection: {  _id: 0 }}).toArray()
    },

    async findBlog(id: string) : Promise<blogsDbType | null>{

        return await blogsCollection.findOne({id : id}, { projection: {  _id: 0 }})
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogsDbType>{

        const createdat = new Date()

        const newBlog : blogsDbType = {
            id: Math.floor(Math.random()* 10000).toString(),
            name,
            description,
            websiteUrl,
            createdAt: createdat.toISOString(),
            isMembership: false
        }

        const result = await blogsCollection.insertOne({...newBlog})
        return newBlog
    },

    async deleteBlog(id: string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async changeBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{

        const result = await blogsCollection.updateOne({id: id}, {$set: {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
        }})   //  ? current date

        return result.matchedCount === 1
    }
    
}