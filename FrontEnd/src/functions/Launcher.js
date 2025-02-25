import Tuto from "../functions/Tuto.js";
import Corpo from "./Corpo.js";

export default function launcher(tuto){

    let player ={};
    let score = 0;
    let reason="";

    if (tuto){
        // lancer le tutoriel
        Tuto(player);
        //lancer le jeu
        Corpo(player,score,reason);
    }
    else{
        Corpo(player,score,reason);
    }
    return player,score,reason;
}