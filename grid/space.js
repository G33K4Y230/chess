
var spaces = []

const generateSpaces = (color1, color2) => {
    
    var colorIndex = 0

    for (let y = 1; y <= 8; y++) {
        for (let x = 1; x <= 8; x++) {
            new Space(x, y, colorIndex == 0 ? color1 : color2)
            colorIndex = colorIndex == 0 ? 1 : 0
        }
        colorIndex = colorIndex == 0 ? 1 : 0
    }
}

class Space {

  constructor(x, y, color) {
    this._x = Number(x);
    this._y = Number(y);
    this._color = color
    this.generate()
    spaces.push(this)
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get color() {
    return this._color;
  }
  get piece() {
    return this._piece;
  }

  set x(x) {
    if (!isNaN(x) && x >= 1 && x <= 8) this._x = x;
    else console.log("Invalid Space X Position");
  }

  set y(y) {
    if (!isNaN(y) && y >= 1 && y <= 8) this._y = y;
    else console.log("Invalid Space Y Position");
  }

  set color(color) {
    if (color === "black" || color === "white") this._color = color;
    else console.log("Invalid Space color");
  }

  set piece(piece) {
    this._piece = piece
    document.getElementById(this._id).innerHTML = this._piece != null ? 
        this._piece.generateImage() : 
        ""
  }

  generate() {
    this._id = "space-" + this._x + "-" + this._y;
    document.write("<div "
        + "id=\"" + this._id + "\"" + " "
        + "class=\""
        + "flex justify-center items-center" + " "
        + "bg-" + this._color +  " "
        + "hover:bg-" + this._color + "/50" + " "
        + "row-start-" + this._y + " "
        + "col-start-" + this._x
        + "\">"
        + "</div>"
    )
  }
}
