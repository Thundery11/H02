import { postsDbType } from "../types/postsTypes";
import { postsCollection } from "./dataBase/blogsDb";


export const postsRepository = {

    async getAllPosts() : Promise<postsDbType[]>{
        return await postsCollection.find({}, { projection: {  _id: 0 } }).toArray()
    },

    async getPost(id : string) : Promise<postsDbType | null>{
        return await postsCollection.findOne({id: id}, { projection: {  _id: 0 }})  
    },

    async createPost(title: string, shortDescription: string, 
    content: string, blogId: string) : Promise<postsDbType>{
        const createdAt = new Date()
        const newPost : postsDbType = {
            id: Math.floor(Math.random() * 10000).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName : "some blog",
            createdAt: createdAt.toISOString(),
        }
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },

    async deletePost(id: string): Promise<boolean>{
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async updatePost(id: string, title: string, shortDescription: string, 
    content: string, blogId: string): Promise<boolean>{

        const result = await postsCollection.updateOne({id: id}, {$set: {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId
        }})
        return result.matchedCount === 1    
    }

}