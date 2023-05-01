//Begin
//TODO add pretify, 
//fix html link
import layout from './assets/js/languages.js';


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

activebackspace() {
    if (this.cursorLocation === 0) {
        return;
    }

    if (this.cursorLocation !== null) {
        this.value = this.value.slice(0, this.cursorLocation - 1)
            + this.value.slice(this.cursorLocation);
        if (this.cursorLocation > 0) {
            this.cursorLocation -= 1;
        }
    } else {
        this.value = this.value.slice(0, -1);
    }

    this.displayupdate();
}


activeCapsLock() {
    this.capsLock = !this.capsLock;
    const capsLock = document.querySelector('[name = "CapsLock"]');
    const buttonbox = document.querySelector('.buttons-container');
    const changeLetterUpperLower = (bttn, layout, lang) => {
        const activeBtn = bttn;
        if (activeBtn.innerHTML.length === 1 && layout[bttn.name][lang].length === 1) {
            if (activeBtn.innerText === activeBtn.innerText.toLowerCase()) {
                activeBtn.innerText = activeBtn.innerText.toUpperCase();
            } else {
                activeBtn.innerText = activeBtn.innerText.toLowerCase();
            }
        }
    };

    if (this.capsLock) {
        capsLock.classList.add('active');
        buttonbox.childNodes.forEach((bttn) => {
            changeLetterUpperLower(bttn, this.layout, this.language);
        });
    } else {
        capsLock.classList.remove('active');
        buttonbox.childNodes.forEach((bttn) => {
            changeLetterUpperLower(bttn, this.layout, this.language);
        });
    }
}

activedel() {
    if (this.cursorLocation !== null) {
        this.value = this.value.slice(0, this.cursorLocation)
            + this.value.slice(this.cursorLocation + 1);
        this.displayupdate();
    }
}

languagechange() {
    if (!!this.meta && !!this.altLeft) {
        if (this.language === 'eng') {
            this.language = 'deu';
        } else {
            this.language = 'eng';
        }

        localStorage.setItem('language', this.language);

        const buttonbox = document.querySelector('.buttons-container');
        buttonbox.childNodes.forEach((bttn) => {
            if (bttn.innerText.length === 1) {
                bttn.innerText = this.layout[bttn.name][this.language][0];
            }
        });
    }
}



keyboardInit() {
    const body = document.querySelector('body');
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    const buttonbox = document.createElement('div');
    buttonbox.setAttribute('class', 'buttons-container');

    Object.keys(this.layout).forEach((key) => {
        const newbtn = document.createElement('button');
        const value = this.layout[key][this.language][0];

        newbtn.innerText = value;
        newbtn.setAttribute('class', key.toLowerCase());
        newbtn.setAttribute('name', key);

        switch (value) {
            
            case 'Ctrl':
                break;
                case 'Alt':
                    break;

                    case 'fn':
                        break;
            case 'Cmd':
                break;

            case 'Shift':
                newbtn.addEventListener('mousedown', () => {
                    this.activeshift(true);
                });

                newbtn.addEventListener('mouseup', () => {
                    this.activeshift(false);
                });
                break;

                case 'Backspace':
                    newbtn.addEventListener('click', () => {
                    this.activebackspace();
                });
                break;

            case 'Tab':
                newbtn.addEventListener('click', () => {
                    this.textadd('   ');
                });
                break;

            case 'Caps Lock':
                newbtn.addEventListener('click', () => {
                    this.activeCapsLock();
                });
                break;

            case 'Enter':
                newbtn.addEventListener('click', () => {
                    this.textadd('\n');
                });
                break;
                case 'Del':
                    newbtn.addEventListener('click', () => {
                        this.activedel();
                    });
                    break;
            case 'ArrowUp':
                newbtn.innerHTML = createIconHTML('arrow_drop_up');
                newbtn.addEventListener('click', () => {
                    this.textadd('↑');
                });
                break;

            case 'ArrowLeft':
                newbtn.innerHTML = createIconHTML('arrow_left');
                newbtn.addEventListener('click', () => {
                    this.textadd('←');
                });
                break;

            case 'ArrowDown':
                newbtn.innerHTML = createIconHTML('arrow_drop_down');
                newbtn.addEventListener('click', () => {
                    this.textadd('↓');
                });
                break;

            case 'ArrowRight':
                newbtn.innerHTML = createIconHTML('arrow_right');
                newbtn.addEventListener('click', () => {
                    this.textadd('→');
                });
                break;

            case 'Space':
                newbtn.innerText = ' ';
                newbtn.addEventListener('click', () => {
                    this.textadd(' ');
                });
                break;

            default:
                newbtn.addEventListener('click', () => {
                    this.textadd(newbtn.innerText);
                });
        }
        buttonbox.appendChild(newbtn);
    });

    body.appendChild(buttonbox);

    document.body.addEventListener('keydown', (event) => {
        event.preventDefault();
        const buttonCurrent = document.querySelector(`[name = "${event.code}"]`);

        buttonCurrent.classList.add('active');

        switch (buttonCurrent.name) {



            case 'Backspace':
                this.activebackspace();
                break;


            case 'Del':
                    this.activedel();
                    break;

            case 'Tab':
                this.textadd('   ');
                break;
            case 'ShiftLeft':
                this.activeshift();
                break;

            case 'ShiftRight':
                this.activeshift();
                break;

        

            case 'CapsLock':
                this.activeCapsLock();
                break;

            case 'Enter':
                this.textadd('\n');
                break;

            case 'ArrowUp':
                this.textadd('↑');
                break;

            case 'ArrowLeft':
                this.textadd('←');
                break;

            case 'ArrowDown':
                this.textadd('↓');
                break;

            case 'ArrowRight':
                this.textadd('→');
                break;

            
            case 'ControlLeft':
                
                break;

            case 'AltLeft':
                this.altLeft = true;
                this.languagechange();
                break;

           

            case 'MetaLeft':
                this.meta = true;
                this.languagechange();
                break;
                case 'Space':
                    this.textadd(' ');
                    break;

            case 'MetaRight':
                break;
                case 'AltRight':
                    break;

            default:
                this.textadd(buttonCurrent.innerText);
        }
    });

    document.body.addEventListener('keyup', (event) => {
        event.preventDefault();
        const curBtn = document.querySelector(`[name = "${event.code}"]`);
        curBtn.classList.remove('active');

        switch (curBtn.name) {

            case 'CapsLock':
                this.activeCapsLock();
                break;


            case 'ShiftLeft':
                this.activeshift();
                break;

            case 'ShiftRight':
                this.activeshift();
                break;
            

            case 'ControlLeft':
                this.ctrl = false;
                break;

            case 'AltLeft':
                this.altLeft = false;
                break;

            default:
        }
    });
}

}

//Local storage

let newkeyboard;

if (localStorage.getItem('language')) {
    newkeyboard = new Keyboard(layout, localStorage.getItem('language'));
} else {
    newkeyboard = new Keyboard(layout, 'eng');
}

newkeyboard.displayInit();
newkeyboard.keyboardInit();



