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
        const blog = blogsDb.find(i => i.id === id)
        return blog
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
        for(let i = 0; i < blogsDb.length; i++){
            if(blogsDb[i].id  === id){
            blogsDb.splice(i , 1)
            return
            }
        }
    },
    changeBlog(id: string, name: string, description: string, websiteUrl: string){

        const changingBlog = blogsDb.find(b => b.id === id)
        if(changingBlog){
            changingBlog.name = name
            changingBlog.description = description
            changingBlog.websiteUrl = websiteUrl
        } return
        
    }
    
}