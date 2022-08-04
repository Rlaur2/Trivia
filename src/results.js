import { reviewQuestion } from "./review";
import { settingsBack } from "./settingsBack";

const endOfQuiz = (questions, correctAnswers, currentQuestion) => {
    const container = document.querySelector('.container');
    container.replaceChildren();
    container.innerHTML = 
    `<div class="row justify-content-end">
    <div class="col-2 progress">
        End of quiz
    </div>
</div>
<div class="row">
    <div class="col opening my-5">
        <div class="row justify-content-center">
            <div class="col-6 adulation">
                
            </div>
        </div>
        <div class="row">
            <div class="col evaluation">
            
            </div>
        </div>
        <div class="row">
            <div class="col giphy">
                <img src="" alt="">
            </div>
        </div>
        <div class="row buttons">
            <button class="btn col col-sm-1 btn-primary review m-4">Review!</button>
            <button class="btn col col-sm-1 btn-primary new m-4">New Quiz!</button>
        </div>
        <div class="row">
            <div class="col attribution">
                <a href="https://opentdb.com">Powered by the Open Trivia Database</a>
            </div>
        </div>
        <div class="row">
            <div class="col attribution">
                <a href="https://giphy.com">Powered by GIPHY</a>
            </div>
        </div>        
    </div>
</div>`

//this code determines your score in percentage, it slices out the first digit and the decimal unless the score is 100 or 0
let resultsString = (correctAnswers / questions.length).toFixed(2);
let resultsStraight = '';
if (resultsString === '1.00') {
    resultsStraight = '100';
} else if (resultsString === '0.00') {
    resultsStraight = '0';
} else {
    resultsString = resultsString.slice(2,4);
    //this will slice off a leading zero from a score between 1 and 9, so 5% instead of 05%
    if (resultsString[0] === '0') {
        resultsString = resultsString.slice(1);
    }
    resultsStraight = resultsString;
}
const adulation = document.querySelector('.adulation');
//uses RNG to dole out a random adulation based off the results
let rng = 0;
if (resultsStraight === '100') {
    adulation.classList.add('excellent');
    adulation.textContent = 'Perfect!'
} else if ( resultsStraight < 100 && resultsStraight > 79) {
    adulation.classList.add('excellent');
    rng = Math.floor(Math.random()*3);
    if (rng === 0) {
        adulation.textContent = 'Congratulations!'
    } else if (rng === 1) {
        adulation.textContent = 'Amazing!';
    } else {
        adulation.textContent = 'Great!';
    }
} else if (resultsStraight <= 79 && resultsStraight > 59) {
    adulation.classList.add('good');
    rng = Math.floor(Math.random()*3);
    if (rng === 0) {
        adulation.textContent = 'Good job!';
    } else if (rng === 1) {
        adulation.textContent = 'Not bad!'
    } else {
        adulation.textContent = 'Alright!'
    }
} else if (resultsStraight <= 59 && resultsStraight > 44) {
    adulation.classList.add('mediocre');
    rng = Math.floor(Math.random()*3);
    if (rng === 0) {
        adulation.textContent = 'Nice try!';
    } else if (rng === 1) {
        adulation.textContent = 'Better luck next time!';
    } else {
        adulation.textContent = 'Good effort!'
    }
} else {
    adulation.classList.add('awful');
    rng = Math.floor(Math.random()*4);
    if (rng === 0) {
        adulation.textContent = 'Failure';
    } else if (rng === 1 ) {
        adulation.textContent = 'Awful';
    } else if (rng === 2) {
        adulation.textContent = 'Disgraceful'
    } else {
        adulation.textContent = 'Dumbass';
    }
};
const evaluation = document.querySelector('.evaluation');
evaluation.textContent = `You scored: ${correctAnswers} out of ${questions.length} - ${resultsStraight}% correct`;
const img = document.querySelector('img');
//displays random gif based off the adulation given
const displayGif = async () => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=h2c3vzphvIByUtBEb1rnOHMANHfHBmnj&s=${adulation.textContent}`, {mode: 'cors'});
        const output = await response.json();
        img.src = output.data.images.fixed_height.url; 
    } catch(error) {
        alert(error);
    }
};
displayGif();
const newQuiz = document.querySelector('.new');
newQuiz.addEventListener('mousedown', () => {
    settingsBack([],'');
});
const review = document.querySelector('.review');
//the DOM of the results screen is totally different than one from a question so this is needed when reviewing the questions
review.addEventListener('mousedown', () => {
    container.replaceChildren();
    container.innerHTML = 
    `<div class="row justify-content-end">
    <div class="col-2 progress">

    </div>
    </div>
    <div class="row">
    <div class="col opening my-5">
        <div class="row">
            <div class="col result">
                
            </div>
        </div>
        <div class="question">
            
        </div>
        <div class="row top answers">
    
        </div>
        <div class="row bottom answers">
        
        </div>
        <div class="row submit-row">
            <button class="btn col col-sm-1 btn-primary m-4 submit">Submit!</button>
        </div>
        <div class="row buttons">
            <button class="btn col col-sm-1 btn-primary start-over back m-4">Start Over!</button>
        </div>
    </div>
    </div>`;
    //And currentQuestion needs to be incremented by one to display the last question
    currentQuestion++;
    reviewQuestion(questions, currentQuestion, correctAnswers);
});

}
export {endOfQuiz};