import { postsDbType } from "../types/postsTypes";

export const postsDb : postsDbType[] = [{
    id: "334343",
    title: "what",
    shortDescription: "can",
    content: "i",
    blogId: "do",
    blogName: "string",
    createdAt: "Ssss"
}]

export const postsRepository = {
    async getAllPosts() : Promise<postsDbType[]>{
        return postsDb
    },
    async getPost(id : string) : Promise<postsDbType | undefined>{
        return postsDb.find(i => i.id === id)
        
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
            createdAt: createdAt.toISOString()
        }
        postsDb.push(newPost)
        return newPost
    },
    async deletePost(id: string): Promise<boolean>{

        const indexOfDeletedPost = postsDb.findIndex(post => post.id === id)
        
        if(indexOfDeletedPost === -1){
            return false
        } else {
            postsDb.splice(indexOfDeletedPost, 1)
            return true
        }
    },
    async updatePost(id: string, title: string, shortDescription: string, 
    content: string, blogId: string): Promise<boolean>{
        const updatingPost = postsDb.find(p => p.id === id)

        if(!updatingPost){
            return false
        }
            updatingPost.title = title
            updatingPost.shortDescription = shortDescription
            updatingPost.content = content
            updatingPost.blogId = blogId    
    
            return true
    
    
    }

}