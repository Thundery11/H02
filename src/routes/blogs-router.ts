import { Router, Request, Response } from "express";

import { blogsInputValidation } from "../middlewares/blogs-input-vadation";
import { errosValidation } from "../middlewares/erros-validation";
import { authGuardMiddleware } from "../middlewares/authorisationMiddleware";

import { postsInputValidation } from "../middlewares/posts-input-validation";
import { container } from "../composition-root";
import { BLogsController } from "../controllers/blogs-controller";
import { postsForBlogInputValidation } from "../middlewares/postsForBlogInputValidation";
export const blogsController = container.resolve(BLogsController);
export const blogsRouter = Router({});
// export class BLogsController {
//   constructor(protected blogsService: BlogService) {}
//   async createBlog(
//     req: RequestWithBody<{
//       name: string;
//       description: string;
//       websiteUrl: string;
//     }>,
//     res: Response
//   ) {
//     const { name, description, websiteUrl } = req.body;
//     const createdBlog = await this.blogsService.createBlog(
//       name,
//       description,
//       websiteUrl
//     );
//     res.status(HTTP_STATUSES.CREATED_201).send(createdBlog);
//   }
//   async findAllBlogs(req: RequestWithQuery<BlogQueryParams>, res: Response) {
//     const {
//       searchNameTerm = "",
//       sortBy = "createdAt",
//       sortDirection = "desc",
//       pageNumber = 1,
//       pageSize = 10,
//     } = req.query;

//     const query = { name: new RegExp(searchNameTerm, "i") };
//     const skip = (pageNumber - 1) * pageSize;

//     const allBlogs: BlogType[] = await this.blogsService.getAllBlogs(
//       query,
//       sortBy,
//       sortDirection,
//       pageSize,
//       skip
//     );
//     const countedDocuments = await this.blogsService.countDocuments(query);
//     const pagesCount: number = Math.ceil(countedDocuments / pageSize);
//     const presentationAllblogs = {
//       pagesCount,
//       page: Number(pageNumber),
//       pageSize: Number(pageSize),
//       totalCount: countedDocuments,
//       items: allBlogs,
//     };
//     res.status(HTTP_STATUSES.OK_200).send(presentationAllblogs);
//   }
//   async findBlog(req: RequestWithParams<{ id: string }>, res: Response) {
//     const blog = await this.blogsService.findBlog(req.params.id);

//     if (!blog) {
//       res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
//       return;
//     } else {
//       res.status(HTTP_STATUSES.OK_200).send(blog);
//     }
//   }
//   async findPostsFromCurrentBLog(
//     req: RequestWithParamsAndQuery<PostsForBlogsQueryParams>,
//     res: Response
//   ) {
//     const {
//       sortBy = "createdAt",
//       sortDirection = "desc",
//       pageNumber = 1,
//       pageSize = 10,
//     } = req.query;

//     const blogId = req.params.blogId;

//     const skip = (pageNumber - 1) * pageSize;
//     // const sorting = sortDirection === "ask" ? 1 : -1;
//     const blog: BlogType | null = await this.blogsService.findBlog(blogId);
//     if (!blog) {
//       res.sendStatus(404);
//       return;
//     } else {
//       const allPostsForBlog: postsDbType[] =
//         await this.blogsService.getAllPostsForBlogs(
//           blogId,
//           sortBy,
//           sortDirection,
//           pageSize,
//           skip
//         );
//       const countedDocuments = await this.blogsService.countAllDocuments(
//         blogId
//       );

//       const pagesCount: number = Math.ceil(countedDocuments / pageSize);
//       const presentationPostsForBlogs = {
//         pagesCount,
//         page: Number(pageNumber),
//         pageSize: Number(pageSize),
//         totalCount: countedDocuments,
//         items: allPostsForBlog,
//       };

//       res.status(HTTP_STATUSES.OK_200).send(presentationPostsForBlogs);
//     }
//   }
//   async createPost(
//     req: RequestWithParamsAndBody<{
//       blogId: string;
//       title: string;
//       shortDescription: string;
//       content: string;
//     }>,
//     res: Response
//   ) {
//     const blogId = req.params.blogId;
//     const blog = await this.blogsService.findBlog(blogId);
//     if (!blog) {
//       res.sendStatus(404);
//       return;
//     } else {
//       const { title, shortDescription, content } = req.body;
//       const blogName = blog.name;
//       const createdPostForBlogs = await this.blogsService.createPostForBlog(
//         blogId,
//         title,
//         shortDescription,
//         content,
//         blogName
//       );

//       res.status(HTTP_STATUSES.CREATED_201).send(createdPostForBlogs);
//     }
//   }
//   async deleteBlog(req: RequestWithParams<{ id: string }>, res: Response) {
//     const id = req.params.id;
//     const isDeletedBlog = await this.blogsService.deleteBlog(id);
//     if (!isDeletedBlog) {
//       res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
//       return;
//     } else {
//       res.send(HTTP_STATUSES.NO_CONTENT_204);
//     }
//   }
//   async updateBlog(
//     req: RequestWithParamsAndBody<{
//       id: string;
//       name: string;
//       description: string;
//       websiteUrl: string;
//     }>,
//     res: Response
//   ) {
//     const id = req.params.id;
//     const { name, description, websiteUrl } = req.body;
//     const changedBlog = await this.blogsService.changeBlog(
//       id,
//       name,
//       description,
//       websiteUrl
//     );
//     if (!changedBlog) {
//       res.send(HTTP_STATUSES.NOT_FOUND_404);
//       return;
//     } else {
//       res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
//     }
//   }
// }

blogsRouter.get("/", blogsController.findAllBlogs.bind(blogsController));
blogsRouter.get("/:id", blogsController.findBlog.bind(blogsController));
blogsRouter.get(
  "/:blogId/posts",
  blogsController.findPostsFromCurrentBLog.bind(blogsController)
);
blogsRouter.post(
  "/",
  authGuardMiddleware,
  blogsInputValidation(),
  errosValidation,
  blogsController.createBlog.bind(blogsController)
);
blogsRouter.post(
  "/:blogId/posts",
  authGuardMiddleware,
  postsForBlogInputValidation(),
  errosValidation,
  blogsController.createPost.bind(blogsController)
);
blogsRouter.delete(
  "/:id",
  authGuardMiddleware,
  blogsController.deleteBlog.bind(blogsController)
);
blogsRouter.put(
  "/:id",
  authGuardMiddleware,
  blogsInputValidation(),
  errosValidation,
  blogsController.updateBlog.bind(blogsController)
);
