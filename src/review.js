import { nextQuestion } from "./nextQuestion";
import { settingsBack } from "./settingsBack";
import { endOfQuiz } from "./results";

const reviewQuestion = (questions, currentQuestion, correctAnswers) => {
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
            if (item.selected && !item.correct) {
                answer.classList.add('incorrect');
            } else if (item.correct) {
                answer.classList.add('selected');
            };
            if (item.selected && item.correct) {
                //only if correct answer was selected will the result div display as correct
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
        if (questions[currentQuestion - 1].booleanChosen === questions[currentQuestion - 1].correct_answer)  {
            if (questions[currentQuestion - 1].booleanChosen === 'True') {
                trueAnswer.classList.toggle('selected');
            } else {
                falseAnswer.classList.toggle('selected');
            }
            result.classList.add('right');
            result.textContent = 'Correct!'
        } else {
            if (questions.booleanChosen === 'True') {
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
submitRow.replaceChildren();
const buttonsRow = document.querySelector('.buttons');
buttonsRow.replaceChildren();
const backButton = document.createElement('button');
backButton.classList.toggle('btn');
backButton.classList.toggle('col');
backButton.classList.toggle('col-sm-1');
backButton.classList.toggle('btn-primary');
backButton.classList.toggle('m-4');
if (currentQuestion - 1 === 0) {
    backButton.classList.toggle('start-over');
    backButton.textContent = 'Start Over!';
    backButton.addEventListener('mousedown', () => {
        settingsBack([],'');
    });
} else {
    backButton.classList.toggle('back');
    backButton.textContent = 'Back!';
    backButton.addEventListener('mousedown', () => {
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
        endOfQuiz(questions, correctAnswers, currentQuestion);
    });
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
            currentQuestion += 2;
            reviewQuestion(questions, currentQuestion, correctAnswers);
        });
    }
} else if (questions[currentQuestion].booleanChosen) {
    nextButton.addEventListener('mousedown', () => {
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