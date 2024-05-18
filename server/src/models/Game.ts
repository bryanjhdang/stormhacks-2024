enum result {
    AWAY, 
    HOME
}

export class Game {
    constructor(
        id : string,
        name: string,
        gameTime: Date,
        awayTeam: string,
        homeTeam: string,
        winner: result  
    ) {};
}