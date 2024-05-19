// src/index.js
import express, { Express, Request, Response } from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { userController } from "./controllers/user.controller";
import { Game, result } from "./models/Game";
import { hockeyHelper } from "./helpers/hockey.helper";
import { poolController } from "./controllers/pool.controller";
import { guessController } from "./controllers/guess.controller";
const axios = require('axios').default;

var gameList: Game[] = [];

dotenv.config();
const app: Express = express();

//TODO: get list of teams from frontend and ensure it is a string array
var teams: string[] = ["EDM", "VAN"];

const todayRaw = new Date();
const dd = String(todayRaw.getDate()).padStart(2, "0");
const mm = String(todayRaw.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = todayRaw.getFullYear();

const today = String(yyyy + "-" + mm + "-" + dd);

const yesterdayRaw = new Date(todayRaw);
yesterdayRaw.setDate(yesterdayRaw.getDate() - 1);
const ydd = String(yesterdayRaw.getDate()).padStart(2, "0");
const ymm = String(yesterdayRaw.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyyy = yesterdayRaw.getFullYear();
const yesterday = String(yyyyy + "-" + ymm + "-" + ydd);

const tomorrowRaw = new Date();
const tdd = String(tomorrowRaw.getDate() + 1).padStart(2, "0");
const tmm = String(tomorrowRaw.getMonth() + 1).padStart(2, "0"); //January is 0!
const tyyyy = tomorrowRaw.getFullYear();
const tomorrow = String(tyyyy + "-" + tmm + "-" + tdd);

// template code used to test hockeyHelper class

// let testResult = hockeyHelper.getGames(teams);
// testResult.then(testResult => {
//   testResult.forEach(game => {
//     console.log(game.gameTime + " - " + game.name);
//   })
// })

// let todayScoreTestResult = hockeyHelper.getTomorrowsResults();
// todayScoreTestResult.then(todayScoreTestResult => {
//   todayScoreTestResult.forEach(game => {
//     console.log(game.gameTime + " - " + game.name);
//   })
// })

const port = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get(`/`, (req: Request, res: Response) => {
  res.send("It's working!");
});

app.use("/user", userController);
app.use("/pool", poolController);
app.use("/guess", guessController);

app.get("/tomorrow", hockeyHelper.getTomorrowsResults);
app.get("/yesterday", hockeyHelper.getYesterdaysResults);
app.get("/today", hockeyHelper.getAllTodaysResults);

server.listen(port, () => {
  console.log(today);
  console.log(yesterday);
  console.log(tomorrow);
});
