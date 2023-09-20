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
            id: (new Date()).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogsDb.push(newBlog)
        return newBlog
    },
    
}