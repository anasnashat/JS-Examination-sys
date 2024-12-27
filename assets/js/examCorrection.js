export class ExamCorrection {
    #grade = 0

    constructor(questions, answers) {
        this.questions = questions;
        this.answers = answers;
        this.bar = null;
    }

    get grade() {
        return this.#grade;
    }

    #correctQuestion(question, answer) {
        return question.correctAnswer === answer;
    }

    correctExam() {
        console.log(this.questions);
        for (let i = 0; i < this.questions.length; i++) {
            if (this.#correctQuestion(this.questions[i], this.answers[i])) {
                this.#grade++;
            }
        }
        this.examResultChart("#resultChart")
    }

    examResultChart(resultId) {
        const examResult = document.querySelector("#examResult");

        examResult.classList.remove("d-none");
        examResult.classList.add('animate__animated', 'animate__fadeInUp');
        this.bar = new ProgressBar.SemiCircle(resultId, {
            strokeWidth: 10,
            trailColor: '#eee',
            trailWidth: 5,
            easing: 'easeInOut',
            duration: 2000,
            from: {color: '#FF0000'},
            to: {color: '#00FF00'},
            text: {
                value: '',
                alignToBottom: false,
            },
            step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                bar.setText(`You solved ${this.#grade} out of ${this.questions.length} questions`);
                bar.text.style.color = state.color;
                bar.text.style.fontSize = '1.5rem';
                bar.text.style.fontWeight = 'bold';
                bar.text.style.transition = 'color 0.5s ease';
            },
        });
        setTimeout(() => {
            this.bar.animate(this.#grade / this.questions.length);
        }, 1000);
    }


}

