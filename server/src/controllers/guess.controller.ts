import express, { Request, Response, Router } from "express";
import { guessService } from "../services/guess.service";
import { StatusCodes } from "http-status-codes";

const guessController: Router = express.Router();

guessController.patch('/', (req : Request, res : Response) => {

    let result = guessService.giveGuess(req.body.userId, req.body.poolId, req.body.guesses);

    res.status(StatusCodes.OK)
        .json(result);
})

export { guessController };