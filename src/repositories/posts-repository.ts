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
    content: string, blogId: string){

        const newPost : postsDbType = {
            id: Math.floor(Math.random() * 10000).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName : "some blog"
        }
        postsDb.push(newPost)
        return newPost
    },
    deletePost(id: string){

        for(let i = 0; i< postsDb.length; i++){
            if(postsDb[i].id === id){
                postsDb.splice(i, 1)
                return
            }
        }
    },
    updatePost(id: string, title: string, shortDescription: string, 
    content: string, blogId: string){
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