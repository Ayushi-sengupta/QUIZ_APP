const questions = [
{
  question: "Which data structure in Java provides constant-time performance for insertion, deletion, and retrieval of elements? ",
  answers : [
     { text:"ArrayList", correct: false},
     { text:"LinkedList", correct: true},
     { text:"HashSet", correct: false},
     { text:"HashMap", correct: false},
  ]
},
{
  question: "Which of the following is not a valid data type in C? ",
  answers:[
     { text:"float", correct: false},
     { text:" string", correct: true},
     { text:"double", correct: false},
     { text:"char", correct: false},
  ]
},
     {
      question: "Which CSS property is used to change the background color of an element? ",
      answers:[
     { text:"background-color", correct:true},
     { text:" color", correct: false},
     { text:"background", correct: false},
     { text:"bg-color", correct: false},
  ]
},
      {
      question: "A car covers a distance of 400 km in 8 hours. What is the average speed of the car?",
      answers:[
     { text:"40 km/h", correct: false},
     { text:" 50 km/h", correct: false},
     { text:"60 km/h", correct: true},
     { text:"70 km/h", correct: false},
  ]
},
    {
      question: "Which of the following is not a type of logical reasoning? ",
      answers:[
     { text:"Deductive reasoning", correct: false},
     { text:"  Emotional reasoning", correct: true},
     { text:" Inductive reasoning", correct: false},
     { text:"Analogical reasoning", correct: false},
  ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;// reset the current qst index 0
  score = 0; // and score 0 when we'll start the quiz
  nextButton.innerHTML= "Next"; // at the end we change the text to the restart or replay
  showQuestion(); //call another function which displays the qst
}

function showQuestion(){
  resetState(); //reset the previous qsr & ans
  let currentQuestion = questions[currentQuestionIndex]; //qst 0,1,2,3,4
  let questionNo = currentQuestionIndex + 1; //if index 0, qstNo. 1...
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //qst

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button"); //options->button tag
    button.innerHTML = answer.text; //shows texts as answers in buttons
    button.classList.add("btn"); //in the button we have to add a class name, here 'btn'
    answerButtons.appendChild(button); //display the button inside the divbutton
    if(answer.correct){
      button.dataset.correct= answer.correct; //if answer is correct then it will be added in this button.dataset
    }
    button.addEventListener("click", selectAnswer); //when we click answer, it calls the selectAnswer
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){ //if it has child element then in next step we have to remove
    answerButtons.removeChild(answerButtons.firstChild); //remove all the prev ans
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => { //for each button
    if (button.dataset.correct === "true") { //check the dataset, if it is true
      button.classList.add("correct"); //then it will add the class name correct, 
  //suppose if we choose the wrong ans it will check the dataset again & when it is true it will show the correct ans
    }
    button.disabled = true; // after that it will disable the button
  });
  nextButton.style.display = "block"; //after that it will display "next button" to go to the next qst
}

function  showScore(){
  resetState();
  questionElement.innerHTML = `YOU SCORED ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "PLAY AGAIN!!!";
  nextButton.style.display="block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < questions.length) {
    handleNextButton();//108 line
  }else{
    startQuiz();
  }
  
});

startQuiz();