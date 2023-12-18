import { BlogType } from "../../models/blogsTypes";
import { BlogsRepository } from "../../repositories/blogs-db-repository";
import { postsDbType } from "../../models/postsTypes";
export class BlogService {
  constructor(protected blogsRepository: BlogsRepository) {}
  async getAllBlogs(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<BlogType[]> {
    return await this.blogsRepository.getAllBlogs(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
  }

  async countDocuments(query: object): Promise<number> {
    return await this.blogsRepository.countDocuments(query);
  }

  async countAllDocuments(blogId: string): Promise<number> {
    return await this.blogsRepository.countAllDocuments(blogId);
  }

  async getAllPostsForBlogs(
    blogId: string,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<postsDbType[]> {
    return await this.blogsRepository.getAllPostsForBlogs(
      sortBy,
      sortDirection,
      pageSize,
      skip,
      blogId
    );
  }

  async findBlog(id: string): Promise<BlogType | null> {
    return await this.blogsRepository.findBlog(id);
  }

  async createBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogType> {
    const createdat = new Date();

    const newBlog = new BlogType(
      Math.floor(Math.random() * 10000).toString(),
      name,
      description,
      websiteUrl,
      createdat.toISOString(),
      false
    );

    const createdBlog = this.blogsRepository.createBlog(newBlog);
    return createdBlog;
  }

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
      this.blogsRepository.createPostForBlog(newPostForBlog);
    return createdPostForBlog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    return await this.blogsRepository.deleteBlog(id);
  }

  async changeBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    return await this.blogsRepository.changeBlog(
      id,
      name,
      description,
      websiteUrl
    );
  }
}
