var questionContainer = document.querySelector('.question_list');
var wrongAnswersContainer = document.querySelector('.wrong_answers');
var pass_failParagraph = document.querySelector('.pass_fail');
var result_section = document.getElementById("result");
var correctAnswers = ['B', 'D', 'A', 'A', 'C', 'A', 'B', 'A', 'C', 'D',
    'B', 'C', 'D', 'A', 'D', 'C', 'C', 'B', 'D', 'A'
];
var wrongAnswers = [];
var stundentAnswers = [];
var numOfCorrectAnswers = 0;
var numOfWrongAnswers = 0;
var inputLabel = 1;
var options = ['A', 'B', 'C', 'D'];
var _loop_1 = function (i) {
    var listItem = document.createElement('li');
    listItem.className = 'inputs-list';
    listItem.id = "listItem_".concat(i);
    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'input_containers__container';
    options.map(function (option) {
        var inputId = inputLabel++;
        var divElement = document.createElement('div');
        divElement.className = 'input-container';
        divElement.innerHTML = "\n            <label for= radio_btn_".concat(inputId, " class=\"option_label\">").concat(option, "</label>\n            <input type=\"radio\" class=\"option_btn\" value= ").concat(option, " name= \"question_").concat(i, "\" id= radio_btn_").concat(inputId, ">\n        ");
        inputsContainer.appendChild(divElement);
        var optionBtn = inputsContainer.querySelector("#radio_btn_".concat(inputId));
        optionBtn.addEventListener("change", function () {
            if (stundentAnswers.length === 0) {
                stundentAnswers.push({
                    id: i,
                    chosenOption: option
                });
            }
            if (stundentAnswers[i]) {
                var choosenOption = stundentAnswers[i].chosenOption;
                if (option !== choosenOption)
                    stundentAnswers[i].chosenOption = option;
            }
            else {
                stundentAnswers.push({
                    id: i,
                    chosenOption: option
                });
            }
        });
    });
    listItem.appendChild(inputsContainer);
    questionContainer.appendChild(listItem);
};
for (var i = 0; i < correctAnswers.length; i++) {
    _loop_1(i);
}
function scrollToElement(element) {
    if (element) {
        element.style.display = 'block';
        element.scrollIntoView({
            behavior: 'smooth',
            inline: "center",
            block: "nearest"
        });
    }
}
function getWrongAnswers() {
    var sortedWrongAnswers = wrongAnswers.sort(function (a, b) { return a.question - b.question; });
    sortedWrongAnswers.map(function (w) {
        var wrongAnswer = document.createElement('p');
        wrongAnswer.className = 'wrong_answer';
        wrongAnswer.innerText =
            "".concat(w.question, ". You chose ").concat(w.wrongAnswer, ", The correct answer is ").concat(w.correctAnswer);
        wrongAnswersContainer.appendChild(wrongAnswer);
    });
    console.log("sorted wrong answers:");
    console.log(sortedWrongAnswers);
}
function getScore() {
    for (var i = 0; i < stundentAnswers.length; i++) {
        var currentAnswer = stundentAnswers[i];
        if (stundentAnswers[i].chosenOption === correctAnswers[currentAnswer.id])
            numOfCorrectAnswers++;
        else {
            wrongAnswers.push({
                question: currentAnswer.id + 1,
                wrongAnswer: stundentAnswers[i].chosenOption.toString(),
                correctAnswer: correctAnswers[currentAnswer.id]
            });
        }
    }
    if (wrongAnswers.length === 0) {
        var unAnsweredQuestions = correctAnswers.length - stundentAnswers.length;
        if (unAnsweredQuestions > 0) {
            wrongAnswersContainer.innerHTML = "\n                <p class = 'wrong_answer'>\n                    No wrong answers, ".concat(unAnsweredQuestions, " question(s) are not answered\n                </p>\n            ");
        }
        else
            wrongAnswersContainer.innerHTML = "<p class = 'wrong_answer'>All answers are correct</p>";
    }
    var resultContainer = document.getElementById('resultSection');
    scrollToElement(resultContainer);
    result_section.innerText = " Stundent's score: ".concat(numOfCorrectAnswers, " out of  ").concat(correctAnswers.length);
    pass_failParagraph.innerText = numOfCorrectAnswers >= 15 ? "You Pass" : "You Fail";
    pass_failParagraph.className = numOfCorrectAnswers >= 15 ? "pass_fail pass" : "pass_fail fail";
    getWrongAnswers();
    console.log(stundentAnswers);
    console.log(wrongAnswers);
    console.log("num of wrong asnwers: " + wrongAnswers.length);
    var examForm = document.getElementById('exam_form');
    examForm.reset();
}
