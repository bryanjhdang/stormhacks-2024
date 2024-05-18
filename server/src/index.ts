// src/index.js
import express, { Express, Request, Response } from "express";
import { createServer } from 'node:http';
import dotenv from "dotenv";
import cors from "cors";
import { Server, Socket } from "socket.io"
import { userController } from "./controllers/user.controller";
import { Game } from "./models/Game";
const axios = require('axios').default;

var gameList: Game[] = []

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }}
);


app.use(cors());
app.use(express.json());

app.get(`/`, (req: Request, res: Response) => {
  res.send("It's working!");
});

app.get('/user', userController);

axios
  .get("https://api-web.nhle.com/v1/score/2024-05-17")
  .then(function (response : any) {
    //console.log(response.data.games);
    response.data.games.forEach((element : any) => {
      console.log(element.id);
      var newGame = new Game(
        element.id, 
        `${element.awayTeam.name.default} @ ${element.homeTeam.name.default}`,
        element.gameDate,
        element.awayTeam.abbrev,
        element.homeTeam.abbrev
      )
      console.log(newGame);
      gameList.push(newGame);
      //console.log(gameList);
    });
    console.log(gameList[0])
  });

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});