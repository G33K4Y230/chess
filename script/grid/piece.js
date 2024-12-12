var pieces = []

var selectedPieceId = ""

const generatePieces = () => {

    const order = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle"]
    for (let x = 0; x < 8; x++) {

        new Piece(order[x], x + 1, 1, players[0])
        new Piece("pawn", x + 1, 2, players[0])

        const piece = new Piece(order[x], x + 1, 8, players[1])
        new Piece("pawn", x + 1, 7, players[1])

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

    constructor(type, x, y, player) {
        this._id = "piece-" + type + "-" + x + "-" + y + "-" + player.color;
        this._type = type;
        this._x = x;
        this._y = y;
        this._player = player;
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
    get player() { return this._player; }
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

    set player(player) {
        this._player = player
    }

    set moves(moves) {
        this._moves = moves;
    }

    generateImage() {

        return "<img "
            + "id=\"" + this._id + "\" "
            + "src=\"img/chess-" + this._type + "-svgrepo-com" + (this._player.position == "bottom" ? "-invert" : "") + ".svg\" "
            + "class=\""
            + "max-w-[60%] max-h-[60%]" + " "
            + "\""
            + "/>"
    }

   
    getMoves() {

        var moves = []
        var offsets = []

        switch (this._type) {
	case "pawn":
            offsets.push( { x: 0, y: 1 * (this._player.position == "top" ? 1 : -1) } )
            offsets.push( { x: 0, y: 2 * (this._player.position == "top" ? 1 : -1) } )
	    break;
	case "knight":
	    var o = [
		{x: -1, y: -2},
		{x: -1, y:  2},
		{x:  1, y: -2},
		{x:  1, y:  2},
		{x: -2, y: -1},
		{x: -2, y:  1},
		{x:  2, y: -1},
		{x:  2, y:  1}
	    ]
	    for(var i = 0; i < o.length; i++)
		offsets.push(o[i]);
	    break;
	case "bishop":
	    var normalizedOffsets = [
		{x: -1, y: -1},
		{x: -1, y:  1},
		{x:  1, y: -1},
		{x:  1, y:  1}
	    ]
	    normalizedOffsets.forEach((o) => {
		for(var i = 1; i <= 7; i++) {
		    offsets.push({
			x: o.x * i,
			y: o.y * i
		    })
		}
	    })
	    
	default:
	    break;
	}
	
        for (var i = 0; i < offsets.length; i++) {
            var move = {
                x: this._x + offsets[i].x,
                y: this._y + offsets[i].y
            }
            if (move.x > 0 && move.x <= 8
                && move.y > 0 && move.y <= 8
            ) moves.push(move)
        }

        return moves;
    }

    showMoves(isVisible) {
        var moves = this.getMoves()
        moves.forEach((move) => {
            const space = getSpaceIndexByPosition(move.x, move.y)
            const element = document.getElementById(space.id)
            element.innerHTML = isVisible ? 
                "qq" :
                space.piece == null ? "" : space.piece.generateImage()
        })
    }

    tryMoveTo(x, y) {

        var canMoveTo = false

        const moves = this.getMoves() 
        moves.forEach((move) => {
            if(move.x == x && move.y == y) {
                canMoveTo = true
            }
        })

        if(canMoveTo) {

            const oldId = "space-" + this._x + "-" + this._y;
            const oldElement = document.getElementById(oldId);
            const oldSpace = spaces[getSpaceIndexByID(oldId)];
            oldSpace.piece = null;
    
            const id = "space-" + x + "-" + y;
            const element = document.getElementById(id);
            const space = spaces[getSpaceIndexByID(id)];
            space.piece = this;
    
            this._x = x;
            this._y = y;
        }

        

        //document.getElementById(id).innerText = "";
    }


}

