import { Request } from "express";
export type RequestWithParams<P> = Request<P, {}, {}, {}>;
export type RequestWithBody<B> = Request<{}, {}, B, {}>;
export type RequestWithParamsAndBody<PB> = Request<PB, {}, PB, {}>;
export type RequestWithQueryAndBody<QB> = Request<{}, {}, QB, QB>;
export type RequestWithParamsAndQuery<PQ> = Request<PQ, {}, {}, PQ>;
