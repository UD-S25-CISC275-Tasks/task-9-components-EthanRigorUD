import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let new_questions: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    new_questions = new_questions.map((question: Question) => ({
        id: question.id,
        name: question.name,
        body: question.body,
        type: question.type,
        options: [...question.options],
        expected: question.expected,
        points: question.points,
        published: question.published,
    }));

    return new_questions;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let new_questions: Question[] = [];
    questions.map((question: Question) => {
        if (
            question.body === "" &&
            question.expected === "" &&
            question.expected.length === 0
        ) {
            new_questions = [
                ...new_questions,
                makeBlankQuestion(question.id, question.name, question.type),
            ];
        }
    });
    return new_questions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const new_question = questions.find(
        (question: Question): boolean => question.id === id,
    );
    if (!new_question) {
        return null;
    }
    return new_question;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let new_questions: Question[] = [];
    questions.map((question: Question) => {
        if (question.id != id) {
            new_questions = [...new_questions, question];
        }
    });
    return new_questions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let names: string[] = [];
    questions.map((question: Question) => {
        names = [...names, question.name];
    });
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const total: number = questions.reduce(
        (currentSum: number, question: Question) =>
            currentSum + question.points,
        0,
    );
    return total;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const total: number = questions.reduce(
        (currentSum: number, question: Question): number => {
            if (question.published) {
                currentSum += 1;
            }
            return currentSum;
        },
        0,
    );
    return total;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let csv: string = questions.reduce(
        (total: string, current: Question, index: number): string => {
            total +=
                current.id +
                "," +
                current.name +
                "," +
                current.options.length +
                "," +
                current.points +
                "," +
                current.published;
            if (index != questions.length) {
                total += "\n";
            }
            return total;
        },
        "",
    );
    return csv;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = questions.map((question: Question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false,
    }));
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let new_questions: Question[] = questions.map((question: Question) => ({
        id: question.id,
        name: question.name,
        body: question.body,
        type: question.type,
        options: [...question.options],
        expected: question.expected,
        points: question.points,
        published: true,
    }));
    return new_questions;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    let question_type: string = questions.reduce(
        (total: string, question: Question): string => {
            if (total === question.type) {
                total = question.type;
                return total;
            } else {
                return "";
            }
        },
        "",
    );
    if (question_type) {
        return false;
    }
    return true;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let new_questions: Question[] = questions.map((question: Question) => ({
        id: question.id,
        name: question.id === targetId ? newName : question.name,
        body: question.body,
        type: question.type,
        options: [...question.options],
        expected: question.expected,
        points: question.points,
        published: question.published,
    }));
    return new_questions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let new_questions: Question[] = questions.map((question: Question) => ({
        id: question.id,
        name: question.name,
        body: question.body,
        type: targetId === question.id ? newQuestionType : question.type,
        options:
            (
                targetId === question.id &&
                newQuestionType === "multiple_choice_question"
            ) ?
                []
            :   [...question.options],
        expected: question.expected,
        points: question.points,
        published: question.published,
    }));
    return new_questions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
function editOptionQuestionOptions(
    options: string[],
    targetIndex: number,
    newOption: string,
): string[] {
    let new_options = [...options];
    new_options[targetIndex] = newOption;
    return new_options;
}

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    let new_questions: Question[] = questions.map((question: Question) => ({
        id: question.id,
        name: question.name,
        body: question.body,
        type: question.type,
        options:
            targetId === question.id ?
                editOptionQuestionOptions(
                    question.options,
                    targetOptionIndex,
                    newOption,
                )
            :   [...question.options],
        expected: question.expected,
        points: question.points,
        published: question.published,
    }));
    return new_questions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let duplicate: Question | undefined = questions.find(
        (question: Question) => question.id === targetId,
    );
    let new_questions: Question[] = [...questions];
    if (!duplicate) {
        return new_questions;
    }
    let new_duplicate = { ...duplicate };
    new_duplicate = duplicateQuestion(newId, new_duplicate);
    let questions_index: number = new_questions.findIndex(
        (question: Question): boolean => question.id === targetId,
    );
    new_questions.splice(1 + questions_index, 0, new_duplicate);

    return new_questions;
}
