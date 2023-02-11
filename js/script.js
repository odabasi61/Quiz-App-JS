// required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const timeCount = quizBox.querySelector(".timer .timer_sec");
const timeLine = quizBox.querySelector("header .time_line");
const timeOff = quizBox.querySelector("header .time_txt");

const optionList = document.querySelector(".option_list");

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

let questionCount = 0;
let questionNumber = 1;
let timeCounter;
let counterLine;
let timeValue = 15;
let timerLineWidthValue = 0;
let userScore = 0;

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
  startTimer(15);
  startTimerLine(0);
};

// next button
const nextBtn = quizBox.querySelector(".next_btn");
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(timeCounter);
    clearInterval(counterLine);
    startTimerLine(timerLineWidthValue);
    startTimer(timeValue);
    nextBtn.style.display = "none";
    timeOff.textContent = 'Time left';
  } else {
    clearInterval(timeCounter);
    clearInterval(counterLine);
    showResultBox();
  }
};

// result box
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".restart");
const quitQuiz = resultBox.querySelector(".quit");

function showResultBox() {
  infoBox.classList.remove("activeInfo"); // hide the info box
  quizBox.classList.remove("activeQuiz"); // finish the quiz
  resultBox.classList.add("activeResult"); // show result box
  const scoreText = resultBox.querySelector(".score_text");
  if (userScore == 5) {
    let scoreTag =
      "<span>Perfect...You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore == 4) {
    let scoreTag =
      "<span>Nice...You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore == 3) {
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p>. You can do better.</span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore == 2) {
    let scoreTag =
      "<span>Sorry...You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore < 2) {
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span> <br> <span style='color:red;'>You should practise more!</span>";
    scoreText.innerHTML = scoreTag;
  }
}

// getting questions and answers from the array
function showQuestions(index) {
  const questionText = document.querySelector(".que_text");
  let questionTag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  questionText.innerHTML = questionTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// option selecting
function optionSelected(answer) {
  clearInterval(counterLine);
  clearInterval(timeCounter);
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    // if answer is incorrect, automatically show the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  // once user made a choice, disable other options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
}

// count down timer
function startTimer(time) {
  timeCounter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(timeCounter);
      clearInterval(counterLine);
      timeCount.textContent = "00";
      timeOff.textContent = 'Time off';

      let correctAnswer = questions[questionCount].answer;
      let allOptions = optionList.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].setAttribute("class", "option correct");
          optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }
      nextBtn.style.display = "block";
    }
  }
}

// blue line / time line
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 1549) {
      clearInterval(counterLine);
    }
  }
}

// count the questions
function questionCounter(index) {
  const bottomQuestionCounter = quizBox.querySelector(".total_que");
  let totalQuestionTag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  bottomQuestionCounter.innerHTML = totalQuestionTag;
}

// restart quiz
restartQuiz.onclick = () => {
  resultBox.classList.remove('activeResult')
  quizBox.classList.add('activeQuiz')
  let questionCount = 0;
  let questionNumber = 1;
  let timeValue = 15;
  let timerLineWidthValue = 0;
  let userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumber);
  clearInterval(timeCounter);
  clearInterval(counterLine);
  startTimerLine(timerLineWidthValue);
  startTimer(timeValue);
  nextBtn.style.display = "none";
  timeOff.textContent = 'Time left';
};

// quit the quiz
quitQuiz.onclick = () => {
  window.location.reload();
};
