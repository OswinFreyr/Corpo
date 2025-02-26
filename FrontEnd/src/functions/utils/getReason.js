export default function getReason(jauge, niveau) {
    switch (jauge) {
        case "productivity":
            return niveau <= 0 
                ? "La productivité est tombée à zéro, l'économie est en ruine et les entreprises ferment en masse."
                : "La productivité a atteint des sommets inhumains, les travailleurs sont épuisés et des révoltes éclatent.";

        case "wellbeing":
            return niveau <= 0 
                ? "Le bien-être de la population est au plus bas, la société sombre dans le chaos."
                : "Le bien-être est trop élevé, la population ne veut plus travailler et l'économie s'effondre.";

        case "treasury":
            return niveau <= 0 
                ? "Les caisses de l'État sont vides, vous êtes en faillite et le pays est en crise."
                : "Les coffres débordent d'or, mais les inégalités explosent et la révolte gronde.";

        case "environment":
            return niveau <= 0 
                ? "L'environnement est détruit, les catastrophes naturelles rendent la vie impossible."
                : "L'écologie a pris le dessus sur tout, l'économie s'est effondrée faute d'activité industrielle.";

        default:
            return "Une crise majeure a mis fin à votre mandat.";
    }
}
