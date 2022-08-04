import { settingsPage } from "./settings";
//default values when mainPage is ran initially instead of later on with passed parameters
let categorySelectionCheck = 0;
let lastCategorySelected = '';
//The passed parameters should've had the same name as before they were passed. I don't make the same mistake in the upcoming modules
const mainPage = (number, categorySelected) => {
const categories = document.querySelectorAll('.category');
//this variable is to keep a count of how many categories were selected, we want a max of 4
//If a number gets passed as a parameter(including zero), categorySelectionCheck becomes that number
if (number != undefined) {
   categorySelectionCheck = number;
};
//variable used to "undo" and unselect the last category chosen when 4 have already been chosen
//If a category selected gets passed, a loop is done to match the dataset.id and that becomes the lastCategorySelected
if (categorySelected) {
    for (let category of categories) {
        if (category.dataset.id === categorySelected.dataset.id) {
            lastCategorySelected = category;
        };
    };
};
//array that will contain the dataset.id of the clicked categories. The id is needed for the API call
let categoriesChosen = [];
for (let category of categories) {
    category.addEventListener('mousedown', e => {
        //if 4 categories have already been clicked, the last category selected will lose it's class
        if (categorySelectionCheck === 4 && !e.target.classList.contains('selected')) {
            lastCategorySelected.classList.remove('selected');
            e.target.classList.toggle('selected');
            lastCategorySelected = e.target;
        } else if (!e.target.classList.contains('selected')) {
            e.target.classList.toggle('selected');
            categorySelectionCheck++;
            lastCategorySelected = e.target;
        } else if (e.target.classList.contains('selected')) {
            e.target.classList.toggle('selected');
            categorySelectionCheck--;
        };
    });
};

const categoryNextButton = document.querySelector('.category-next');
categoryNextButton.addEventListener('mousedown', e => {
   for (let category of categories) {
    if (category.classList.contains('selected')) {
        categoriesChosen.push(category.dataset.id);
    }
   };
   const container = document.querySelector('.container');
   container.replaceChildren();
   //sets up the DOM for the next module
   container.innerHTML = `<div class="row">
   <div class="col opening my-5">
       <div class="row welcome">
           <div class="col welcome-text">
               Open Trivia Quiz
           </div>
       </div>
       <div class="row underline">
           <div class="col p-4 instructions">
               Select your quiz settings.
           </div>
       </div>
       <div class="row">
           <div class="col-4">
               <label for="question-amount">How many questions? Minimum: 1; Maximum: 50</label>
           </div>
           <div class="col-2">
               <input type="number" name="questionAmount" id="question-amount" min="1" max="50" value="10" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">
           </div>
       </div>
       <div class="row difficulty">
           <div class="col-4">Difficulty of questions:</div>
           <div class="col-2 selected" data-difficulty="any">Any</div>
           <div class="col-2" data-difficulty="easy">Easy</div>
           <div class="col-2" data-difficulty="medium">Medium</div>
           <div class="col-2" data-difficulty="hard">Hard</div>
       </div>
       <div class="row type">
           <div class="col-4">Types of questions:</div>
           <div class="col-3 question-type selected" data-type="any">Any</div>
           <div class="col-3 question-type" data-type="multiple">Multiple Choice</div>
           <div class="col-2 question-type" data-type="boolean">True/False</div>
       </div>
       <div class="row buttons">
           <button class="btn col col-sm-1 btn-primary settings-back m-4">Back!</button>
           <button class="btn col col-sm-1 btn-primary start m-4">Start!</button>
       </div>
       <div class="row">
           <div class="col attribution">
               <a href="https://opentdb.com">Powered by the Open Trivia Database</a>
           </div>
       </div>
   </div>
</div> `;
settingsPage(categoriesChosen, lastCategorySelected);
});
};
mainPage();

export {mainPage};


