// ======= variaveis do jogo ======
let img1 = 0;
let img2 = 0;
let ganhou = 0;

// funcao que avalia se as imagens são iguais 
function validate(event) {
    img1 = event.target;

//essa primeira parte analisa qual lado da div foi clicado e armazena na variavel
    if (img1.parentNode.className == "front") {
        img1 = img1.parentNode.parentNode.children[1].children[0];
    }
// se img2 for igual a zero signica que esta vazia, então ela recebe o valor da img1 e a img1 é resetada.     
    if (img2 == 0) {
        img2 = img1;
        img1 = 0

//aqui é realizada a comparação do atributo src de cada imagem se forem diferentes 
//ocorre um delay de 800ms e as imagens são viradas novamente
    } else if (img2.getAttribute('src') != img1.getAttribute('src')) {
        setTimeout(() => {
            img1.parentNode.parentNode.parentNode.parentNode.children[0].checked = false;
            img2.parentNode.parentNode.parentNode.parentNode.children[0].checked = false;

            img2 = 0;
            img1 = 0;
        }, 800);
    } else {

//cada acerto é somado ao contador (ganhou) quando chegar ao 6 ele vai gerar uma mensagem
        ganhou++;
        if (ganhou == 6) {
            setTimeout(() => {
                alert('GANHOU :)')
            }, 800);
        }
//quando ocorre um acerto as duas imagens recebem uma animaçao de confirmação        
        setTimeout(() => {
            img1.classList.add('animate__animated', 'animate__tada');
            img2.classList.add('animate__animated', 'animate__tada');

            img1 = 0;
            img2 = 0;
        }, 400);
    }
}



// construção do jogo
const Container = document.createElement('main');
Container.id = "container";

const title = document.createElement('h1');
title.innerText = "jogo da memoria";

document.querySelector('body').appendChild(title);
document.querySelector('body').appendChild(Container);

for (let elements = 0; elements <= 11; elements++) {

    //==========  variaveis dos elementos ===========
    const divFlipContainer = document.createElement('div');
    const inputCheckBox = document.createElement('input');
    const labelFlipContainer = document.createElement('label');
    const divFlipper = document.createElement('div');
    const divFront = document.createElement('div');
    const imgFront = document.createElement('img');
    const divBack = document.createElement('div');
    const imgBack = document.createElement('img');

    const images = ["bear", "lion", "fish", "mouse", "lion", "frog", "fish", "mouse", "bear", "cow", "frog", "cow"];

    //contrucao dos elementos
    Container.appendChild(divFlipContainer);
    divFlipContainer.className = "flip-container space";
   
    //input
    divFlipContainer.appendChild(inputCheckBox);
    inputCheckBox.setAttribute('type', 'checkbox');
    inputCheckBox.id = elements;

    //label
    divFlipContainer.appendChild(labelFlipContainer);
    labelFlipContainer.className = "flip-container";
    labelFlipContainer.setAttribute('for', elements);

    //div Flipper
    labelFlipContainer.appendChild(divFlipper);
    divFlipper.className = 'flipper';

    //div front
    divFlipper.appendChild(divFront);
    divFront.className = "front";

    //img front
    divFront.appendChild(imgFront)
    imgFront.addEventListener('click', validate);
    imgFront.setAttribute('src', './images/background.jpg');


    //div back
    divFlipper.appendChild(divBack);
    divBack.className = "back";

    //imgBack
    divBack.appendChild(imgBack);
    imgBack.addEventListener('click', validate);
    imgBack.setAttribute('src', `./images/${images[elements]}.jpg`);
}
