// import { Router, Request, Response } from "express";
// import { blogsDbType } from "./blogsTypes";
// import { HTTP_STATUSES } from "./statuses";
// import { blogsCollection } from "../repositories/dataBase/blogsDb";



// export const blogsRouter = Router({})

// blogsRouter.get('/', 
// async (req: Request, res: Response)=>{
//     // const asc = 'asc'
//     // const desc = 'desc'
//     // const searchNameTerm = req.query.searchNameTerm || null
//     // const sortBy = req.query.sortBy || req.body.createdAt
//     // const sortDirection = req.query.sortDirection || desc
//     // const pageNumber: number = +req.query.pageNumber! || 1
//     // const pageSize: number = +req.query.pageSize! || 10
//     let {sortBy, sortDirection, pageNumber, pageSize} = req.query
//     if(!sortBy) sortBy = req.body.createdAt
//     if(!sortDirection) sortDirection = 'desc'
//     if(!pageNumber) pageNumber = "1"
//     if(!pageSize) pageSize = "10"
//     const skip = ((+pageNumber -1) * +pageSize)
//     const allBlogs = await blogsCollection.find({}).sort({sortBy: -1}).skip(+pageNumber).limit(+pageSize)



//     res.status(HTTP_STATUSES.OK_200).send(allBlogs)
// })