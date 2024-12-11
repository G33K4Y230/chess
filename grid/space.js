
var spaces = []
var colours = []

const generateSpaces = (colour1, colour2) => {

  var colourIndex = 0
  colours = [colour1, colour2]

  for (let y = 1; y <= 8; y++) {
    for (let x = 1; x <= 8; x++) {
      new Space(x, y, colourIndex == 0 ? colours[0] : colours[1])
      colourIndex = colourIndex == 0 ? 1 : 0

    }
    colourIndex = colourIndex == 0 ? 1 : 0
  }
}

const getSpaceIndexByID = (id) => {
  for (var i = 0; i < spaces.length; i++)
    if (spaces[i].id == id) {
      return i
    }
}

class Space {

  constructor(x, y, color) {
    this._x = Number(x);
    this._y = Number(y);
    this._color = color
    this._id = "space-" + this._x + "-" + this._y;
    this.generate()
    this.generateEventListener()
    spaces.push(this)
  }

  get id() {
    return this._id;
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

  set id(id) {
    this._id = id;
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
    this._color = color;
    alert(this._color)
  }

  set piece(piece) {
    this._piece = piece
    document.getElementById(this._id).innerHTML = this._piece != null ?
      this._piece.generateImage() :
      ""
  }

  generate() {
    const data = "<div "
      + "id=\"" + this._id + "\"" + " "
      + "class=\""
      + "flex justify-center items-center" + " "
      + "bg-" + this._color + " "
      + "hover:bg-" + this._color + "/50" + " "
      + "row-start-" + this._y + " "
      + "col-start-" + this._x + " "
      + "\" "
      + ">"
      + "</div>";
    document.write(data);
  }

  generateEventListener() {
    const element = document.getElementById(this._id);
    element.addEventListener("click", click);
  }

}

const click = (e) => {

  var id;

  if (e.target.getAttribute("id") != null && e.target.getAttribute("id").includes("space")) {
    id = e.target.getAttribute("id");
  } else {
    id = e.target.getAttribute("id");
    id = document.getElementById(id).parentElement.id;
  }

  const clickColor = "slate-900";

  const space = spaces[getSpaceIndexByID(id)];
  const element = document.getElementById(space.id);
  if (element.classList.contains("isClicked")) {
    element.classList.remove("bg-" + clickColor)
    element.classList.add("bg-" + space.color)
    element.classList.remove("hover:bg-" + clickColor + "/70")
    element.classList.add("hover:bg-" + space.color + "/50")
    element.classList.remove("isClicked")
  } else {
    element.classList.remove("bg-" + space.color);
    element.classList.add("bg-" + clickColor);
    element.classList.remove("hover:bg-" + space.color + "/50");
    element.classList.add("hover:bg-" + clickColor + "/70");
    element.classList.add("isClicked");
  }

}

