import { shuffleArray } from "./quizConstruction";
import { nextQuestion } from "./nextQuestion";

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
let answerChosen = '';
const selectAnswer = (e) => {
    for (let answerSelection of answerSelections) {
        answerSelection.classList.remove('selected');
        e.target.classList.add('selected');
        answerChosen = e.target;
    };
};
topRow.addEventListener('mousedown', selectAnswer);
bottomRow.addEventListener('mousedown', selectAnswer);
let correctAnswers = 0;
const submitButton = document.querySelector('.submit');
const submitAction = () => {
    const result = document.querySelector('.result');
    if (!answerChosen) {
        alert('Please choose an answer.');
        return;
    } else if (answerChosen.innerHTML === questions[currentQuestion - 1].correct_answer) {
        result.classList.add('right');
        result.textContent = 'Correct!';
        correctAnswers++;
    } else {
        result.classList.add('wrong');
        result.textContent = 'Incorrect!';
        answerChosen.classList.remove('selected');
        answerChosen.classList.add('incorrect');
        for (let answerSelection of answerSelections) {
            if (answerSelection.innerHTML === questions[currentQuestion - 1].correct_answer) {
                answerSelection.classList.add('selected');
            }
        };
    };
    submitButton.removeEventListener('mousedown', submitAction);
    topRow.removeEventListener('mousedown', selectAnswer);
    bottomRow.removeEventListener('mousedown', selectAnswer);
    const buttonsRow = document.querySelector('.buttons');
    if (currentQuestion === questions.length) {
        const finishButton = document.createElement('button');
        finishButton.classList.toggle('btn');
        finishButton.classList.toggle('col');
        finishButton.classList.toggle('col-sm-1');
        finishButton.classList.toggle('btn-primary');
        finishButton.classList.toggle('next');
        finishButton.classList.toggle('m-4');
        finishButton.textContent = 'Finish!';
        buttonsRow.appendChild(finishButton);
        finishButton.addEventListener('mousedown', () => {
            endOfQuiz(questions, correctAnswers);
        });
    } else {
        const nextButton = document.createElement('button');
        nextButton.classList.toggle('btn');
        nextButton.classList.toggle('col');
        nextButton.classList.toggle('col-sm-1');
        nextButton.classList.toggle('btn-primary');
        nextButton.classList.toggle('next');
        nextButton.classList.toggle('m-4');
        nextButton.textContent = 'Next!';
        buttonsRow.appendChild(nextButton);
        nextButton.addEventListener('mousedown', () => {
            nextQuestion(questions, currentQuestion, correctAnswers);
        });
    };
}; 
submitButton.addEventListener('mousedown', submitAction);
};

export {quizDisplay};