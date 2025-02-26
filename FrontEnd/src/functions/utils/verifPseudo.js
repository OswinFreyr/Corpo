export default function verifPseudo(pseudo) {
  const bannedWords = [
      "admin", "moderator", "root", "boss", "staff", "support", "owner",
      "con", "merde", "putain", "fdp", "salope", "connard", "abruti", "idiot",
      "fuck", "shit", "bitch", "asshole", "bastard", "dumbass", "moron", "cunt",
      "mierda", "puta", "gilipollas", "cabron", "estupido", "pendejo", "coño",
      "hitler", "nazi", "racist", "slave", "terrorist", "killer", "murder",
      "hacker", "cheater", "sex", "porn", "drug", "scam", "fraud", "mod",
      "administ", "sysadmin", "god", "dev", "test", "bot", " ", ""
  ];

  const normalizeText = (text) => {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const normalizedPseudo = normalizeText(pseudo);

  // Check length && bad words
  if ((normalizedPseudo.length > 3 && normalizedPseudo.length < 11) && !(bannedWords.some(word => normalizedPseudo.includes(word)))) {
    return false;
  } else {
    return true;
  }
}
