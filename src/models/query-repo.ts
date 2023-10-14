import { Router, Request, Response } from "express";
import { blogsDbType } from "./blogsTypes";
import { HTTP_STATUSES } from "./statuses";
import { blogsCollection } from "../repositories/dataBase/blogsDb";
import { RequestWithQueryAndBody } from "./requestsTypes";

export const queryRouter = Router({});

interface BlogQueryParams {
  desc: string;
  searchNameTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  createdAt: string;
}

queryRouter.get(
  "/",
  async (req: RequestWithQueryAndBody<BlogQueryParams>, res: Response) => {
    const {
      desc,
      searchNameTerm = "",
      sortBy = req.body.createdAt,
      sortDirection = desc,
      pageNumber = 1,
      pageSize = 10,
    } = req.query;

    const skip = (pageNumber - 1) * pageSize;
    console.log(skip);
    console.log(pageSize);
    const query = { name: new RegExp(searchNameTerm, "i") };
    const allBlogs: blogsDbType[] = await blogsCollection
      .find(query, { projection: { _id: 0 } })
      .sort({ [sortBy]: sortDirection === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(Number(pageSize))
      .toArray();

    const totalCount: number = allBlogs.length;
    const pagesCount: number = Math.ceil(totalCount / pageSize);
    const presentationAllblogs = {
      pagesCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: allBlogs,
    };
    res.status(HTTP_STATUSES.OK_200).send(presentationAllblogs);
  }
);
