import { settingsPage } from "./settings";

const categories = document.querySelectorAll('.category');
//this variable is to keep a count of how many categories were selected, we want a max of 4
let categorySelectionCheck = 0;
//variable used to "undo" and unselect the last category chosen when 4 have already been chosen
let lastCategorySelected = '';
//array that will contain the dataset.id of the chosen categories. The id is needed for the API call
const categoriesChosen = [];
for (let category of categories) {
    category.addEventListener('mousedown', e => {
        if (categorySelectionCheck === 4 && !e.target.classList.contains('selected')) {
            lastCategorySelected.classList.toggle('selected');
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
               <input type="number" name="questionAmount" id="question-amount" min="1" max="50" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">
           </div>
       </div>
       <div class="row difficulty">
           <div class="col-4">Difficulty of questions:</div>
           <div class="col-2">Any</div>
           <div class="col-2">Easy</div>
           <div class="col-2">Medium</div>
           <div class="col-2">Hard</div>
       </div>
       <div class="row type">
           <div class="col-4">Types of questions:</div>
           <div class="col-3">Any</div>
           <div class="col-3">Multiple Choice</div>
           <div class="col-2">True/False</div>
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
settingsPage();
});


