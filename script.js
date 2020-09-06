const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const endgameEl = document.getElementById('end-game-container');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
];

let randomWord;
let score = 0;
let time = 10;

// getting the diffculty from LS and setting it up
let difficulty =
    localStorage.getItem('difficulty') !== null 
        ? localStorage.getItem('difficulty') 
        : 'medium';
difficultySelect.value =
    localStorage.getItem('difficulty') !== null 
        ? localStorage.getItem('difficulty') 
        : 'medium';
// ================================================

text.focus(); // focus on text

const timeInterval = setInterval(updateTime, 1000); // gameover timer

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
addWordToDOM();

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = `${time}s`;
    
    if (time === 0) { // end game
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="location.reload()">Reload</button>
    `;
    
    endgameEl.style.display = 'flex';
}

// input box event
text.addEventListener('input', (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = ''; // clearing

        if (difficulty.toLowerCase() === 'hard') {
            time += 2;
        } else if (difficulty.toLowerCase() === 'medium') {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});

// setting btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// settings select change
settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});
