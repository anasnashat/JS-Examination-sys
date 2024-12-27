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
        },
        showClass: {
            popup: 'animate__animated animate__zoomIn',
            backdrop: 'swal2-backdrop-show',
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOutDown',
            backdrop: 'swal2-backdrop-hide animate__animated animate__fadeOut animate__fadeOutUp'
        },
    }).then((result) => {
        if (result.value.trim() !== "") {
            startSection.classList.add('animate__animated', 'animate__fadeOut');

            startSection.addEventListener('animationend', () => {
                startSection.classList.add("d-none");
                startSection.classList.remove('animate__animated', 'animate__fadeOut');

                document.querySelector("#stName").innerHTML += result.value;
                document.querySelector("#stName").classList.add('animate__animated', 'animate__fadeIn');

                examPage.classList.remove("d-none");

                examPage.classList.add('animate__animated', 'animate__fadeIn', 'animate__zoomIn');
                exam.displayQuestion();


            }, {once: true});

        } else {
            Swal.fire({
                title: "Error!",
                text: "You should enter your name to start the exam!",
                icon: "warning",
                customClass: {
                    popup: "swal-modal animate__animated animate__shakeX",
                    title: "swal-title animate__animated animate__fadeIn animate__delay-1s",
                    htmlContainer: "swal-text animate__animated animate__fadeIn animate__delay-1s",
                    icon: 'animate__animated animate__heartBeat animate__infinite',
                    confirmButton: "swal-button animate__animated animate__bounceIn animate__delay-1s",
                },
                showClass: {
                    popup: 'animate__animated animate__zoomIn',
                    backdrop: 'swal2-backdrop-show animate__animated animate__fadeIn animate__fadeInDown',
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomOutDown',
                    backdrop: 'swal2-backdrop-hide animate__animated animate__fadeOut animate__fadeOutUp'
                },
                iconColor: "white",
                allowOutsideClick: false,
            });
        }
    });
});

examPage.addEventListener("click", (event) => {
    exam.choiceAnswer(event);
});


nextButton.addEventListener("click", (event) => {
    console.log(event.target);
    exam.getNextQuestion();
})



