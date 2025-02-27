export default function notifyPsesudo(pseudo){

    const bully = true;

    if(bully){
        switch(pseudo){
            case "geoffroy" : 
                return "Ce nom n'est pas interdit mais il le devrait. Quelle idée de s'appeler Geoffroy...";
            case "sylvain" : 
                return "Ce pseudo est de mauvais goût, il risquerait de faire crasher la borne. Adieu Sylvain";
            case "lucile" : 
                return "Lucile, c'est moreau-se non comme pseudo ?";
            case "marion" : 
                return "Il faut préciser le pseudo des marriés. Marions...";
            case "laetitia" : 
                return "As-tu pensé aux websockets pour valider ton pseudo ?";
            case "enora" : 
                return "On bloque ce pseudo pour te remercier pour le budget. MERCI !! ";
            default:
                return "Je ne sais pas quoi dire. Changez de pseudo";
        }
    }
    else {
        return "Merci de mettre un pseudo non offensant entre 3 et 10 charactères."
    }
}