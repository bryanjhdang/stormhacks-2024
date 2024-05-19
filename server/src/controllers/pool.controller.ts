import express, { Request, Response, Router } from "express";
import { poolService } from "../services/pool.service";
import { Pool } from "../models/Pool";
import { StatusCodes } from "http-status-codes";

const poolController: Router = express.Router();

poolController.get("/", (req: Request, res: Response) => {});

poolController.post("/", async (req: Request, res: Response) => {
  let newPool = await poolService.createPool(
    req.body.name,
    req.body.uid,
    req.body.teams,
    new Date(),
    new Date()
  );

    res.status(StatusCodes.CREATED)
        .json(newPool);
})

poolController.post('/connect', async (req : Request, res: Response) => {
    poolService.connectPool(req.body.uid, req.body.code);
})

export { poolController };
