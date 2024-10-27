
const randomWord = 'NABIHA'; // Add more words as needed
const maxWrongGuesses = 6;
let wrongGuesses = 0;
const hangmanContainer = document.querySelector('.hang');
let answer = [];
const man = document.createElement('div');
const letter = document.querySelectorAll('.letter');

const answerSection = document.getElementById('answer-section');
const hangmanImages = [
  './assets/head.svg',
  './assets/body.svg',
  './assets/left-hand.svg',
  './assets/right-hand.svg',
  './assets/left-leg.svg',
  './assets/right-leg.svg',
];

function updateHangmanImage() {
  if (wrongGuesses > 0 && wrongGuesses < maxWrongGuesses) {

    const parts = document.createElement('div');
    const newPart = document.createElement('img');
    newPart.src = hangmanImages[wrongGuesses - 1];
    parts.appendChild(newPart);
    man.appendChild(parts);
    hangmanContainer.appendChild(man);
  }
}
function init() {
  answer = Array(randomWord.length).fill('_');
  wrongGuesses = 0;
  man.replaceChildren(); // to clear the older hangman image whenever u reload
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
    init();
  } else if (wrongGuesses >= maxWrongGuesses) {
    alert('Game Over! The word was ' + randomWord);
    init();
  }
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
