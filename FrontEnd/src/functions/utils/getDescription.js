export default function getDescription(value,type){
    if (value <= 10) {
        return {
          treasury: "Bientôt une collecte sur Leetchi ?",
          wellbeing: "Burn-out collectif imminent...",
          productivity: "On dirait un lundi matin permanent.",
          environment: "Tu travailles chez une filiale de Total ?"
        }[type];
      } else if (value <= 30 && value > 10) {
        return {
          treasury: "On serre la ceinture, mais ça passe !",
          wellbeing: "Un petit massage ? Non ? Juste une pause alors...",
          productivity: "Faut relancer la machine !",
          environment: "Le greenwashing est notre ami."
        }[type];
      } else if (value <= 70 && value > 30) {
        return {
          treasury: "La compta est sous contrôle.",
          wellbeing: "Ambiance open-space, mais avec du café.",
          productivity: "Tout roule, mais faut pas trop forcer.",
          environment: "On plante un arbre à chaque mail supprimé."
        }[type];
      } else if (value <= 90 && value > 70) {
        return {
          treasury: "C'est la fête au CAC 40 !",
          wellbeing: "Tout le monde a eu son tapis de yoga ?",
          productivity: "Mode turbo activé !",
          environment: "On roule en vélo-bureau, tout va bien."
        }[type];
      } else {
        return {
          treasury: "Elon Musk, sors de ce corps !",
          wellbeing: "Les employés chantent du Disney en travaillant.",
          productivity: "On dirait une armée de robots !",
          environment: "On vient d'être rachetés par Greenpeace."
        }[type];
      }
}