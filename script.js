const boxes = document.querySelectorAll('.box');
const undoButton = document.getElementById('undoButton');

let sourceBox = null;
let destinationBox = null;
const movesStack = [];

if (movesStack.length == 0) {
  undoButton.setAttribute('disabled', 'disabled');
}

const dragStart = (e) => {
  sourceBox = e.target;
  sourceBox.classList.add('fade');
  sourceBox.classList.add('highlight');
}

const dragEnd = () => {
  sourceBox.classList.remove('fade');
  sourceBox.classList.remove('highlight');
  if (movesStack.length > 0) {
    undoButton.removeAttribute('disabled');
  }
}

const dragOver = (e) => {
  e.preventDefault();
}

const drop = (e) => {
  e.preventDefault();
  destinationBox = e.target;
  destinationBox.classList.remove('highlight');

  if (destinationBox.className.includes('box')) {
    const sourceBgColor = window.getComputedStyle(sourceBox).getPropertyValue("background-color");
    const destinationBgColor = window.getComputedStyle(destinationBox).getPropertyValue("background-color");
    const obj = {
      sourceInfo: {
        innerHTML: sourceBox.innerHTML,
        bgColor: sourceBgColor,
        id: sourceBox.id
      },
      destInfo: {
        innerHTML: destinationBox.innerHTML,
        bgColor: destinationBgColor,
        id: destinationBox.id
      }
    };

    movesStack.push(obj);
    // Swap Text
    const temp = sourceBox.innerHTML;
    sourceBox.innerHTML = destinationBox.innerHTML;
    destinationBox.innerHTML = temp;
    // Swap Color
    sourceBox.style.backgroundColor = destinationBgColor;
    destinationBox.style.backgroundColor = sourceBgColor;
  }
}

boxes.forEach(box => {
  box.addEventListener('dragstart', dragStart);
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragend', dragEnd);
  box.addEventListener('drop', drop);
});

undoButton.addEventListener('click', () => {
  if (movesStack.length > 0) {
    const { sourceInfo, destInfo } = movesStack.pop();
    const sourceBox = document.getElementById(sourceInfo.id);
    const destinationBox = document.getElementById(destInfo.id);
    sourceBox.style.backgroundColor = sourceInfo.bgColor;
    destinationBox.style.backgroundColor = destInfo.bgColor;
    sourceBox.innerHTML = sourceInfo.innerHTML;
    destinationBox.innerHTML = destInfo.innerHTML;
    if (movesStack.length == 0) {
      undoButton.setAttribute('disabled', 'disabled');
    }
  }
});