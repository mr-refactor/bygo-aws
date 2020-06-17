const colors = [
  "#A7BDF4",
  "#5AD2A7",
  "#BCB259",
  "#C564F2",
  "#4A9E57",
  "#CFEC1D",
  "#FC4386",
  "#6D4AB7",
];

let counter = 0

const pickColor = () => {
    if (counter > 7) {
        counter = 0
    }
    return colors[counter++]
}

export default pickColor;

