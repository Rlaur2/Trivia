import { shuffleArray } from "./quizConstruction";
import { nextQuestion } from "./nextQuestion";
import { settingsBack } from "./settingsBack";
import { endOfQuiz } from "./results";

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
        <button class="btn col col-sm-1 btn-primary start-over back m-4">Start Over!</button>
    </div>
</div>
</div>`

const progress = document.querySelector('.progress');
//the text at the top right that displays which question you're on and how many are left
progress.textContent = `Question ${currentQuestion}/${questions.length}`;
const question = document.querySelector('.question');
//displays the actual question
question.innerHTML = questions[currentQuestion - 1].question;
const topRow = document.querySelector('.top');
const bottomRow = document.querySelector('.bottom');
let allAnswers = ''
if (questions[currentQuestion - 1].type === 'multiple') {
    //turns the answers of the questions into an object in order to store more information
    questions[currentQuestion - 1].incorrect_answers = questions[currentQuestion - 1].incorrect_answers.map(item => {
        return {name: item};
    });
    //this assignment is just a simple pointer to the array of questions, makes it easier to work with
    allAnswers = questions[currentQuestion - 1].incorrect_answers;
    //pushes the correct answer into the array and then shuffles the array in the next line
    allAnswers.push({name:questions[currentQuestion - 1].correct_answer, correct: true});
    shuffleArray(allAnswers);
    //adds each answer to the DOM and displays them
    allAnswers.forEach((item, index) => {
        const answer = document.createElement('div');
        answer.classList.toggle('col');
        answer.innerHTML = item.name;
        //this info is used to determine correct answer
        answer.dataset.index = index;
        //the first two are displayed in the top row, last two in bottom row
        if (index < 2) {
            topRow.appendChild(answer);
        } else {
            bottomRow.appendChild(answer);
        }
    });
} else {
    //True/False questions are much simpler to deal with
    const trueAnswer = document.createElement('div');
    trueAnswer.classList.toggle('col');
    trueAnswer.textContent = 'True';
    const falseAnswer = document.createElement('div');
    falseAnswer.classList.toggle('col');
    falseAnswer.textContent = 'False';
    topRow.appendChild(trueAnswer);
    bottomRow.appendChild(falseAnswer);
};
//code that removes the selected class to all then adds it to the target of the event listener
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
//correctAnswers tracks the amount of correct answers and is passed on to each succeeding function
let correctAnswers = 0;
const submitButton = document.querySelector('.submit');
const submitAction = () => {
    const result = document.querySelector('.result');
    //won't continue if no answer chosen
    if (!answerChosen) {
        alert('Please choose an answer.');
        return;
    } 
    if (questions[currentQuestion - 1].type === 'multiple') {
        //selection class isn't changed if answerChosen is correct
        if (allAnswers[answerChosen.dataset.index].correct) {
            result.classList.add('right');
            result.textContent = 'Correct!';
            correctAnswers++;
        } else {
            result.classList.add('wrong');
            result.textContent = 'Incorrect!';
            answerChosen.classList.remove('selected');
            answerChosen.classList.add('incorrect');
            //this loop finds the correct answer and adds the selected class to it
            for (let answerSelection of answerSelections) {
                if (allAnswers[answerSelection.dataset.index].correct) {
                    answerSelection.classList.add('selected');
                }
            };
        };
        //gives whatever answer was chosen the "selected" property to indicate it was selected during the review() function
        allAnswers[answerChosen.dataset.index].selected = true;
    } else {
        //similar code for true/false
        if (answerChosen.textContent === questions[currentQuestion - 1].correct_answer) {
            result.classList.add('right');
            result.textContent = 'Correct!';
            correctAnswers++;
        } else {
            result.classList.add('wrong');
            result.textContent = 'Incorrect!';
            answerChosen.classList.remove('selected');
            answerChosen.classList.add('incorrect');
            for (let answerSelection of answerSelections) {
                if (answerSelection.textContent === questions[currentQuestion - 1].correct_answer) {
                    answerSelection.classList.add('selected');
                }
            };
        };
        //keeps track of which boolean was chosen for review purposes
        questions[currentQuestion - 1].booleanChosen = answerChosen.textContent;
    };
    const submitRow = document.querySelector('.submit-row');
    submitRow.replaceChildren();
    //removes ability to select more answers after sbumitting
    topRow.removeEventListener('mousedown', selectAnswer);
    bottomRow.removeEventListener('mousedown', selectAnswer);
    const buttonsRow = document.querySelector('.buttons');
    //changes next button to finish button if on last question
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
            //runs the nextQuestion function which is very similar to this one barring some minor differences
            nextQuestion(questions, currentQuestion, correctAnswers);
        });
    };
}; 
submitButton.addEventListener('mousedown', submitAction);
const startOverButton = document.querySelector('.start-over');
startOverButton.addEventListener('mousedown', () => {
    //confirmation needed to restart quiz
    if (confirm('Start quiz from beginning: Are you sure?')) {
        settingsBack([],'');
    };
}); 
};

export {quizDisplay};