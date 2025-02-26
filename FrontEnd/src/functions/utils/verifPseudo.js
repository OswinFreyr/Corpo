export default function verifPseudo (pseudo) {
  const bannedWords = [
      "admin", "moderator", "root", "boss", "badword",
      "con", "merde", "putain", "fdp", "salope", "connard", "abruti", "idiot", 
      "fuck", "shit", "bitch", "asshole", "bastard", "dumbass", "moron", 
      "mierda", "puta", "gilipollas", "cabron", "estupido","hitler", " "
    ];

    const normalizeText = (text) => {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  return bannedWords.some(word => normalizeText(pseudo).includes(word));

}