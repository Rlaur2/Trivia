import { quizDisplay } from "./quizDisplay";

const quizConstruction = (output) => {
    //the only output that meets this condition is when response code 1 is received 
    if (Array.isArray(output) && output[0].response_code) {
            return;
    } else {
        let alreadyRandomized = false;    
        let allQuestions = [];
        //puts all the questions into a single array. Not needed since it was already in an array but it makes it easier to work with
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
            //when no category is chosen the questions are already randomized and don't need to be randomized again
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