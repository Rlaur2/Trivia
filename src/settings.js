import { settingsBack } from "./settingsBack";
import { quizStart } from "./quizStart";

const settingsPage = (categoriesChosen, lastCategorySelected) => {
    //questionAmount is the "input" element
    const questionAmount = document.querySelector('#question-amount');
    const difficultyRow = document.querySelector('.difficulty');
    let difficultySelected = '';
    difficultyRow.addEventListener('mousedown', e => {
        //returns if you don't click on one of the actual options
        if (e.target.classList.contains('col-4') || e.target.classList.contains('selected')) {
            return;
        }
        //removes the selected class from all then applies it to the target of the event listener  
        const difficulties = document.querySelectorAll('.difficulty>.col-2');
        for (let difficulty of difficulties) {
            difficulty.classList.remove('selected');0
        } 
        e.target.classList.toggle('selected');
        difficultySelected = e.target.dataset.difficulty;
    });
    //the code to select the type of questions is nearly identical to choosing the difficulty
    let typeSelected = '';
    const typeRow = document.querySelector('.type');
    typeRow.addEventListener('mousedown', e => {
        if (e.target.classList.contains('col-4') || e.target.classList.contains('selected')) {
        return;
        };  
        const types = document.querySelectorAll('.question-type');
        for (let type of types) {
            type.classList.remove('selected');
        }
        e.target.classList.toggle('selected');
        typeSelected = e.target.dataset.type;
    });

    const backButton = document.querySelector('.settings-back');
    backButton.addEventListener('mousedown', e => {
        settingsBack(categoriesChosen, lastCategorySelected);
    })

    const startButton = document.querySelector('.start');
    startButton.addEventListener('mousedown', e => {
        if (questionAmount.value > 50) {
            alert('The quiz cannot be more than 50 questions!');
            return;
        } else if (questionAmount.value < 1) {
            alert('The quiz cannot be 0 or less than 0!');
            return;
        }
        quizStart(categoriesChosen, questionAmount.value, difficultySelected, typeSelected);
    });
};

export {settingsPage};