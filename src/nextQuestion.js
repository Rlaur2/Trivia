import { shuffleArray } from "./quizConstruction";
import { endOfQuiz } from "./results";
import { reviewQuestion } from "./review";


//This module is extremely similar to quizDisplay barring some needed differences. 
//The differences are needed due to the possibility of this function being re-ran on an unanswered question
//the comments for this module will mostly focus on the differences
const nextQuestion = (questions, currentQuestion, correctAnswers) => {
    //currentQuestion increments by one each time this function runs
    currentQuestion++;
    //dom elements that will change each question
    const progress = document.querySelector('.progress');
    progress.textContent = `Question ${currentQuestion}/${questions.length}`
    const question = document.querySelector('.question');
    question.innerHTML = questions[currentQuestion - 1].question;
    const result = document.querySelector('.result');
    //resets the result div
    result.classList.remove('right');
    result.classList.remove('wrong');
    result.textContent = '';
    //clears out the top and bottom rows of answers
    const topRow = document.querySelector('.top');
    topRow.replaceChildren();
    const bottomRow = document.querySelector('.bottom');
    bottomRow.replaceChildren();
    let allAnswers = '';
    //the && checks are required to ensure the construction of the answers array only runs once
    //this is the intial code that is ran. The allAnswers array is shuffled.
    if (questions[currentQuestion - 1].type === 'multiple' && questions[currentQuestion - 1].incorrect_answers.length === 3) {
        questions[currentQuestion - 1].incorrect_answers = questions[currentQuestion - 1].incorrect_answers.map(item => {
            return {name: item};
        });
        allAnswers = questions[currentQuestion - 1].incorrect_answers;
        allAnswers.push({name:questions[currentQuestion - 1].correct_answer, correct: true});
        shuffleArray(allAnswers);
        allAnswers.forEach((item, index) => {
            const answer = document.createElement('div');
            answer.classList.toggle('col');
            answer.innerHTML = item.name;
            answer.dataset.index = index;
            if (index < 2) {
                topRow.appendChild(answer);
            } else {
                bottomRow.appendChild(answer);
            }
        });
        //this code runs if this question has been re-visted. It does not shuffle the allAnswers array
    } else if (questions[currentQuestion - 1].type === 'multiple' && allAnswers.length === 4) {
        allAnswers.forEach((item, index) => {
            const answer = document.createElement('div');
            answer.classList.toggle('col');
            answer.innerHTML = item.name;
            answer.dataset.index = index;
            if (index < 2) {
                topRow.appendChild(answer);
            } else {
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
const submitRow = document.querySelector('.submit-row');
const submitButton = document.createElement('button');
submitButton.classList.toggle('btn');
submitButton.classList.toggle('col');
submitButton.classList.toggle('col-sm-1');
submitButton.classList.toggle('btn-primary');
submitButton.classList.toggle('submit');
submitButton.classList.toggle('m-4');
submitButton.textContent = 'Submit!';
submitRow.appendChild(submitButton);
const submitAction = () => {
    if (!answerChosen) {
        alert('Please choose an answer.');
        return;
    } 
    if (questions[currentQuestion - 1].type === 'multiple') {
        if (allAnswers[answerChosen.dataset.index].correct) {
            result.classList.add('right');
            result.textContent = 'Correct!';
            correctAnswers++;
        } else {
            result.classList.add('wrong');
            result.textContent = 'Incorrect!';
            answerChosen.classList.remove('selected');
            answerChosen.classList.add('incorrect');
            for (let answerSelection of answerSelections) {
                if (allAnswers[answerSelection.dataset.index].correct) {
                    answerSelection.classList.add('selected');
                }
            };
        };
        allAnswers[answerChosen.dataset.index].selected = true;
    } else {
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
        }
        questions[currentQuestion - 1].booleanChosen = answerChosen.textContent;
    };
    submitRow.replaceChildren();
    topRow.removeEventListener('mousedown', selectAnswer);
    bottomRow.removeEventListener('mousedown', selectAnswer);
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
            endOfQuiz(questions, correctAnswers, currentQuestion);
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
const buttonsRow = document.querySelector('.buttons');
buttonsRow.replaceChildren();
const backButton = document.createElement('button');
backButton.classList.toggle('btn');
backButton.classList.toggle('col');
backButton.classList.toggle('col-sm-1');
backButton.classList.toggle('btn-primary');
backButton.classList.toggle('back');
backButton.classList.toggle('m-4');
backButton.textContent = 'Back!';
buttonsRow.appendChild(backButton);
backButton.addEventListener('mousedown', () => {
    //removes event listeners from the answers before running the reviewQuestion function when clicking Back
    topRow.removeEventListener('mousedown', selectAnswer);
    bottomRow.removeEventListener('mousedown', selectAnswer);
    reviewQuestion(questions, currentQuestion, correctAnswers);
});
};

export {nextQuestion};