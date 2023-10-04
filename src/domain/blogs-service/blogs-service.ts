import { blogsDbType } from "../../types/blogsTypes"
import {blogsRepository} from "../../repositories/blogs-db-repository"

export const blogsService = {

    async getAllBlogs() : Promise<blogsDbType[]>{
        return await blogsRepository.getAllBlogs()
    },

    async findBlog(id: string) : Promise<blogsDbType | null>{

        return await blogsRepository.findBlog(id)
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

        const createdBlog = blogsRepository.createBlog(newBlog)
        return createdBlog
    },

    async deleteBlog(id: string): Promise<boolean>{
        return await blogsRepository.deleteBlog(id)
    },

    async changeBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{

        return await blogsRepository.changeBlog(id, name, description, websiteUrl)
    }
    
}