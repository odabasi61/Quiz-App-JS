// required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");

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
};
