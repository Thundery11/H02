import { Router, Request, Response } from "express";
import { blogsDbType } from "./blogsTypes";
import { HTTP_STATUSES } from "./statuses";
import { blogsCollection } from "../repositories/dataBase/blogsDb";
import { RequestWithQueryAndBody } from "./requestsTypes";

export const blogsRouter = Router({});

interface BlogQueryParams {
  desc: string;
  searchNameTerm: string | null;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  createdAt: string;
}

blogsRouter.get(
  "/",
  async (req: RequestWithQueryAndBody<BlogQueryParams>, res: Response) => {
    const desc = req.query.desc;
    const searchNameTerm = req.query.searchNameTerm || null;
    const sortBy = req.query.sortBy || req.body.createdAt;
    const sortDirection = req.query.sortDirection || desc;
    const pageNumber = req.query.pageNumber || 1;
    const pageSize = req.query.pageSize || 10;

    // const query = { $text: { $search: searchNameTerm } }
    const skip = (pageNumber - 1) * pageSize;
    const allBlogs: blogsDbType[] = await blogsCollection
      .find({})
      .sort({ [sortBy]: sortDirection === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.status(HTTP_STATUSES.OK_200).send(allBlogs);
  }
);
