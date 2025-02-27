export default function verifPseudo(pseudo) {
  const bannedWords = [
      "admin", "moderator", "root", "boss", "staff", "support", "owner",
      "con", "merde", "putain", "fdp", "salope", "connard", "abruti", "idiot",
      "fuck", "shit", "bitch", "asshole", "bastard", "dumbass", "moron", "cunt",
      "mierda", "puta", "gilipollas", "cabron", "estupido", "pendejo", "coño",
      "hitler", "nazi", "racist", "slave", "terrorist", "killer", "murder",
      "hacker", "cheater", "sex", "porn", "drug", "scam", "fraud", "mod",
      "administ", "sysadmin", "god", "dev", "test", "bot", " ","caca","pipi","kkk","nique","baise","foutre","bite","penis","chatte","pd",
      "pede","con","batar","nig","hoe",
      "bander",
      "bigornette",
      "bite",
      "bitte",
      "bloblos",
      "bordel",
      "bosser",
      "bourré",
      "brackmard",
      "branlage",
      "branler",
      "branlette",
      "branleur",
      "branleuse",
      "brouter le cresson",
      "caca",
      "chatte",
      "chiasse",
      "chier",
      "chiottes",
      "clito",
      "connasse",
      "conne",
      "couilles",
      "cramouille",
      "cul",
      "déconne",
      "drague",
      "emmerd",
      "encul",
      "enfoir",
      "étron",
      "folle",
      "foutre",
      "gerbe",
      "gouine",
      "folle",
      "grogniasse",
      "gueule",
      "jouir",
      "MALPT",
      "merde",
      "neg",
      "palucher",
      "pédale",
      "péte",
      "pisser",
      "chie",
      "pouffiasse",
      "pousse-crotte",
      "ramoner",
      "sac à merde",
      "salaud",
      "salope",
      "suce",
      "tapette",
      "teuf",
      "tringler",
      "trique",
      "turlute",
      "zigounette",
      "zizi","anal", "anilingus", "anus", "apeshit", "arsehole", 
      "ass", "asshole", "assmunch", "auto erotic", "autoerotic", "babeland", "baby batter", 
      "baby juice", "ballgag", "ballgravy", "ballkicking", "balllicking", "ballsack", "ballsucking", 
      "bangbros", "bareback", "barely legal", "barenaked", "bastard", "bastinado", "bbw", "bdsm", "beaner", 
      "bestiality", "bigblack", "bigbreasts", "bigknockers", "bigtits", "bimbos", "birdlock", "bitch", "blowjob", 
      "bollocks", "bondage", "boner", "boob", "booty call", "bukkake", "bulldyke", "bullshit", "bunghole", "busty", 
      "butt", "cameltoe", "camgirl", "camslut", "camwhore", "carpetmuncher", "circlejerk", "clit", "clamps", "cock", 
      "copro", "corno" ,"cornhole", "coon", "coons", "creampie", "cum", "cunnilingus", "cunt", "darkie", "daterape", 
      "deep throat", "deepthroat", "dendrophilia", "dick", "dildo", "dingleberry", "dingleberries", "dirty pillows", 
      "dirty sanchez", "doggie style", "doggiestyle", "doggy style", "doggystyle", "dog style", "dolcett", "domination", 
      "dominatrix", "dong", "penetr", "dp", "dryhump", "dvda", "ass", "ecchi", "ejaculation", "erotic", "erotism", "escort", 
      "eunuch", "fag", "fecal", "felch", "fellatio", "feltch", "squirt", "femdom", "figging", "fingerbang", 
      "fingering", "fisting", "footfetish", "footjob", "frotting", "fuck", "fudgepacker", "futa", "gang bang", 
      "gay sex", "genitals", "cock", "goatcx", "goatse", "god damn", "gokkun", "golden shower", "goodpoop", 
      "goo girl", "goregasm", "grope", "group sex", "gspot", "guro", "hand job", "handjob", "hard core", "hardcore", 
      "hentai", "homoerotic", "hooker", "chick", "kill", "huge fat", "humping", "incest", "jackoff", "jail", "jerk", 
      "jigaboo", "jiggaboo", "jiggerboo", "jizz", "juggs", "kike", "kinbaku", "kink", "knobbing", "lolita", "lovemaking", 
      "masturb", "milf", "missionary", "mouthwash", "nambla", "nawashi", "negro", "neonazi", "nigga", "nigger", "nimphomania", 
      "nipple", "nsfw", "nude", "nudity", "nympho", "orgasm", "orgy", "paedophile", "panties", "panty", "pedo", "peg", "penis", 
      "piss", "playboy", "ponyplay", "poof", "poon", "punany", "poop", "porn", "pthc", "pubes", "pussy", "queaf", "queef", "raghead", 
      "rape", "rapi", "rapi", "rectum", "cowgirl", "rimjob", "rimming", "rosypalm", "sadism", "scat", "schlong", "semen", 
      "sex", "shemale", "shibari", "shit", "shota", "slut", "smut", "snatch", "sodom", "spic", "splooge", "spooge", "spunk",
       "strap", "strip", "doggy", "suck", "sucks", "swastika", "swinger", "threesome", "throating", "tit", "topless", "tosser", 
       "tranny", "tubgirl", "tushy", "twat", "twink", "undressing", "upskirt", "vagina", "vibr", "vore", "voyeur", "vulva", 
       "wank", "wet", "xx", "yaoi", "zoophil"



      //noms du staff pour les notifs personnalisées à enlever pour les salon
      ,"geoffroy","sylvain","enora","lucile","marion","laetitia"
  ];

  const normalizeText = (text) => {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const normalizedPseudo = normalizeText(pseudo);

  if (normalizedPseudo.length < 3 || normalizedPseudo.length > 10) {
      return false;
  }

  if (bannedWords.some(word => normalizedPseudo.includes(word))) {
      return false;
  }

  if (!/^[a-z0-9]+$/.test(normalizedPseudo)) {
      return false;
  }

  return true;
}
