import { blogsDbType } from "../types/blogsTypes"

export const __blogsDb : blogsDbType[] = [{
    id: '0',
    name: "Ilya",
    description: "string",
    websiteUrl: "string"
}]


export const blogsRepository = {

    async getAllBlogs() : Promise<blogsDbType[]>{
        return __blogsDb
    },

    async findBlog(id: string) : Promise<blogsDbType | undefined>{
        return __blogsDb.find(i => i.id === id)
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogsDbType>{
        const newBlog : blogsDbType = {
            id: Math.floor(Math.random()* 10000).toString(),
            name,
            description,
            websiteUrl
        }
        __blogsDb.push(newBlog)
        return newBlog
    },
    async deleteBlog(id: string): Promise<boolean>{
        const indexOfDeletedBlog = __blogsDb.findIndex(blog => blog.id === id)

        if(indexOfDeletedBlog === -1){
            return false
        } else {
            __blogsDb.splice(indexOfDeletedBlog, 1)
            return true
        }
    },
    async changeBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{

        const changingBlog = __blogsDb.find(b => b.id === id)

        if(!changingBlog){
            return false
        }
        
            changingBlog.name = name
            changingBlog.description = description
            changingBlog.websiteUrl = websiteUrl
            
        return true 
        
    }
    
}