import { blogsDbType } from "../types/blogsTypes"

export const blogsDb : blogsDbType[] = [{
    id: '0',
    name: "Ilya",
    description: "string",
    websiteUrl: "string"
}]


export const blogsRepository = {

    getAllBlogs(){
        return blogsDb
    },

    findBlog(id: string){
        return blogsDb.find(i => i.id === id)
    },

    createBlog(name: string, description: string, websiteUrl: string){
        const newBlog : blogsDbType = {
            id: Math.floor(Math.random()* 10000).toString(),
            name,
            description,
            websiteUrl
        }
        blogsDb.push(newBlog)
        return newBlog
    },
    deleteBlog(id: string){
        const indexOfDeletedBlog = blogsDb.findIndex(blog => blog.id === id)
        if(indexOfDeletedBlog === -1){
            return false
        } else {
            blogsDb.splice(indexOfDeletedBlog, 1)
            return true
        }
    },
    changeBlog(id: string, name: string, description: string, websiteUrl: string){

        const changingBlog = blogsDb.find(b => b.id === id)
        if(!changingBlog){
            return false
        }
        
            changingBlog.name = name
            changingBlog.description = description
            changingBlog.websiteUrl = websiteUrl
        return true 
        
    }
    
}