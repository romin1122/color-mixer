let colorWheel = new iro.ColorPicker("#colorWheel", {
  width: 280,
  color: "#f00",
  borderWidth: 2,
  layoutDirection: "horizontal"
})

let colorsNode = document.querySelector('#colors');
let addBtn = document.querySelector('#add');

let colorSlots = [];
let selected = null;

let idControl = 0;

let createColorSlot = () => {
  let item = document.createElement('div');
  item.classList.add('item');

  let slotId = idControl++;

  let getId = () => {
    return slotId;
  }

  let color = "#00ffc8";
  
  let changeColor = (givenColor) => {
    item.style.backgroundColor = givenColor;
    color = givenColor;
  }

  let getColor = () => {
    return color;
  }

  let setSelected = () => {
    if (!item.classList.contains('selected')) {
      item.classList.add('selected');
      colorWheel.color.hexString = color;
    }
  }

  let unselect = () => {
    item.classList.remove('selected');
  }

  

  changeColor("#00ffc8");
  colorsNode.appendChild(item);



  return {
    getId,
    changeColor,
    setSelected,
    unselect,
    item,
    getColor
  }
}


let colorContainer = (function () {
  let selectSlot = (id) => {
    for (let i of colorSlots) {
      if (i.getId() == id) {

        for (let j of colorSlots) {
          if (selected != null && j.getId() == selected) {
            j.unselect();
          }
        }

        selected = id;
        i.setSelected();
      }
    }
  }


  let addColorSlot = () => {
    let colorSlot = createColorSlot();
    colorSlots.push(colorSlot);
    selectSlot(colorSlot.getId());

    colorSlot.item.onclick = () => {
      selectSlot(colorSlot.getId());
    }
  }


  let removeSlot = (id) => {
    for (let i of colorSlots.length) {
      if (colorSlots[i].getId() == id) {
        colorSlots.splice(i, 1);
        if (colorSlots.length > 0) {
          selected = colorSlots.length - 1;
        } else {
          selected = null;
        }
      }
    }
  }

  return {
    addColorSlot,
    selectSlot,
    removeSlot
  }
})()



addBtn.onclick = () => {
  colorContainer.addColorSlot();
}


colorWheel.on('color:change', function(color) {
  for (let i of colorSlots) {
    if (i.getId() == selected) {
      i.changeColor(color.hexString);
    }
  }

  let allColors = [];
  for (let i of colorSlots) {
    allColors.push($.Color(i.getColor()));
  }

  result.style.backgroundColor = Color_mixer.mix(allColors);
});

addBtn.click();