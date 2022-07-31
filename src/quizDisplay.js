const quizDisplay = (output) => {
    let alreadyRandomized = false;    
    if (output.length < 1) {
        return;
    };
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
        console.log('questions should\'ve been radomized');
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random()*(i+1));
                [array[i],array[j]] = [array[j],array[i]];
            }
        };
        shuffleArray(allQuestions);
    }
    console.log(allQuestions);
}

export {quizDisplay};