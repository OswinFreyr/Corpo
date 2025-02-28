export default async function askOneQuestion(id) {
    const questionData = await fetch(`http://localhost:2000/api/v1/questions/id?id=${id}`);
    const question = await questionData.json();
    return question;
}