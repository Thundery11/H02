import { Request } from "express";
export type RequestWithParams<P> = Request<P, {}, {}, {}>;
export type RequestWithBody<B> = Request<{}, {}, B, {}>;
export type RequestWithParamsAndBody<PB> = Request<PB, {}, PB, {}>;
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestWithParamsAndQuery<PQ> = Request<PQ, {}, {}, PQ>;
