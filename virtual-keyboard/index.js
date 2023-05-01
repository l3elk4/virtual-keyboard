//Begin

const body = document.querySelector('body');
const notation = document.createElement('p');
notation.setAttribute('class', 'notation');

notation.innerText = 'This keyboard was proudly made in the MacOs\n'
    + 'For language change press leftCmd + leftAlt';

body.appendChild(notation);