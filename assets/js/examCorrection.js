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
        document.querySelector("#examResult").classList.remove("d-none");

        this.bar = new ProgressBar.SemiCircle(resultId, {
            strokeWidth: 10,
            trailColor: '#eee',
            trailWidth: 5,
            easing: 'easeInOut',
            duration: 1400,
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
            },
        });

        this.bar.animate(this.#grade / this.questions.length);


    }


}

