
var spaces = []
var colours = []

var selectedSpaceId = ""

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
    if (spaces[i].id == id)
      return i

  return null;
}

const getSpaceIndexByPosition = (x, y) => {
  for (var i = 0; i < spaces.length; i++)
    if (spaces[i].x == x && spaces[i].y == y)
      return spaces[i]

  return null;
}

class Space {

  constructor(x, y, color) {

    this._x = x;
    this._y = y;
    this._color = color
    this._id = "space-" + this._x + "-" + this._y;
    this.generate()

    const element = document.getElementById(this._id)
    element.addEventListener("click", click);

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
    const element = document.getElementById(this._id)
    element.innerHTML = this._piece != null ?
      this._piece.generateImage() :
      ""

  }

  generate() {
    const data = "<div "
      + "id=\"" + this._id + "\"" + " "
      + "class=\""
      + "w-[100%] h-[100%] flex justify-center items-center" + " "
      + "bg-" + this._color + " "
      + "hover:bg-" + this._color + "/50" + " "
      + "row-start-" + this._y + " "
      + "col-start-" + this._x + " "
      + "\" "
      + ">"
      + "</div>";
    if (document.getElementById(this._id) == null)
      document.write(data);
  }

  setClicked(isClick) {

    if (isClick) {
      const element = document.getElementById(this._id)
      element.classList.remove("bg-" + this._color)
      element.classList.add("stroke-2");
      element.classList.add("stroke-solid");
      element.classList.add("stroke-black");
      selectedSpaceId = this._id;

      if (this._piece != null) {
        selectedPieceId = this._piece.id
        const piece = pieces[getPieceIndexByID(selectedPieceId)]
        piece.showMoves(true)
      }

    } else {

      if (selectedPieceId.length > 0) {
        const piece = pieces[getPieceIndexByID(selectedPieceId)]
        piece.moveTo(this._x, this._y)
        selectedPieceId = ""
      }

      const element = document.getElementById(selectedSpaceId)
      const space = spaces[getSpaceIndexByID(selectedSpaceId)]
      element.classList.add("bg-" + space.color)
      selectedSpaceId = ""
    }
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

  const index = getSpaceIndexByID(id);
  const space = spaces[index];

  if (selectedSpaceId.length > 0) {
    space.setClicked(false)
  } else {
    space.setClicked(true)
  }

  var type = "";
  try { type = space.piece.type; }
  catch (err) { }
  if (type.length == 0)
    type = "No Piece"
  //alert(type)
}

