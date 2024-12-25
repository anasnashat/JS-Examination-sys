import {ExamGenerate} from './examGenerate.js';
import {ExamCorrection} from "./examCorrection.js";

class ExamController extends ExamGenerate {
    #answers
    #questionNumber
    #intervalId

    constructor(examPage, nextButton) {
        super();
        this.generateExam = this.examGenerator();
        this.#answers = [];
        this.#questionNumber = 0;
        this.examPage = examPage;
        this.nextButton = nextButton;
        this.timer = 0.0;
        this.duration = 60000;
        this.interval = 100;
        this.bar = null
        this.timerFlage = false;
    }

    displayQuestion() {
        if (!this.#intervalId) {
            this.#intervalId = this.startTimer()
        }
        // console.log(this.generateExam)
        this.question = this.generateExam[this.#questionNumber];
        this.questionTitle = document.querySelector('#questionTitle');
        this.questionImage = document.querySelector('#questionImage');
        this.answersContainer = document.querySelector('#answersContainer');
        // this.#intervalId = this.startTimer();
        this.questionTitle.innerHTML = this.question.question;
        this.questionImage.src = this.question.image;
        this.questionImage.alt = this.question.question;
        this.questionImage.style.width = "450px";
        this.questionImage.style.height = "130px";

        this.answersContainer.innerHTML = '';

        this.question.choices.forEach((choice, index) => {
            // answersContainer.innerHTML += `<!--<input type="button" id="choice${index++}" name="choices" value="${choice}" class="w-100 p-3 mb-3">-->`
            this.choiceInput = document.createElement('input');
            this.choiceInput.type = 'button';
            this.choiceInput.id = `choice${index + 1}`;
            this.choiceInput.name = 'choices';
            this.choiceInput.value = choice;
            this.choiceInput.classList.add('w-100', 'pt-1', 'mb-1', 'h4', 'fs-10');
            this.answersContainer.append(this.choiceInput);
        });
        this.nextButton.disabled = true;
    }


    choiceAnswer(event) {
        this.inputsChoices = document.querySelectorAll('input');
        if (event.target.tagName === "INPUT") {
            this.inputsChoices.forEach(input => input.classList.remove("is-disabled"));
            console.log(event.target);
            event.target.classList.add("is-disabled");
            this.nextButton.disabled = false;
        }
    }

    getNextQuestion() {
        const answer = document.querySelector("input.is-disabled");
        if (answer) {
            console.log(answer.value);
            this.#answers.push(answer.value);
        } else {
            console.log("No answer selected");
            this.#answers.push("");
        }

        this.#questionNumber++;

        if (this.#questionNumber >= this.generateExam.length || this.timerFlage === true) {
            let grade = new ExamCorrection(this.generateExam, this.#answers);
            this.stopTimer(this.#intervalId);

            grade.correctExam();
            this.examPage.classList.add("d-none");
            console.log(this.#answers);
            return;
        }

        console.log(this.#answers)
        this.displayQuestion();
        this.rIndex = this.#questionNumber;

    }

    startProgress(timerId) {
        return new ProgressBar.Line(timerId, {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: this.interval,
            trailColor: '#f0f0f0',
            trailWidth: 8,
            svgStyle: {
                width: '100%',
                height: '25px',
                borderRadius: '10px',
                padding: '1px'
            },
            text: {
                style: {
                    color: '#000000',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    margin: 0,
                    padding: 0,
                },
                autoStyleContainer: true
            },
            from: {color: '#00FF00'},
            to: {color: '#FF5252'},
            step: (state, bar) => {
                bar.setText(Math.ceil(60 * (1 - this.timer)));
                bar.path.setAttribute('stroke', state.color);
            }
        });
    }
    startTimer() {
            this.timer = 0.0
            this.bar = this.startProgress("#timerBar");

        return setInterval(() => {
            setTimeout(()=>{
                this.timer += this.interval / this.duration;
                if (this.timer > 1.0) {
                    this.timerFlage = true;
                    this.getNextQuestion();
                }
                this.bar.animate(this.timer);
            },1000)
        }, this.interval);
    };

    stopTimer(intervalId) {
        this.bar.destroy();
        clearInterval(intervalId);
    }
}

export default ExamController;