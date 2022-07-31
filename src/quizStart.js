import { quizDisplay } from "./quizDisplay";

const quizStart = (categoriesChosen, questionAmount, difficultySelected, typeSelected) => {
    const questionPerCategory = Math.floor(questionAmount / categoriesChosen.length);
    const extraQuestions = questionAmount - questionPerCategory * categoriesChosen.length;
    let difficulty = '';
    let type = '';
    if (difficultySelected === 'easy') {
        difficulty = '&difficulty=easy';
    } else if (difficultySelected === 'medium') {
        difficulty = '&difficulty=medium'
    } else if (difficultySelected === 'hard') {
        difficulty = '&difficulty=hard'
    };
    if (typeSelected === 'multiple') {
        type = '&type=multiple'
    } else if (typeSelected === 'boolean') {
        type = '&type=boolean'
    };
    if (categoriesChosen.length > 0) {
        const quizQuestions = categoriesChosen.map(async (item, index) => {
            let output = '';
            if (index === categoriesChosen.length - 1) {
                const response = await fetch(`https://opentdb.com/api.php?amount=${questionPerCategory+extraQuestions}&category=${item}${difficulty}${type}`);
                output = await response.json();
            } else {
                const response = await fetch(`https://opentdb.com/api.php?amount=${questionPerCategory}&category=${item}${difficulty}${type}`);
                output = await response.json();
            }
            if (output.response_code === 1) {
                const getCategoryIDs = async () => {
                    const response = await fetch('https://opentdb.com/api_category.php');
                    const output = await response.json();
                    let currentCategory = '';
                    output.trivia_categories.forEach(e => {
                        if (e.id === Number(item)) {
                            currentCategory = e.name;
                        };
                    });
                    alert(`The category ${currentCategory} does not have enough of the specified questions for this query.`);
                };
                getCategoryIDs();
            };
            return output;
        });
        Promise.all(quizQuestions).then(output => quizDisplay(output));
     } else {
        const noCategoryQuiz = async () => {
            const response = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}${difficulty}${type}`);
            const output = await response.json();
            quizDisplay(output);
        }
        noCategoryQuiz();
     };
};

export {quizStart}