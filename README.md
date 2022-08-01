# Trivia
Make a trivia game website using the Open Trivia DB API
HTTPS://www.opentdb.com/api_config.php

Ideas to implement
-Learn and use Bootstrap on this project
-Allow user to select category, amount of questions, true/false and/or multiple choice, and difficulty of questions
-The API only allows one trivia category per call, so use multiple calls in order to combine categories, divide the amount of questions between each chosen category
-Do the same for combining difficulties
-Use the token generator to ensure unique sessions and
reset token when 'Code 4: Token Empty' is returned
-Display a results screen at the end with percentage of correct answers

Things to polish
- Make sure every button has pointer:cursor
- Add token to API call so no repeats, then make sure you deal with the errors
- Add a "loading" screen if possible during longer API calls
- Refactor code to not use a loop to find correct answer

Things to fix
-If response code 1 happens the quiz still displays
-fix font sizing with min/max or clamp