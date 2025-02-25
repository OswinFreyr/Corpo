export default async function askQuestions() {
    const questionsData = await fetch("localhost:2000/api/v1/questions/");
    const questions = await questionsData.json();
    return questions;
}
