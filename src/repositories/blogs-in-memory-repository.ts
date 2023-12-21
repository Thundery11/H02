// import { blogsDbType } from "../models/blogsTypes";

// export const blogsDb: blogsDbType[] = [
//   {
//     id: "0",
//     name: "Ilya",
//     description: "string",
//     websiteUrl: "string",
//     createdAt: "sdsdsds",
//     isMembership: true,
//   },
// ];

// export const blogsRepository = {
//   async getAllBlogs(): Promise<blogsDbType[]> {
//     return blogsDb;
//   },

//   async findBlog(id: string): Promise<blogsDbType | undefined> {
//     return blogsDb.find((i) => i.id === id);
//   },

//   async createBlog(
//     name: string,
//     description: string,
//     websiteUrl: string
//   ): Promise<blogsDbType> {
//     const createdat = new Date();
//     const newBlog: blogsDbType = {
//       id: Math.floor(Math.random() * 10000).toString(),
//       name,
//       description,
//       websiteUrl,
//       createdAt: createdat.toISOString(),
//       isMembership: true,
//     };
//     blogsDb.push(newBlog);
//     return newBlog;
//   },
//   async deleteBlog(id: string): Promise<boolean> {
//     const indexOfDeletedBlog = blogsDb.findIndex((blog) => blog.id === id);
//     if (indexOfDeletedBlog === -1) {
//       return false;
//     } else {
//       blogsDb.splice(indexOfDeletedBlog, 1);
//       return true;
//     }
//   },
//   async changeBlog(
//     id: string,
//     name: string,
//     description: string,
//     websiteUrl: string
//   ): Promise<boolean> {
//     const changingBlog = blogsDb.find((b) => b.id === id);
//     if (!changingBlog) {
//       return false;
//     }

//     changingBlog.name = name;
//     changingBlog.description = description;
//     changingBlog.websiteUrl = websiteUrl;
//     return true;
//   },
// };
