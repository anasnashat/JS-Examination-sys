import getQuestions from "./questionsData.js";

export class ExamGenerate {

    constructor(questions = getQuestions) {
        this.questionsArray = questions;
    }

    examGenerator(numberOfQuestions = 10) {
        if (this.questionsArray.length < numberOfQuestions) {
            throw new Error(`no enough questions to make the exam with ${numberOfQuestions} questions you can make exam with ${numberOfQuestions} questions.`);
        }

        let questions = [];
        let index;
        do {
            index = Math.floor(Math.random() * this.questionsArray.length);
            this.questionsArray[index].choices = this.#randomizeChoices(this.questionsArray[index].choices);
            questions.push(this.questionsArray[index]);
            this.questionsArray.splice(index, 1);

        } while (questions.length < numberOfQuestions);
        return questions;
    }

    #randomizeChoices(choices) {
        let choiceIndex;
        let choicesSet = [];
        do {
            choiceIndex = Math.floor(Math.random() * choices.length);
            choicesSet.push(choices[choiceIndex]);
            choices.splice(choiceIndex, 1);
        } while (choices.length !== 0);
        return choicesSet;
    }
}


// let exam = new ExamGenerate();
// console.log(exam.examGenerator());
