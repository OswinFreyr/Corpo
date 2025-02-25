import askQuestion from "../api/askQuestion.js";

export default function Tuto(player){
    let question;
    for (i=0; i<4;i++){
        question = askQuestion();
    }

}