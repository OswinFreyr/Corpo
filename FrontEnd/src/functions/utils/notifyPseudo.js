export default function notifyPsesudo(pseudo){

    const bully = true;

    if(bully){
        switch(pseudo){
            case "GEOFFROY" : 
                return "Ce nom n'est pas interdit mais il le devrait. Quelle idée de s'appeler Geoffroy...";
            case "SYLVAIN" : 
                return "Ce pseudo est de mauvais goût, il risquerait de faire crasher la borne. Adieu Sylvain";
            case "LUCILE" : 
                return "Lucile, c'est moreau-se non comme pseudo ?";
            case "MARION" : 
                return "Il faut préciser le pseudo des marriés. Marions...";
            case "LAETITIA" : 
                return "As-tu pensé aux websockets pour valider ton pseudo ?";
            case "ENORA" : 
                return "On bloque ce pseudo pour te remercier pour le budget. MERCI !! ";
            default:
                return "Je ne sais pas quoi dire. Changez de pseudo";
        }
    }
    else {
        return "Merci de mettre un pseudo non offensant entre 3 et 10 charactères."
    }
}