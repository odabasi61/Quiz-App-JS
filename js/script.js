// required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");

const optionList = document.querySelector('.option_list');

let questionCount = 0;
let questionNumber = 1;

// start button click
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo"); // shows the info box
};

// exit button click
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // hides the info box
};

// continue button click
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // hides the info box
  quizBox.classList.add("activeQuiz"); // begin the quiz
  showQuestions(0);
  questionCounter(1);
};

// next button
const nextBtn = quizBox.querySelector('.next_btn');
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;
    showQuestions(questionCount);
    questionCounter(questionNumber);
  }
  else {
    console.log('questions completed');
  }
}

// getting questions and answers from the array
function showQuestions(index) {
  const questionText = document.querySelector('.que_text');
  let questionTag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
  let optionTag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>' + '<div class="option">'+ questions[index].options[1] +'<span></span></div>' + '<div class="option">'+ questions[index].options[2] +'<span></span></div>' + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
  questionText.innerHTML = questionTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
    
  }
}

// option selecting
function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  if (userAnswer == correctAnswer) {
    answer.classList.add('correct');
  }
  else {
    answer.classList.add('incorrect');
  }

  // once user made a choice, disable other options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');    

    // if answer is incorrect, automatically show the correct answer
    
  }
}

// count the questions
function questionCounter(index) {
const bottomQuestionCounter = quizBox.querySelector('.total_que');
let totalQuestionTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
bottomQuestionCounter.innerHTML = totalQuestionTag;
}