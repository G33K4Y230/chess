const players =  []

var currentPlayer = ""

const generatePlayers = () => {
    players.push(
        new Player(
            "top",
            "black"
        )
    )
    players.push(
        new Player(
            "bottom",
            "white"
        )
    )

    currentPlayer = players[1].color
}

const togglePlayer = () => {
    currentPlayer = (currentPlayer == players[0].color ? players[1].color : players[0].color)
}

class Player{
    
    constructor(position, color) {
        this._position = position
        this._color = color
    }

    get position() { return this._position }
    get color() { return this._color }

    set position(position) { this._position = position }
    set color(color) { this._color = color }

}
