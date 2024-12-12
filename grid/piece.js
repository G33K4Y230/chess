var pieces = []

var selectedPieceId = ""

const generatePieces = () => {

    const order = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle"]
    for (let x = 0; x < 8; x++) {

        new Piece(order[x], x + 1, 1, "black")
        new Piece("pawn", x + 1, 2, "black")

        const piece = new Piece(order[x], x + 1, 8, "white")
        piece.color = "white";
        new Piece("pawn", x + 1, 7, "white")

    }
}

const getPieceIndexByID = (id) => {
    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].id == id)
            return i
    }

    return false
}

class Piece {

    constructor(type, x, y, color) {
        this._id = "piece-" + type + "-" + x + "-" + y + "-" + color;
        this._type = type;
        this._x = x;
        this._y = y;
        this._color = color;
        this._moves = []
        spaces.forEach((space) => {
            if (space.x == this._x && space.y == this._y) {
                space.piece = this
            }
        })
        pieces.push(this)
    }

    get id() { return this._id; }
    get x() { return this._x; }
    get y() { return this._y; }
    get type() { return this._type; }
    get color() { return this._color; }
    get moves() { return this._moves; }

    set id(id) { this._id = id }

    set x(x) {
        if (x > 0 && x <= 8) this._x = x
        else console.log("Invalid Piece X position")
    }

    set y(y) {
        if (y > 0 && y <= 8) this._y = y
        else console.log("Invalid Piece Y Position")
    }

    set type(type) { this._type = type }

    set color(color) {
        this._color = color
    }

    set moves(moves) {
        this._moves = moves;
    }

    generateImage() {

        return "<img "
            + "id=\"" + this._id + "\" "
            + "src=\"img/chess-" + this._type + "-svgrepo-com" + (this._color == "white" ? "-invert" : "") + ".svg\" "
            + "class=\""
            + "max-w-[60%] max-h-[60%]" + " "
            + "\""
            + "/>"
    }

    moveTo(x, y) {

        const id = "space-" + x + "-" + y;
        const element = document.getElementById(id);
        const space = spaces[getSpaceIndexByID(id)];
        space.piece = this;

        const oldId = "space-" + this._x + "-" + this._y;
        const oldElement = document.getElementById(oldId);
        const oldSpace = spaces[getSpaceIndexByID(oldId)];
        oldSpace.piece = null;

        this._x = x;
        this._y = y;

        //document.getElementById(id).innerText = "";
    }

    showMoves(isVisible) {
        switch (this._type) {
            case "pawn":
                alert("show pawn moves");
                break;
            default:
                break
        }
    }

}