const questionContainer = document.querySelector('.question_list');
const wrongAnswersContainer = document.querySelector('.wrong_answers');
const pass_failParagraph = document.querySelector('.pass_fail');
const result_section = document.getElementById("result") 
const correctAnswers = ['B', 'D', 'A', 'A', 'C', 'A', 'B', 'A', 'C', 'D', 
    'B', 'C', 'D', 'A', 'D', 'C', 'C', 'B', 'D', 'A'
]




let wrongAnswers = [];
let stundentAnswers = [];
let numOfCorrectAnswers = 0;
let numOfWrongAnswers = 0;
let inputLabel = 1;
let options = ['A', 'B', 'C', 'D']
 
for( let i = 0; i < correctAnswers.length; i++){
    let listItem = document.createElement('li');
    listItem.className = 'inputs-list'
    listItem.id = `listItem_${i}`
    let inputsContainer = document.createElement('div');
    inputsContainer.className = 'input_containers__container'
    options.map( (option) => {
        let inputId = inputLabel++;
        let divElement  = document.createElement('div');
        divElement.className = 'input-container';
      
        divElement.innerHTML = `
            <label for= radio_btn_${inputId} class="option_label">${option}</label>
            <input type="radio" class="option_btn" value= ${option} name= "question_${i}" id= radio_btn_${inputId}>
        `
        inputsContainer.appendChild(divElement);
        const optionBtn = inputsContainer.querySelector(`#radio_btn_${inputId}`) 
        optionBtn.addEventListener("change", () => {
            if(stundentAnswers.length === 0){
                stundentAnswers.push({
                    id: i ,
                    chosenOption: option
                }) 
            }
                
            if(stundentAnswers[i]){
                let choosenOption = stundentAnswers[i].chosenOption
                if(option !== choosenOption) stundentAnswers[i].chosenOption = option;    
            }
            else{
                stundentAnswers.push({
                    id: i ,
                    chosenOption: option
                })
            }
            console.log(stundentAnswers);  
        })
        
    })

    listItem.appendChild(inputsContainer);
    questionContainer.appendChild(listItem);
    
}




function scrollToElement(element){
    if(element){
        element.style.display = 'block'
        element.scrollIntoView({
            behavior: 'smooth',
            inline: "center",
            block: "nearest"
        })
    }
    
}


function getWrongAnswers(){
    wrongAnswersContainer.innerHTML = "";
    let sortedWrongAnswers = wrongAnswers.sort((a, b) => a.question - b.question);
    sortedWrongAnswers.map( w => {
        let wrongAnswer = document.createElement('p');
        wrongAnswer.className = 'wrong_answer';
        wrongAnswer.innerText = 
            `${w.question}. You chose ${w.wrongAnswer}, The correct answer is ${w.correctAnswer}`
        wrongAnswersContainer.appendChild(wrongAnswer);
        
    })
        
    
}


function getScore(){

    if(stundentAnswers.length < 20){
        alert('All questions must be answered');
        return;
    }

    for(let i = 0; i < stundentAnswers.length; i++){
        let currentAnswer  = stundentAnswers[i];
        if(stundentAnswers[i].chosenOption === correctAnswers[currentAnswer.id]) numOfCorrectAnswers ++
        else{
            
                wrongAnswers.push({
                    question: currentAnswer.id + 1,
                    wrongAnswer: stundentAnswers[i].chosenOption.toString(),
                    correctAnswer: correctAnswers[currentAnswer.id]
                });
        }     
            
    }

    

    let resultContainer = document.getElementById('resultSection') ;
    scrollToElement(resultContainer);
    result_section.innerText = ` Stundent's score: ${numOfCorrectAnswers} out of  ${correctAnswers.length}`
    pass_failParagraph.innerText = numOfCorrectAnswers >= 15 ? `You Pass` : `You Fail`;
    pass_failParagraph.className = numOfCorrectAnswers >= 15 ? `pass_fail pass` : `pass_fail fail`;

    if(wrongAnswers.length === 0){
        document.getElementById("wrong_answersHeader").style.display  = "none";
    }

    getWrongAnswers();
   

    console.log(stundentAnswers);
    console.log(wrongAnswers);
    console.log( "num of wrong asnwers: " + wrongAnswers.length);
    let examForm = document.getElementById('exam_form') ;
    examForm.reset();
    reset();
    
}

function reset(){
    wrongAnswers = [];
    stundentAnswers = [];
    numOfCorrectAnswers = 0;
    numOfWrongAnswers = 0;
}

console.log(document.getElementById("wrong_answersHeader"));

    



