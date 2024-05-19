import express, { Request, Response, Router } from "express";

const guessController: Router = express.Router();

guessController.get('/', (req : Request, res : Response) => {

})

export { guessController };