const questionContainer = document.querySelector('.question_list') as HTMLOListElement;
const wrongAnswersContainer = document.querySelector('.wrong_answers') as HTMLDivElement;
const pass_failParagraph = document.querySelector('.pass_fail') as HTMLParagraphElement;
const result_section = document.getElementById("result") as HTMLParagraphElement;
const correctAnswers = ['B', 'D', 'A', 'A', 'C', 'A', 'B', 'A', 'C', 'D', 
    'B', 'C', 'D', 'A', 'D', 'C', 'C', 'B', 'D', 'A'
]

type WrongAnswer = {
    question: number,
    wrongAnswer: string,
    correctAnswer: string
}

interface AnsweredQuestion{
    id: number,
    chosenOption: string
 }
const wrongAnswers: WrongAnswer[] = [];
let stundentAnswers: AnsweredQuestion[] = [];
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
        const optionBtn = inputsContainer.querySelector(`#radio_btn_${inputId}`) as HTMLInputElement
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
        })
        
    })

    listItem.appendChild(inputsContainer);
    questionContainer.appendChild(listItem);
    
}




function scrollToElement(element: HTMLElement){
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
    let sortedWrongAnswers = wrongAnswers.sort((a, b) => a.question - b.question);
    
    sortedWrongAnswers.map( w => {
        let wrongAnswer = document.createElement('p');
        wrongAnswer.className = 'wrong_answer';
        wrongAnswer.innerText = 
            `${w.question}. You chose ${w.wrongAnswer}, The correct answer is ${w.correctAnswer}`
        wrongAnswersContainer.appendChild(wrongAnswer);
        
    })
        
    console.log("sorted wrong answers:");
    console.log(sortedWrongAnswers);
}


function getScore(){

    

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

    if(wrongAnswers.length === 0){
        let unAnsweredQuestions = correctAnswers.length - stundentAnswers.length;
        if(unAnsweredQuestions > 0){
            wrongAnswersContainer.innerHTML = `
                <p class = 'wrong_answer'>
                    No wrong answers, ${unAnsweredQuestions} question(s) are not answered
                </p>
            `
        }

        else wrongAnswersContainer.innerHTML = `<p class = 'wrong_answer'>All answers are correct</p>`
    }

    let resultContainer = document.getElementById('resultSection') as HTMLDivElement;
    scrollToElement(resultContainer);
    result_section!.innerText = ` Stundent's score: ${numOfCorrectAnswers} out of  ${correctAnswers.length}`
    pass_failParagraph.innerText = numOfCorrectAnswers >= 15 ? `You Pass` : `You Fail`;
    pass_failParagraph.className = numOfCorrectAnswers >= 15 ? `pass_fail pass` : `pass_fail fail`;
    getWrongAnswers();

    console.log(stundentAnswers);
    console.log(wrongAnswers);
    console.log( "num of wrong asnwers: " + wrongAnswers.length);
    let examForm = document.getElementById('exam_form') as HTMLFormElement;
    examForm.reset();
}




    



