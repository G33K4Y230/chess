class Piece {

    constructor(type, x, y, player) {
        this._type = type
        this._x = x;
        this._y = y;
        this._player = player
        spaces.forEach((space) => {
            if(space.x == this._x && space.y == this._y) {
                space.piece = this
                return
            }
        })
    }

    get x() { return this._x }
    get y() { return this._y }
    get type() { return this._type }
    get player() { return this._player }

    set x(x) {
        if(x > 0 && x <= 8) this._x = x
        else console.log("Invalid Piece X position")
    }

    set y(y) {
        if(y > 0 && y <= 8) this._y = y
        else console.log("Invalid Piece Y Position")
    }

    set type(type) { this._type = type }

    set player(player) {
        if(player === "white" || player === "black") this._player = player
        else console.log("Invalid Pice Player")
    }

    generateImage() { 
        return "<img "
            + "src=\"img/chess-" + this._type + "-svgrepo-com" + (this._player == "white" ? "-invert" : "") + ".svg\""
            + "class=\"max-w-[70%]\""
            + "/>"
      }

}