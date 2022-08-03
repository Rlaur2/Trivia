(()=>{"use strict";var e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{J:()=>r});const t=(e,t)=>{const s=document.querySelector(".container");s.replaceChildren(),s.innerHTML='<div class="row">\n    <div class="col opening my-5">\n        <div class="row welcome">\n            <div class="col welcome-text">\n                Open Trivia Quiz\n            </div>\n        </div>\n        <div class="row">\n            <div class="col p-4 instructions">\n                Choose up to four specific categories or don\'t choose any for a random mix of all. \n            </div>\n        </div>\n        <div class="row category-row">\n            <div class="col-2 category" data-id="9">General Knowledge</div>\n            <div class="col-2 category" data-id="10">Entertainment: Books</div>\n            <div class="col-2 category" data-id="11">Entertainment: Film</div>\n            <div class="col-2 category" data-id="12">Entertainment: Music</div>\n            <div class="col-2 category" data-id="13">Entertainment: Musicals & Theatres</div>\n            <div class="col-2 category" data-id="14">Entertainment: Television</div>\n        </div>\n        <div class="row category-row">\n            <div class="col-2 category" data-id="15">Entertainment: Video Games</div>\n            <div class="col-2 category" data-id="16">Entertainment: Board Games</div>\n            <div class="col-2 category" data-id="17">Science & Nature</div>\n            <div class="col-2 category" data-id="18">Science: Computers</div>\n            <div class="col-2 category" data-id="19">Science: Mathematics</div>\n            <div class="col-2 category" data-id="20">Mythology</div>\n        </div>\n        <div class="row category-row">\n            <div class="col-2 category" data-id="21">Sports</div>\n            <div class="col-2 category" data-id="22">Geography</div>\n            <div class="col-2 category" data-id="23">History</div>\n            <div class="col-2 category" data-id="24">Politics</div>\n            <div class="col-2 category" data-id="25">Art</div>\n            <div class="col-2 category" data-id="26">Celebrities</div>\n        </div>\n        <div class="row category-row">\n            <div class="col-2 category" data-id="27">Animals</div>\n            <div class="col-2 category" data-id="28">Vehicles</div>\n            <div class="col-2 category" data-id="29">Entertainment: Comics</div>\n            <div class="col-2 category" data-id="30">Science: Gadgets</div>\n            <div class="col-2 category" data-id="31">Entertainment: Japanese Anime & Manga</div>\n            <div class="col-2 category" data-id="32">Entertainment: Cartoon & Animations</div>\n        </div>\n        <div class="row justify-content-end">\n            <button class="btn col col-sm-2 btn-primary btn-lg category-next m-4">Next!</button>\n        </div>\n        <div class="row">\n            <div class="col attribution">\n                <a href="https://opentdb.com">Powered by the Open Trivia Database</a>\n            </div>\n        </div>\n    </div>\n</div>';const n=document.querySelectorAll(".category");let o=0;for(let t of n)e.forEach((e=>{e===t.dataset.id&&(t.classList.toggle("selected"),o++)}));e&&t?r(o,t):r(0,"")},s=(e,c,a)=>{c--,document.querySelector(".progress").textContent=`Question ${c}/${e.length}`,document.querySelector(".question").innerHTML=e[c-1].question;const l=document.querySelector(".result");l.classList.remove("right"),l.classList.add("wrong"),l.textContent="Incorrect!";const i=document.querySelector(".top"),r=document.querySelector(".bottom");if(i.replaceChildren(),r.replaceChildren(),"multiple"===e[c-1].type)e[c-1].incorrect_answers.forEach(((e,t)=>{const s=document.createElement("div");s.classList.toggle("col"),s.innerHTML=e.name,s.dataset.index=t,t<2?i.appendChild(s):r.appendChild(s),e.selected&&!e.correct?s.classList.add("incorrect"):e.correct&&s.classList.add("selected"),e.selected&&e.correct&&(l.classList.toggle("right"),l.textContent="Correct!")}));else{const t=document.createElement("div");t.classList.toggle("col"),t.textContent="True";const s=document.createElement("div");s.classList.toggle("col"),s.textContent="False",i.appendChild(t),r.appendChild(s),e[c-1].booleanChosen===e[c-1].correct_answer?("True"===e[c-1].booleanChosen?t.classList.toggle("selected"):s.classList.toggle("selected"),l.classList.add("right"),l.textContent="Correct!"):("True"===e.booleanChosen?(t.classList.toggle("incorrect"),s.classList.toggle("selected")):(s.classList.toggle("incorrect"),t.classList.toggle("selected")),l.classList.add("wrong"),l.textContent="Incorrect!")}document.querySelector(".submit-row").replaceChildren();const d=document.querySelector(".buttons");d.replaceChildren();const u=document.createElement("button");u.classList.toggle("btn"),u.classList.toggle("col"),u.classList.toggle("col-sm-1"),u.classList.toggle("btn-primary"),u.classList.toggle("m-4"),c-1==0?(u.classList.toggle("start-over"),u.textContent="Start Over!",u.addEventListener("mousedown",(()=>{t([],"")}))):(u.classList.toggle("back"),u.textContent="Back!",u.addEventListener("mousedown",(()=>{s(e,c,a)}))),d.appendChild(u);const m=document.createElement("button");if(m.classList.toggle("btn"),m.classList.toggle("col"),m.classList.toggle("col-sm-1"),m.classList.toggle("btn-primary"),m.classList.toggle("m-4"),m.classList.toggle("next"),m.textContent="Next!",c===e.length)m.textContent="Results!",m.addEventListener("mousedown",(()=>{n(e,a,c)}));else if(4===e[c].incorrect_answers.length){let t=!1;for(let s=0;s<4;s++)e[c].incorrect_answers[s].selected&&(t=!0);!1===t?m.addEventListener("mousedown",(()=>{o(e,c,a)})):m.addEventListener("mousedown",(()=>{s(e,c+=2,a)}))}else e[c].booleanChosen?m.addEventListener("mousedown",(()=>{s(e,c+=2,a)})):m.addEventListener("mousedown",(()=>{o(e,c,a)}));d.appendChild(m)},n=(e,n,o)=>{const c=document.querySelector(".container");c.replaceChildren(),c.innerHTML='<div class="row justify-content-end">\n    <div class="col-2 progress">\n        End of quiz\n    </div>\n</div>\n<div class="row">\n    <div class="col opening my-5">\n        <div class="row justify-content-center">\n            <div class="col-6 adulation">\n                \n            </div>\n        </div>\n        <div class="row">\n            <div class="col evaluation">\n            \n            </div>\n        </div>\n        <div class="row">\n            <div class="col giphy">\n                <img src="" alt="">\n            </div>\n        </div>\n        <div class="row buttons">\n            <button class="btn col col-sm-1 btn-primary review m-4">Review!</button>\n            <button class="btn col col-sm-1 btn-primary new m-4">New Quiz!</button>\n        </div>\n        <div class="row">\n            <div class="col attribution">\n                <a href="https://opentdb.com">Powered by the Open Trivia Database</a>\n                <a href="https://giphy.com">Powered by GIPHY</a>\n            </div>\n        </div>\n    </div>\n</div>';let a=(n/e.length).toFixed(2),l="";"1.00"===a?l="100":"0.00"===a?l="0":(a=a.slice(2,4),"0"===a[0]&&(a=a.slice(1)),l=a);const i=document.querySelector(".adulation");let r=0;"100"===l?(i.classList.add("excellent"),i.textContent="Perfect!"):l<100&&l>79?(i.classList.add("excellent"),r=Math.floor(3*Math.random()),i.textContent=0===r?"Congratulations!":1===r?"Amazing!":"Great!"):l<=79&&l>59?(i.classList.add("good"),r=Math.floor(3*Math.random()),i.textContent=0===r?"Good job!":1===r?"Good!":"Alright!"):l<=59&&l>44?(i.classList.add("mediocre"),r=Math.floor(3*Math.random()),i.textContent=0===r?"Nice try!":1===r?"Better luck next time!":"Good effort!"):(i.classList.add("awful"),r=Math.floor(4*Math.random()),i.textContent=0===r?"Failure":1===r?"Awful":2===r?"Disgraceful":"Dumbass"),document.querySelector(".evaluation").textContent=`You scored: ${n} out of ${e.length} - ${l}% correct`;const d=document.querySelector("img");(async()=>{try{const e=await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=h2c3vzphvIByUtBEb1rnOHMANHfHBmnj&s=${i.textContent}`,{mode:"cors"}),t=await e.json();d.src=t.data.images.fixed_height.url}catch(e){alert(e)}})(),document.querySelector(".new").addEventListener("mousedown",(()=>{t([],"")})),document.querySelector(".review").addEventListener("mousedown",(()=>{c.replaceChildren(),c.innerHTML='<div class="row justify-content-end">\n    <div class="col-2 progress">\n\n    </div>\n    </div>\n    <div class="row">\n    <div class="col opening my-5">\n        <div class="row">\n            <div class="col result">\n                \n            </div>\n        </div>\n        <div class="question">\n            \n        </div>\n        <div class="row top answers">\n    \n        </div>\n        <div class="row bottom answers">\n        \n        </div>\n        <div class="row submit-row">\n            <button class="btn col col-sm-1 btn-primary m-4 submit">Submit!</button>\n        </div>\n        <div class="row buttons">\n            <button class="btn col col-sm-1 btn-primary start-over back m-4">Start Over!</button>\n        </div>\n    </div>\n    </div>',o++,s(e,o,n)}))},o=(e,t,c)=>{t++,document.querySelector(".progress").textContent=`Question ${t}/${e.length}`,document.querySelector(".question").innerHTML=e[t-1].question;const l=document.querySelector(".result");l.classList.remove("right"),l.classList.remove("wrong"),l.textContent="";const i=document.querySelector(".top");i.replaceChildren();const r=document.querySelector(".bottom");if(r.replaceChildren(),"multiple"===e[t-1].type&&3===e[t-1].incorrect_answers.length){e[t-1].incorrect_answers=e[t-1].incorrect_answers.map((e=>({name:e})));const s=e[t-1].incorrect_answers;s.push({name:e[t-1].correct_answer,correct:!0}),a(s),s.forEach(((e,t)=>{const s=document.createElement("div");s.classList.toggle("col"),s.innerHTML=e.name,s.dataset.index=t,t<2?i.appendChild(s):r.appendChild(s)}))}else if("multiple"===e[t-1].type&&4===e[t-1].incorrect_answers.length)e[t-1].incorrect_answers.forEach(((e,t)=>{const s=document.createElement("div");s.classList.toggle("col"),s.innerHTML=e.name,s.dataset.index=t,t<2?i.appendChild(s):r.appendChild(s)}));else{const e=document.createElement("div");e.classList.toggle("col"),e.textContent="True";const t=document.createElement("div");t.classList.toggle("col"),t.textContent="False",i.appendChild(e),r.appendChild(t)}const d=document.querySelectorAll(".answers>.col");let u="";const m=e=>{for(let t of d)t.classList.remove("selected"),e.target.classList.add("selected"),u=e.target};i.addEventListener("mousedown",m),r.addEventListener("mousedown",m);const v=document.querySelector(".submit-row"),g=document.createElement("button");g.classList.toggle("btn"),g.classList.toggle("col"),g.classList.toggle("col-sm-1"),g.classList.toggle("btn-primary"),g.classList.toggle("submit"),g.classList.toggle("m-4"),g.textContent="Submit!",v.appendChild(g),g.addEventListener("mousedown",(()=>{if(u){if("multiple"===e[t-1].type){if(e[t-1].incorrect_answers[u.dataset.index].correct)l.classList.add("right"),l.textContent="Correct!",c++;else{l.classList.add("wrong"),l.textContent="Incorrect!",u.classList.remove("selected"),u.classList.add("incorrect");for(let s of d)e[t-1].incorrect_answers[s.dataset.index].correct&&s.classList.add("selected")}e[t-1].incorrect_answers[u.dataset.index].selected=!0}else{if(u.textContent===e[t-1].correct_answer)l.classList.add("right"),l.textContent="Correct!",c++;else{l.classList.add("wrong"),l.textContent="Incorrect!",u.classList.remove("selected"),u.classList.add("incorrect");for(let s of d)s.textContent===e[t-1].correct_answer&&s.classList.add("selected")}e[t-1].booleanChosen=u.textContent}if(v.replaceChildren(),i.removeEventListener("mousedown",m),r.removeEventListener("mousedown",m),t===e.length){const s=document.createElement("button");s.classList.toggle("btn"),s.classList.toggle("col"),s.classList.toggle("col-sm-1"),s.classList.toggle("btn-primary"),s.classList.toggle("next"),s.classList.toggle("m-4"),s.textContent="Finish!",p.appendChild(s),s.addEventListener("mousedown",(()=>{n(e,c,t)}))}else{const s=document.createElement("button");s.classList.toggle("btn"),s.classList.toggle("col"),s.classList.toggle("col-sm-1"),s.classList.toggle("btn-primary"),s.classList.toggle("next"),s.classList.toggle("m-4"),s.textContent="Next!",p.appendChild(s),s.addEventListener("mousedown",(()=>{o(e,t,c)}))}}else alert("Please choose an answer.")}));const p=document.querySelector(".buttons");p.replaceChildren();const y=document.createElement("button");y.classList.toggle("btn"),y.classList.toggle("col"),y.classList.toggle("col-sm-1"),y.classList.toggle("btn-primary"),y.classList.toggle("back"),y.classList.toggle("m-4"),y.textContent="Back!",p.appendChild(y),y.addEventListener("mousedown",(()=>{i.removeEventListener("mousedown",m),r.removeEventListener("mousedown",m),s(e,t,c)}))},c=e=>{if(console.log(e),Array.isArray(e)&&e[0].response_code)console.log("response code 1 is the reason");else{let s=!1,c=[];Array.isArray(e)?e.forEach((e=>{e.results.forEach((e=>{c.push(e)}))})):(e.results.forEach((e=>{c.push(e)})),s=!0),s||a(c),(e=>{const s=document.querySelector(".container");s.replaceChildren(),s.innerHTML='<div class="row justify-content-end">\n<div class="col-2 progress">\n     \n</div>\n</div>\n<div class="row">\n<div class="col opening my-5">\n    <div class="row">\n        <div class="col result">\n            \n        </div>\n    </div>\n    <div class="question">\n        \n    </div>\n    <div class="row top answers">\n\n    </div>\n    <div class="row bottom answers">\n    \n    </div>\n    <div class="row submit-row">\n        <button class="btn col col-sm-1 btn-primary m-4 submit">Submit!</button>\n    </div>\n    <div class="row buttons">\n        <button class="btn col col-sm-1 btn-primary start-over back m-4">Start Over!</button>\n    </div>\n</div>\n</div>',document.querySelector(".progress").textContent=`Question 1/${e.length}`,document.querySelector(".question").innerHTML=e[0].question;const c=document.querySelector(".top"),l=document.querySelector(".bottom");if("multiple"===e[0].type){e[0].incorrect_answers=e[0].incorrect_answers.map((e=>({name:e})));const t=e[0].incorrect_answers;t.push({name:e[0].correct_answer,correct:!0}),a(t),t.forEach(((e,t)=>{const s=document.createElement("div");s.classList.toggle("col"),s.innerHTML=e.name,s.dataset.index=t,t<2?c.appendChild(s):l.appendChild(s)}))}else{const e=document.createElement("div");e.classList.toggle("col"),e.textContent="True";const t=document.createElement("div");t.classList.toggle("col"),t.textContent="False",c.appendChild(e),l.appendChild(t)}const i=document.querySelectorAll(".answers>.col");let r="";const d=e=>{for(let t of i)t.classList.remove("selected"),e.target.classList.add("selected"),r=e.target};c.addEventListener("mousedown",d),l.addEventListener("mousedown",d);let u=0;const m=document.querySelector(".submit"),v=()=>{const t=document.querySelector(".result");if(!r)return void alert("Please choose an answer.");if("multiple"===e[0].type){if(e[0].incorrect_answers[r.dataset.index].correct)t.classList.add("right"),t.textContent="Correct!",u++;else{t.classList.add("wrong"),t.textContent="Incorrect!",r.classList.remove("selected"),r.classList.add("incorrect");for(let t of i)e[0].incorrect_answers[t.dataset.index].correct&&t.classList.add("selected")}e[0].incorrect_answers[r.dataset.index].selected=!0}else{if(r.textContent===e[0].correct_answer)t.classList.add("right"),t.textContent="Correct!",u++;else{t.classList.add("wrong"),t.textContent="Incorrect!",r.classList.remove("selected"),r.classList.add("incorrect");for(let t of i)t.textContent===e[0].correct_answer&&t.classList.add("selected")}e[0].booleanChosen=r.textContent}m.removeEventListener("mousedown",v),document.querySelector(".submit-row").replaceChildren(),c.removeEventListener("mousedown",d),l.removeEventListener("mousedown",d);const s=document.querySelector(".buttons");if(1===e.length){const t=document.createElement("button");t.classList.toggle("btn"),t.classList.toggle("col"),t.classList.toggle("col-sm-1"),t.classList.toggle("btn-primary"),t.classList.toggle("next"),t.classList.toggle("m-4"),t.textContent="Finish!",s.appendChild(t),t.addEventListener("mousedown",(()=>{n(e,u)}))}else{const t=document.createElement("button");t.classList.toggle("btn"),t.classList.toggle("col"),t.classList.toggle("col-sm-1"),t.classList.toggle("btn-primary"),t.classList.toggle("next"),t.classList.toggle("m-4"),t.textContent="Next!",s.appendChild(t),t.addEventListener("mousedown",(()=>{o(e,1,u)}))}};m.addEventListener("mousedown",v),document.querySelector(".start-over").addEventListener("mousedown",(()=>{t([],"")}))})(c)}},a=e=>{for(let t=e.length-1;t>0;t--){let s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}};let l=0,i="";const r=(e,s)=>{const n=document.querySelectorAll(".category");if(null!=e&&(l=e),s)for(let e of n)e.dataset.id===s.dataset.id&&(i=e);let o=[];for(let e of n)e.addEventListener("mousedown",(e=>{4!==l||e.target.classList.contains("selected")?e.target.classList.contains("selected")?e.target.classList.contains("selected")&&(e.target.classList.toggle("selected"),l--):(e.target.classList.toggle("selected"),l++,i=e.target):(i.classList.remove("selected"),e.target.classList.toggle("selected"),i=e.target)}));document.querySelector(".category-next").addEventListener("mousedown",(e=>{for(let e of n)e.classList.contains("selected")&&o.push(e.dataset.id);const s=document.querySelector(".container");s.replaceChildren(),s.innerHTML='<div class="row">\n   <div class="col opening my-5">\n       <div class="row welcome">\n           <div class="col welcome-text">\n               Open Trivia Quiz\n           </div>\n       </div>\n       <div class="row underline">\n           <div class="col p-4 instructions">\n               Select your quiz settings.\n           </div>\n       </div>\n       <div class="row">\n           <div class="col-4">\n               <label for="question-amount">How many questions? Minimum: 1; Maximum: 50</label>\n           </div>\n           <div class="col-2">\n               <input type="number" name="questionAmount" id="question-amount" min="1" max="50" value="10" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">\n           </div>\n       </div>\n       <div class="row difficulty">\n           <div class="col-4">Difficulty of questions:</div>\n           <div class="col-2 selected" data-difficulty="any">Any</div>\n           <div class="col-2" data-difficulty="easy">Easy</div>\n           <div class="col-2" data-difficulty="medium">Medium</div>\n           <div class="col-2" data-difficulty="hard">Hard</div>\n       </div>\n       <div class="row type">\n           <div class="col-4">Types of questions:</div>\n           <div class="col-3 question-type selected" data-type="any">Any</div>\n           <div class="col-3 question-type" data-type="multiple">Multiple Choice</div>\n           <div class="col-2 question-type" data-type="boolean">True/False</div>\n       </div>\n       <div class="row buttons">\n           <button class="btn col col-sm-1 btn-primary settings-back m-4">Back!</button>\n           <button class="btn col col-sm-1 btn-primary start m-4">Start!</button>\n       </div>\n       <div class="row">\n           <div class="col attribution">\n               <a href="https://opentdb.com">Powered by the Open Trivia Database</a>\n           </div>\n       </div>\n   </div>\n</div> ',((e,s)=>{const n=document.querySelector("#question-amount"),o=document.querySelector(".difficulty");let a="";o.addEventListener("mousedown",(e=>{if(e.target.classList.contains("col-4")||e.target.classList.contains("selected"))return;const t=document.querySelectorAll(".difficulty>.col-2");for(let e of t)e.classList.remove("selected");e.target.classList.toggle("selected"),a=e.target.dataset.difficulty}));let l="";document.querySelector(".type").addEventListener("mousedown",(e=>{if(e.target.classList.contains("col-4")||e.target.classList.contains("selected"))return;const t=document.querySelectorAll(".question-type");for(let e of t)e.classList.remove("selected");e.target.classList.toggle("selected"),l=e.target.dataset.type})),document.querySelector(".settings-back").addEventListener("mousedown",(n=>{t(e,s)})),document.querySelector(".start").addEventListener("mousedown",(t=>{n.value>50?alert("The quiz cannot be more than 50 questions!"):n.value<1?alert("The quiz cannot be 0 or less than 0!"):((e,t,s,n)=>{const o=Math.floor(t/e.length),a=t-o*e.length;let l="",i="";if("easy"===s?l="&difficulty=easy":"medium"===s?l="&difficulty=medium":"hard"===s&&(l="&difficulty=hard"),"multiple"===n?i="&type=multiple":"boolean"===n&&(i="&type=boolean"),e.length>0){const t=e.map((async(t,s)=>{let n="";if(s===e.length-1){const e=await fetch(`https://opentdb.com/api.php?amount=${o+a}&category=${t}${l}${i}`);n=await e.json()}else{const e=await fetch(`https://opentdb.com/api.php?amount=${o}&category=${t}${l}${i}`);n=await e.json()}if(1===n.response_code){const e=async()=>{const e=await fetch("https://opentdb.com/api_category.php"),s=await e.json();let n="";s.trivia_categories.forEach((e=>{e.id===Number(t)&&(n=e.name)})),alert(`The category ${n} does not have enough of the specified questions for this query.`)};e()}return n}));Promise.all(t).then((e=>c(e)))}else(async()=>{const e=await fetch(`https://opentdb.com/api.php?amount=${t}${l}${i}`),s=await e.json();c(s)})()})(e,n.value,a,l)}))})(o,i)}))};r()})();