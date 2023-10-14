import { blogsDbType } from "../../models/blogsTypes";
import { blogsRepository } from "../../repositories/blogs-db-repository";
import { postsDbType } from "../../models/postsTypes";

export const blogsService = {
  async getAllBlogs(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<blogsDbType[]> {
    return await blogsRepository.getAllBlogs(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
  },

  async countDocuments(query: object): Promise<number> {
    return await blogsRepository.countDocuments(query);
  },

  async getAllPostsForBlogs(): Promise<postsDbType[]> {
    return await blogsRepository.getAllPostsForBlogs();
  },

  async findBlog(id: string): Promise<blogsDbType | null> {
    return await blogsRepository.findBlog(id);
  },

  async createBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<blogsDbType> {
    const createdat = new Date();

    const newBlog: blogsDbType = {
      id: Math.floor(Math.random() * 10000).toString(),
      name,
      description,
      websiteUrl,
      createdAt: createdat.toISOString(),
      isMembership: false,
    };

    const createdBlog = blogsRepository.createBlog(newBlog);
    return createdBlog;
  },
  async createPostForBlog(
    blogId: string,
    title: string,
    shortDescription: string,
    content: string,
    blogName: string
  ): Promise<postsDbType> {
    const createdat = new Date();

    const newPostForBlog: postsDbType = {
      id: Math.floor(Math.random() * 10000).toString(),
      blogId,
      title,
      shortDescription,
      content,
      createdAt: createdat.toISOString(),
      blogName,
    };
    const createdPostForBlog =
      blogsRepository.createPostForBlog(newPostForBlog);
    return createdPostForBlog;
  },

  async deleteBlog(id: string): Promise<boolean> {
    return await blogsRepository.deleteBlog(id);
  },

  async changeBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    return await blogsRepository.changeBlog(id, name, description, websiteUrl);
  },

  // async paginationForBlog(sortBy: string, sortDirection: string,
  //     pageNumber: number, pageSize: number): Promise<string | number>{

  //     }
};
