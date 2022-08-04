import { mainPage } from ".";

const settingsBack = (categoriesChosen, lastCategorySelected) => {
    const container = document.querySelector('.container');
    container.replaceChildren();
    //setting up DOM as it was during mainPage()
    container.innerHTML = `<div class="row">
    <div class="col opening my-5">
        <div class="row welcome">
            <div class="col welcome-text">
                Open Trivia Quiz
            </div>
        </div>
        <div class="row">
            <div class="col p-4 instructions">
                Choose up to four specific categories or don't choose any for a random mix of all. 
            </div>
        </div>
        <div class="row category-row">
            <div class="col-2 category" data-id="9">General Knowledge</div>
            <div class="col-2 category" data-id="10">Entertainment: Books</div>
            <div class="col-2 category" data-id="11">Entertainment: Film</div>
            <div class="col-2 category" data-id="12">Entertainment: Music</div>
            <div class="col-2 category" data-id="13">Entertainment: Musicals & Theatres</div>
            <div class="col-2 category" data-id="14">Entertainment: Television</div>
        </div>
        <div class="row category-row">
            <div class="col-2 category" data-id="15">Entertainment: Video Games</div>
            <div class="col-2 category" data-id="16">Entertainment: Board Games</div>
            <div class="col-2 category" data-id="17">Science & Nature</div>
            <div class="col-2 category" data-id="18">Science: Computers</div>
            <div class="col-2 category" data-id="19">Science: Mathematics</div>
            <div class="col-2 category" data-id="20">Mythology</div>
        </div>
        <div class="row category-row">
            <div class="col-2 category" data-id="21">Sports</div>
            <div class="col-2 category" data-id="22">Geography</div>
            <div class="col-2 category" data-id="23">History</div>
            <div class="col-2 category" data-id="24">Politics</div>
            <div class="col-2 category" data-id="25">Art</div>
            <div class="col-2 category" data-id="26">Celebrities</div>
        </div>
        <div class="row category-row">
            <div class="col-2 category" data-id="27">Animals</div>
            <div class="col-2 category" data-id="28">Vehicles</div>
            <div class="col-2 category" data-id="29">Entertainment: Comics</div>
            <div class="col-2 category" data-id="30">Science: Gadgets</div>
            <div class="col-2 category" data-id="31">Entertainment: Japanese Anime & Manga</div>
            <div class="col-2 category" data-id="32">Entertainment: Cartoon & Animations</div>
        </div>
        <div class="row justify-content-end">
            <button class="btn col col-sm-2 btn-primary btn-lg category-next m-4">Next!</button>
        </div>
        <div class="row">
            <div class="col attribution">
                <a href="https://opentdb.com">Powered by the Open Trivia Database</a>
            </div>
        </div>
    </div>
</div>`;
const categories = document.querySelectorAll('.category');
let categorySelectionCheck = 0;
//the applies the selected class to the categories that already had it
for (let category of categories) {
    categoriesChosen.forEach(element => {
        if (element === category.dataset.id) {
            category.classList.toggle('selected');
            categorySelectionCheck++;
        }
    });
};
//if parameters were passed(pretty much only if going back from the settings page) 
//it passes the correct info and the previous categories are given the selected class
if (categoriesChosen && lastCategorySelected) {
    mainPage(categorySelectionCheck, lastCategorySelected);
} else {
    //if running this function from somewhere other than the settings page, the categories get reset essentially
    mainPage(0,'');
}
};

export {settingsBack};