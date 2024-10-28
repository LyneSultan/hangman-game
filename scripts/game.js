const randomWord = 'NABIHA';
const maxWrongGuesses = 6;
let wrongGuesses = 0;
const hangmanContainer = document.querySelector('.hangman');
let answer = [];
const man = document.createElement('div');
const letter = document.querySelectorAll('.letter');
const bodyandhands = document.createElement('div');
const legs = document.createElement('div');
const parts = document.createElement('div');


const answerSection = document.getElementById('answer-section');
const hangmanImages = [
  './assets/head.svg',
  './assets/left-hand.svg',
  './assets/body.svg',
  './assets/right-hand.svg',
  './assets/left-leg.svg',
  './assets/right-leg.svg',
];

function updateHangmanImage() {
  man.style.flexDirection = 'column';
  man.style.marginTop = "165px";

  if (wrongGuesses <= maxWrongGuesses) {
    const newPart = document.createElement('img');
    newPart.src = hangmanImages[wrongGuesses - 1];

     // Get the image filename without the path and extension
    const imageName = hangmanImages[wrongGuesses - 1].split('/').pop().split('.')[0];
    newPart.id = imageName;

    if (imageName === 'head') {
      parts.appendChild(newPart);
      man.appendChild(parts);
    } else if (imageName === 'left-hand' || imageName === 'body' || imageName === 'right-hand') {
      bodyandhands.appendChild(newPart);
    } else if (imageName === 'left-leg' || imageName === 'right-leg') {
      legs.appendChild(newPart);
      console.log(legs);
    }


    man.appendChild(bodyandhands);


    hangmanContainer.appendChild(man);
    man.appendChild(legs);

  }
}
function init() {
  answer = Array(randomWord.length).fill('_');
  wrongGuesses = 0;
    
  answerSection.innerHTML = answer.join(' '); // just design to make each answer index seperated with spaces not ,
}


function handleLetterClick(letter) {
  if (randomWord.includes(letter)) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === letter)
        answer[i] = letter;
    }
  } else {
    wrongGuesses++;
    updateHangmanImage();
  }
  answerSection.innerHTML = answer.join(' '); // just design to make each answer index seperated with spaces not ,
  if (!answer.includes('_')) {
    alert('Congratulations! You guessed the word!');
    location.reload(true);


  } else if (wrongGuesses > maxWrongGuesses) {
    alert('Game Over! The word was ' + randomWord);
    location.reload(true);
  }
  answerSection.innerHTML = answer.join(' '); // just design to make each answer index seperated with spaces not ,

}
letter.forEach((letterDiv) => {
  letterDiv.addEventListener('click', function () {
    if (letterDiv.classList.contains('disabled')) return;// to check if the letter is already chosen
    const letter = letterDiv.textContent;
    handleLetterClick(letter);
    letterDiv.classList.add('disabled');// to mark that this letter is already chosen
  });
});
init();
