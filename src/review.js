import { nextQuestion } from "./nextQuestion";
import { settingsBack } from "./settingsBack";
import { endOfQuiz } from "./results";

const reviewQuestion = (questions, currentQuestion, correctAnswers) => {
    //currentQuestion decrements by 1 by default when running the reviewQuestion function
    currentQuestion--;
    //the dom elements that will change based off which question you're looking at
    const progress = document.querySelector('.progress');
    progress.textContent = `Question ${currentQuestion}/${questions.length}`;
    const question = document.querySelector('.question');
    question.innerHTML = questions[currentQuestion - 1].question;
    const result = document.querySelector('.result');
    //by default the result is gonna say Incorrect and only change to correct if correct answer was selected
    result.classList.remove('right');
    result.classList.add('wrong');
    result.textContent = 'Incorrect!';
    const topRow = document.querySelector('.top');
    const bottomRow = document.querySelector('.bottom');
    topRow.replaceChildren();
    bottomRow.replaceChildren();
    if (questions[currentQuestion - 1].type === 'multiple') {
        const allAnswers = questions[currentQuestion - 1].incorrect_answers;
        allAnswers.forEach((item, index) => {
            const answer = document.createElement('div');
            answer.classList.toggle('col');
            answer.innerHTML = item.name;
            answer.dataset.index = index;
            if (index < 2) {
                topRow.appendChild(answer);
            } else {
                bottomRow.appendChild(answer);
            };
            //these two if/else statements are used to find out if the answer selected is correct or incorrect
            if (item.selected && !item.correct) {
                answer.classList.add('incorrect');
            } else if (item.correct) {
                answer.classList.add('selected');
            };
            //just one if statement is needed to determine whether the selected answer was the correct one.
            //If it is the results text will display as correct
            //If not, the default is already to display as incorrect
            if (item.selected && item.correct) {
                result.classList.toggle('right');
                result.textContent = 'Correct!'
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
        //This if/else tree is used to determine one of four possibilities with the boolean questions. 
        if (questions[currentQuestion - 1].booleanChosen === questions[currentQuestion - 1].correct_answer)  {
            if (questions[currentQuestion - 1].booleanChosen === 'True') {
                trueAnswer.classList.toggle('selected');
            } else {
                falseAnswer.classList.toggle('selected');
            }
            result.classList.add('right');
            result.textContent = 'Correct!'
        } else {
            if (questions[currentQuestion - 1].booleanChosen === 'True') {
                trueAnswer.classList.toggle('incorrect');
                falseAnswer.classList.toggle('selected');
            } else {
                falseAnswer.classList.toggle('incorrect');
                trueAnswer.classList.toggle('selected');
            }
            result.classList.add('wrong');
            result.textContent = 'Incorrect!';
        }
    };
const submitRow = document.querySelector('.submit-row');
//clears the submit button if it's present
submitRow.replaceChildren();
const buttonsRow = document.querySelector('.buttons');
buttonsRow.replaceChildren();
const backButton = document.createElement('button');
backButton.classList.toggle('btn');
backButton.classList.toggle('col');
backButton.classList.toggle('col-sm-1');
backButton.classList.toggle('btn-primary');
backButton.classList.toggle('m-4');
//if the first question in the array is being displayed then the "back" button turns into "start over"
if (currentQuestion - 1 === 0) {
    backButton.classList.toggle('start-over');
    backButton.textContent = 'Start Over!';
    backButton.addEventListener('mousedown', () => {
        if (confirm('Start quiz from beginning: Are you sure?')) {
            settingsBack([],'');
        };
    });
} else {
    backButton.classList.toggle('back');
    backButton.textContent = 'Back!';
    backButton.addEventListener('mousedown', () => {
        //clicking on the "back" button re-runs this function
        reviewQuestion(questions, currentQuestion, correctAnswers);
    });
}
buttonsRow.appendChild(backButton);
const nextButton = document.createElement('button');
nextButton.classList.toggle('btn');
nextButton.classList.toggle('col');
nextButton.classList.toggle('col-sm-1');
nextButton.classList.toggle('btn-primary');
nextButton.classList.toggle('m-4');
nextButton.classList.toggle('next');
nextButton.textContent = 'Next!';
if (currentQuestion === questions.length) {
    nextButton.textContent = 'Results!';
    nextButton.addEventListener('mousedown', () => {
        //if you're at the end of the quiz the next button turns into "Results"
        endOfQuiz(questions, correctAnswers, currentQuestion);
    });
//This patch of logic determines whether the "next" question has been answered or not
} else if (questions[currentQuestion].incorrect_answers.length === 4) {
    let answered = false;
    for (let i = 0; i < 4; i++) {
        if (questions[currentQuestion].incorrect_answers[i].selected) {
            answered = true;
        }
    }
    if (answered === false) {
        nextButton.addEventListener('mousedown', () => {
            nextQuestion(questions, currentQuestion, correctAnswers);
        });
    } else {
        nextButton.addEventListener('mousedown', () => {
            //currentQuestion must increment by 2 in order to counteract the defaule decrement of 1 when reviewing the "next" question
            currentQuestion += 2;
            reviewQuestion(questions, currentQuestion, correctAnswers);
        });
    }
} else if (questions[currentQuestion].booleanChosen) {
    nextButton.addEventListener('mousedown', () => {
        //if booleanChosen exists then the question has been answered
        currentQuestion += 2;
        reviewQuestion(questions, currentQuestion, correctAnswers);
    });
} else {
    nextButton.addEventListener('mousedown', () => {
        nextQuestion(questions, currentQuestion, correctAnswers);
    })
}
buttonsRow.appendChild(nextButton);
};

export {reviewQuestion}