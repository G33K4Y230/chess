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

    currentPlayer = players[0].color
}

const togglePlayer = () => {
    const nextPlayersIndex = (currentPlayer == players[0].color ? 1 : 0)
    alert("Toggling player to: " + players[nextPlayersIndex].color)
    currentPlayer = players[nextPlayersIndex].color
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