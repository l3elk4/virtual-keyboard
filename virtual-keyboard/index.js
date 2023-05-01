//Begin

const body = document.querySelector('body');
const notation = document.createElement('p');
notation.setAttribute('class', 'notation');

notation.innerText = 'This keyboard was proudly made in the MacOs\n'
    + 'For language change press leftCmd + leftAlt';

body.appendChild(notation);

class Keyboard {
  constructor (layout, language) {
      this.meta = false;
      this.space = false;
      this.layout = layout;
      this.shift = false;
      this.cursorLocation = null;
      this.ctrl = false;
      this.capsLock = false;
      this.leftAlt = false;
      this.language = language;
      this.value = '';
  }

displayInit() {
  const body = document.querySelector('body');
  const input = document.createElement('textarea');
  input.setAttribute('class', 'input-field');
  input.addEventListener('click', () => {
      this.cursorLocation = input.selectionEnd;
  });
  body.appendChild(input);
}

displayupdate() {
  document.querySelector('.input-field').textContent = this.value;
}


textadd(buttonvalue) {
  if (this.cursorLocation === null) {
      this.value += buttonvalue;
  } else {
      this.value = this.value.slice(0, this.cursorLocation)
          + buttonvalue + this.value.slice(this.cursorLocation);
      this.cursorLocation += buttonvalue.length;
  }

  this.displayupdate();
}

activeshift() {
  this.shift = !this.shift;
  const buttonbox = document.querySelector('.buttons-container');
  buttonbox.childNodes.forEach((bttn) => {
      const currentbutton = bttn;
      const current = this.layout[bttn.name][this.language];
      if (current[1]) {
          if (currentbutton.innerText === current[0]) {
              currentbutton.innerText = current[1];
          } else {
              currentbutton.innerText = current[0];
          }
      } else if (currentbutton.innerText.length === 1) {
          if (currentbutton.innerText === currentbutton.innerText.toLowerCase()) {
              currentbutton.innerText = currentbutton.innerText.toUpperCase();
          } else {
              currentbutton.innerText = currentbutton.innerText.toLowerCase();
          }
      }
  });
}

}