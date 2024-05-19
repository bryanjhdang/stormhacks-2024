import express, { Request, Response, Router } from "express";
import { poolService } from "../services/pool.service";
import { Pool } from "../models/Pool";

const poolController: Router = express.Router();

poolController.get('/', (req : Request, res : Response) => {

})

poolController.post('/', (req : Request, res : Response) => {
    
    poolService.
})

export { poolController };