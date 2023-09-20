import { postsDbType } from "../types/postsTypes";

export const postsDb : postsDbType[] = [{
    id: "334343",
    title: "what",
    shortDescription: "can",
    content: "i",
    blogId: "do",
    blogName: "string"
}]

export const postsRepository = {
    getAllPosts(){
        return postsDb
    },
    getPost(id : string){
        const post = postsDb.find(i => i.id === id)
        return post
    },
    createPost(title: string, shortDescription: string, 
    content: string, blogId: string, blogName: string){

        const newPost : postsDbType = {
            id: Math.floor(Math.random() * 10000).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        postsDb.push(newPost)
        return newPost
    }
}