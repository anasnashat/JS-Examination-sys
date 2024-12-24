import ExamController from './examController.js';

const examPage = document.querySelector("#examPage");
const nextButton = document.querySelector("#nextButton");
const startSection = document.querySelector("#startExam");

let exam = new ExamController(examPage, nextButton);

startSection.querySelector("button").addEventListener('click', () => {

    Swal.fire({
        title: "Hi, What is your name?",
        input: "text",
        inputPlaceholder: "Enter your name",
        confirmButtonText: "Start The Exam",
        backdrop: true,
        allowOutsideClick: false,
        customClass: {
            popup: "swal-modal",
            title: "swal-title",
            htmlContainer: "swal-text",
            input: "swal-input",
            confirmButton: "swal-button",
            cancelButton: "swal-button",
        },
    }).then((result) => {
        if (result.value.trim() !== "") {
            document.querySelector("#stName").innerHTML += result.value;
            startSection.classList.add("d-none");
            examPage.classList.remove("d-none");
            exam.displayQuestion();
        } else  {
            Swal.fire({
                title: "Error!",
                text: "you Should to Enter yor name to start the exam ?  ",
                icon: "error",
                customClass: {
                    popup: "swal-modal",
                    title: "swal-title",
                    htmlContainer: "swal-text",
                    input: "swal-input",
                    confirmButton: "swal-button",
                    cancelButton: "swal-button",
                },

            });
        }
    });

})


examPage.addEventListener("click", (event) => {
    exam.choiceAnswer(event);
});


nextButton.addEventListener("click", (event) => {
    console.log(event.target);
    exam.getNextQuestion();
})



