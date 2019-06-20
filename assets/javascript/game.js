const answers = [
    {
        'animal': 'Hippo',
        'image': 'assets/images/hippo.png'
    },
    {
        'animal': 'Zebra',
        'image': 'assets/images/zebra.jpg'
    },
    {
        'animal': 'Penguin',
        'image': 'assets/images/penguin.jpg'
    },
    {
        'animal': 'Giraffe',
        'image': 'assets/images/giraffe.jpg'
    },
    {
        'animal': 'Meerkat',
        'image': 'assets/images/Meerkat.jpg'
    },
];
var startGame = false;
var allowedGuesses = 8;
var attemptedGuesses = 0;
var randomIndex = Math.floor(Math.random() * answers.length);
var randomAnswer = answers[randomIndex].animal;
var guesses = [];
var wins = 0;
var losses = 0;

document.addEventListener('keydown', function (event) {
    if (startGame && /^[a-z]$/i.test(event.key)) {
        recordGuess(event.key);
    }
    if (!startGame) {
        startGame = true;
        setupGame();
    }
});

function resetGame() {
    attemptedGuesses = 0;
    randomIndex = Math.floor(Math.random() * answers.length);
    randomAnswer = answers[randomIndex].animal;
    guesses = [];
    setupGame();
}

function setupGame() {
    checkIfWin();
    document.getElementById('guesses').innerHTML = 'You have ' + (allowedGuesses - attemptedGuesses) + ' remaining!';
    document.getElementById('attempted-guesses').innerHTML = guesses.join(' ');
    document.getElementById('wins').innerHTML = 'Wins: ' + wins;
    document.getElementById('losses').innerHTML = 'Losses: ' + losses;
}

function checkIfWin() {
    var display = "";
    randomAnswer.split('').forEach(function (letter) {
        if (guesses.indexOf(letter.toLowerCase()) != -1) {
            display = display.concat(letter);
        } else {
            display = display.concat("_");
        }
    });
    document.getElementById('answer').innerHTML = display.split('').join(' ');

    if (display == randomAnswer) {
        return true;
    } else {
        return false;
    }
}


function recordGuess(letter) {
    if (guesses.indexOf(letter) == -1) {
        guesses.push(letter);
        if (randomAnswer.indexOf(letter) == -1 && randomAnswer.indexOf(letter.toUpperCase()) == -1) {
            if ((attemptedGuesses < allowedGuesses)) attemptedGuesses++;
            document.getElementById('guesses').innerHTML = 'You have ' + (allowedGuesses - attemptedGuesses) + ' remaining!';
            if (attemptedGuesses >= allowedGuesses) {
                document.getElementById('answer').innerHTML = 'You lose<br>The anser was ' + randomAnswer;
                losses++;
                setTimeout(resetGame, 2000);
            }
        } else {
            if (checkIfWin()) {
                document.getElementById('answer').innerHTML = 'You win!';
                wins++;
                document.getElementById('image').style.backgroundImage = 'url(' + answers[randomIndex].image + ')';
                setTimeout(resetGame, 2000);
            }
        }
    }
    document.getElementById('attempted-guesses').innerHTML = guesses.join(' ');
}