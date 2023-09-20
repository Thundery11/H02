import { Request, Response } from "express"
export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithParamsAndBody<PB> = Request<PB, {}, PB, {} >

