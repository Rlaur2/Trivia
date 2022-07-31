import { shuffleArray } from "./quizConstruction";

const quizDisplay = (questions) => {
let currentQuestion = 1;
const container = document.querySelector('.container');
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
        <button class="btn col col-sm-1 btn-primary start-over m-4">Start Over!</button>
    </div>
</div>
</div>`

const progress = document.querySelector('.progress');
progress.textContent = `Question ${currentQuestion}/${questions.length}`;
const question = document.querySelector('.question');
question.innerHTML = questions[currentQuestion - 1].question;
const topRow = document.querySelector('.top');
const bottomRow = document.querySelector('.bottom');

if (questions[currentQuestion - 1].type === 'multiple') {
    const allAnswers = questions[currentQuestion - 1].incorrect_answers;
    allAnswers.push(questions[currentQuestion - 1].correct_answer);
    shuffleArray(allAnswers);
    console.log(allAnswers,questions[currentQuestion - 1]);
    allAnswers.forEach((item, index) => {
        if (index < 2) {
            const answer = document.createElement('div');
            answer.classList.toggle('col');
            answer.innerHTML = item;
            topRow.appendChild(answer);
        } else {
            const answer = document.createElement('div');
            answer.classList.toggle('col');
            answer.innerHTML = item;
            bottomRow.appendChild(answer);
        }
    });
} else {
    const trueAnswer = document.createElement('div');
    trueAnswer.classList.toggle('col');
    trueAnswer.textContent = 'True';
    const falseAnswer = document.createElement('div');
    falseAnswer.classList.toggle('col');
    falseAnswer.textContent = 'False';
    topRow.appendChild(trueAnswer);
    bottomRow.appendChild(falseAnswer);
};
const answerSelections = document.querySelectorAll('.answers>.col');
topRow.addEventListener('mousedown', e => {
    for (let answerSelection of answerSelections) {
        answerSelection.classList.remove('selected');
        e.target.classList.add('selected');
    };
});
bottomRow.addEventListener('mousedown', e => {
    for (let answerSelection of answerSelections) {
        answerSelection.classList.remove('selected');
        e.target.classList.add('selected');
    };
})
}

export {quizDisplay};