import { quizConstruction } from "./quizConstruction";

const quizStart = (categoriesChosen, questionAmount, difficultySelected, typeSelected) => {
    //divides the amount of questions per amount of categories so each category has an even amount of questions
    const questionPerCategory = Math.floor(questionAmount / categoriesChosen.length);
    //however division doesn't always give a whole number so this variable is to track the leftover questions
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
        //An API call is needed for each category selected so an async loop is ran with each iteration calling the API
        const quizQuestions = categoriesChosen.map(async (item, index) => {
            let output = '';
            //this will tack on the extra questions to the last category
            if (index === categoriesChosen.length - 1) {
                const response = await fetch(`https://opentdb.com/api.php?amount=${questionPerCategory+extraQuestions}&category=${item}${difficulty}${type}`);
                output = await response.json();
            } else {
                const response = await fetch(`https://opentdb.com/api.php?amount=${questionPerCategory}&category=${item}${difficulty}${type}`);
                output = await response.json();
            }
            //response code 1 means there aren't enough questions to fulfill the query (example: requesting 50 hard multiple choice Entertainment: Musicals & Theatres)
            if (output.response_code === 1) {
                //runs an async function to call API with category info. I could've hard coded this 
                //and made the categoriesChosen an object with the name of the category in it but I did this for extra practice with async/await
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
        //Promise.all is needed since the results of the API calls is an array of promises
        Promise.all(quizQuestions).then(output => quizConstruction(output));
     } else {
        //only a single API call is needed when no categories are chosen
        const noCategoryQuiz = async () => {
            const response = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}${difficulty}${type}`);
            const output = await response.json();
            quizConstruction(output);
        }
        noCategoryQuiz();
     };
};

export {quizStart}