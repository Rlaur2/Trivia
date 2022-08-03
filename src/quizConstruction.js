import { quizDisplay } from "./quizDisplay";

const quizConstruction = (output) => {
    console.log(output);
    if (Array.isArray(output) && output[0].response_code) {
            console.log('response code 1 is the reason');
            return;
    } else {
        let alreadyRandomized = false;    
        let allQuestions = [];
        if (Array.isArray(output)) {
            output.forEach(item => {
                item.results.forEach(question => {
                    allQuestions.push(question);
                });
            });
        } else {
            output.results.forEach(question => {
                allQuestions.push(question);
            });
            alreadyRandomized = true;
        };
        if (!alreadyRandomized) {
            shuffleArray(allQuestions);
        }
        quizDisplay(allQuestions)
    }
}

 //code found on stack overflow to sort an array(in-place) randomly
 const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [array[i],array[j]] = [array[j],array[i]];
    }
};

export {quizConstruction};
export {shuffleArray}; 