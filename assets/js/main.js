import ExamController from './ExamController.js';

const examPage = document.querySelector("#examPage");
const nextButton = document.querySelector("#nextButton");
const startSection = document.querySelector("#startExam");

let exam = new ExamController(examPage, nextButton);

startSection.querySelector("button").addEventListener('click', () => {
    swal(
        {
            title: "Hi, What is your name?",
            content: "input",
        })
        .then((value) => {
                if (value.trim() !== "") {
                    document.querySelector("#stName").innerHTML += value;
                    startSection.classList.add("d-none");
                    examPage.classList.remove("d-none");
                    exam.displayQuestion();

                }
            }
        );
})


examPage.addEventListener("click", (event) => {
    exam.choiceAnswer(event);
});


nextButton.addEventListener("click", (event) => {
    console.log(event.target);
    exam.getNextQuestion();
})



