import express, { Request, Response, Router } from "express";
import { poolService } from "../services/pool.service";
import { Pool } from "../models/Pool";
import { StatusCodes } from "http-status-codes";

const poolController: Router = express.Router();

poolController.get("/:uid", async (req: Request, res: Response) => {
  let pools = await poolService.getPools(req.params.uid);

  res.status(StatusCodes.OK).json(pools);
});

poolController.post("/", async (req: Request, res: Response) => {
  let newPool = await poolService.createPool(req.body.name, req.body.uid, req.body.teams);

  res.status(StatusCodes.CREATED).json(newPool);
});

poolController.post("/connect", async (req: Request, res: Response) => {
  let pool = await poolService.connectPool(req.body.uid, req.body.code);

  res.status(StatusCodes.OK).json(pool);
});

export { poolController };
