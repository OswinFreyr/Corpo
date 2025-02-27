export default function getEvent(){

    const events = [
        {
            "description" : "Sylvain vient faire une blague beauf dans l'open space. Le moral de vos employés est en chute libre.",
            "treasury" : 0,
            "wellbeing" : -30,
            "productivity" : -10,
            "environment" : 0
        },
        {
            "description" : "Morgane Makeup enregistre son nouveau single au studio en face du bureau. Vous priez pour devenir sourd.",
            "treasury" : 0,
            "wellbeing" : -10,
            "productivity" : -5,
            "environment" : 0
        },
        {
            "description" : "La boite de votre principal concurrent a coulé et vous récupérez tous ses clients. A vous l'argent !",
            "treasury" : 30,
            "wellbeing" : 0,
            "productivity" : 0,
            "environment" : 0
        },
        {
            "description" : "Laetitia vous fait une présentation forcée de 2h sur les websockets. Bon courage",
            "treasury" : 0,
            "wellbeing" : -15,
            "productivity" : -5,
            "environment" : 0
        },
        {
            "description" : "Une prise de bonne résolution tardive motive les employés à venir au travail à vélo pendant un an.",
            "treasury" : 0,
            "wellbeing" : 0,
            "productivity" : -5,
            "environment" : 20
        },
        {
            "description" : "Geoffroy propose un hackaton fun à l'équipe qui a naïvement accepté. Les projet progressent à grande allure.",
            "treasury" : 0,
            "wellbeing" : -10,
            "productivity" : 50,
            "environment" : 0
        }

        
    ]
    
    const random = Math.floor(Math.random() * events.length);
    return events[random];
}