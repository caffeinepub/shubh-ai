export type BioStyle = "attitude" | "cute" | "professional";
export type BioLanguage = "english" | "hindi";
export type BioLength = "short" | "medium";

function stripEmojis(text: string): string {
  // Remove emoji using unicode property escapes
  return text
    .replace(/\p{Emoji}/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const templates: Record<
  BioStyle,
  Record<BioLanguage, Record<BioLength, string[]>>
> = {
  attitude: {
    english: {
      short: [
        "Living life on my own terms 🔥",
        "Not for everyone, and that's the point 😎",
        "Main character energy. Always. 👑",
        "Too real for filters ✨",
        "Chase dreams, not people 💫",
        "Built different. Period. 🔥",
        "Unbothered. Moisturized. Thriving. 😤",
        "Your vibe, my warning sign 😈",
        "Soft heart. Strong spine. 🖤",
        "Making moves in silence 🤫",
        "Born rare, not basic 💎",
        "Self-made, God-aided 🙏",
      ],
      medium: [
        "Living unapologetically. If that bothers you, that's your problem 😎\nNot here to impress, here to express 🔥",
        "I didn't come this far to only come this far 💪\nMain character of my own story. Always. 👑",
        "Born to stand out, not fit in ✨\nDoing it my way or not at all 🔥",
        "They said be yourself. So I became unstoppable 😈\nWatching me struggle was your motivation. Watching me win is your education 👑",
        "Not chasing, not waiting 🤞\nI'm the prize they all missed 💎",
        "Energy doesn't lie 🔮\nYou either match mine or get left behind 😤",
      ],
    },
    hindi: {
      short: [
        "Apni marzi ka maalik 😈",
        "Duniya jalti hai toh jalne do 🔥",
        "Kisi se kum nahi 💯",
        "Attitude mera, rules mere 😎",
        "Tere jaisa nahi hoon main 👑",
        "Jhukta nahi main kisi ke aage 🔥",
        "Apna time aayega, aa gaya 💫",
        "Vibe check: Pass. Attitude check: Legend. 😈",
        "Nafrat karo ya pyaar, mujhe farak nahi 🖤",
        "Mera andaaz alag hai 💎",
      ],
      medium: [
        "Duniya ne rok rakhne ki koshish ki 😈\nLekin main toh rule karne ke liye bana hoon 🔥",
        "Log baat karte hain, toh karne do\nMere kaam meri pehchaan bante hain 💯",
        "Na jhukna, na rukna — yahi meri kahani hai 👑\nApni raah khud banata hoon 🔥",
        "Attitude mein royalty, dil mein loyalty 💎\nDono ek saath — tabhi main hoon 😎",
        "Log tujhe rokhenge, tujhe tokenge\nMagar teri manzil sirf teri hai 🔥",
      ],
    },
  },
  cute: {
    english: {
      short: [
        "Spreading sunshine, one smile at a time ☀️",
        "Soft vibes, big heart 💗",
        "Sweet like honey, wild like thunder 🌸",
        "Made of stardust and good intentions ✨",
        "Lover of sunsets and cozy corners 🌅",
        "Tea > Everything 🍵 | Dreamer 💭",
        "Kind heart, fierce soul 💝",
        "A little bit of magic in every day 🌈",
        "Love is the answer, always 💕",
        "Daydreamer with a golden heart 💛",
        "Chasing butterflies and big dreams 🦋",
        "Cozy vibes and good energy ✨",
      ],
      medium: [
        "Just a girl who loves too deeply and laughs too loudly 💗\nGrateful for small moments and big dreams ✨",
        "Made of sunshine and stubbornness ☀️\nSharing love one hug at a time 🌸",
        "Believer in magic, kindness, and second chances 💫\nYour personal ray of sunshine 🌟",
        "Soft on the outside, strong on the inside 💪\nLife is short — be adorable 🌺",
        "Too soft to be mean, too real to be fake 🌸\nWalking through life with hearts in my eyes 💕",
        "Coffee mornings, starry nights, and everything in between 🌙\nFilling the world with a little more love 💗",
      ],
    },
    hindi: {
      short: [
        "Dil se sweet, vibe se unique 💗",
        "Pyaar baantne wali 🌺",
        "Thodi si crazy, bahut si cute 🌸",
        "Zindagi ek meetha safar 🍭",
        "Nazuk dil, dum-daar khwab 💕",
        "Meri muskaan sab ki jaan 😊",
        "Khushiyan dene wali, dukh na lene wali 🌸",
        "Pyaar se bhari ek choti si duniya 💝",
        "Chand si roshan, phool si mehki 🌸",
        "Sab ka dil jeeta leti hoon 💗",
      ],
      medium: [
        "Dil mein pyaar, chehre pe muskaan 🌸\nYahi meri pehchaan, yahi meri shaan 💗",
        "Thodi si pagal, thodi si senti 🥺\nLekin dil ki sachchi, ek number ki banti 💕",
        "Khwab bade hain, himmat aur badi hai 🌺\nPyaar ki raahen, aur khwabon ki duniya 💗",
        "Jaise phool mein khaushboo hoti hai 🌸\nWaise mujhme dil ki achi achhi baatein hoti hain 💕",
        "Teri khushi mein meri khushi chupi hai 💝\nYeh dil ka rishta hai, koi samjhe toh sahi 🌸",
      ],
    },
  },
  professional: {
    english: {
      short: [
        "Building tomorrow, one goal at a time 🎯",
        "Turning visions into reality 💼",
        "Results-driven. People-first. 📊",
        "Creating impact through innovation ⚡",
        "Lifelong learner | Problem solver 🔑",
        "Passionate about making things better 🌱",
        "Strategy meets execution 💡",
        "Where ambition meets discipline 🏆",
        "Disrupting the status quo, daily 🚀",
        "Driven by purpose, defined by work 💼",
        "Excellence is the standard 🌟",
        "Hustling with a plan 📈",
      ],
      medium: [
        "Dedicated to turning bold ideas into measurable outcomes 💼\nLeading with empathy, executing with precision 🎯",
        "3+ years of making complex things simple 📊\nBuilding solutions that actually move the needle ⚡",
        "I don't just dream it — I build it 🏗️\nPassionate about growth, obsessed with quality 🌟",
        "Where creativity meets strategy 💡\nHelping brands tell stories that drive results 📈",
        "Turning insights into action 🎯\nBelieve in data, trust in human connection 🤝",
        "Building something that matters every single day 🚀\nDriven by impact, guided by values 🏆",
      ],
    },
    hindi: {
      short: [
        "Sapne bade, mehnat aur badi 🎯",
        "Kaam se pehchaan banate hain 💼",
        "Har din ek naya mauka 📈",
        "Safalta meri manzil hai 🏆",
        "Mehnat + Commitment = Success 💡",
        "Kaamyabi ka raasta mehnat se guzarta hai 🔑",
        "Junoon se kaam, dil se kaam 🚀",
        "Kal se behtar aaj banana hai 🌟",
        "Apna naam khud banaata hoon 💼",
        "Har mushkil ek mauka hai seekhne ka 📊",
      ],
      medium: [
        "Kaamyabi sirf khwabon mein nahi, mehnat mein hoti hai 💼\nHar din apne goals ke ek kadam aur kareeb 🎯",
        "Dil mein junoon, haath mein kaam 🔥\nSapne dekhna + unhe jeena — yahi mera dharm hai 🏆",
        "Professionals bante hain, struggle se nahi bhaagte 💡\nHar problem mein ek opportunity chupta hai 📈",
        "Log pehchante hain kaam se, naam se nahi 💼\nMehnat hi meri pehchaan, results hi meri awaaz 🎯",
        "Roz uthke apne sapne ko thoda aur kareeb laata hoon 🌟\nYahi zindagi hai, yahi meri kahani hai 🚀",
      ],
    },
  },
};

function injectName(template: string, name: string): string {
  if (!name) return template;
  const cleanName = name.split(",")[0].trim();
  if (!cleanName) return template;
  const nameInjections = [
    `${cleanName} | ${template}`,
    `${cleanName} 🌟 | ${template.split("\n")[0]}`,
  ];
  if (Math.random() < 0.4) {
    return nameInjections[Math.floor(Math.random() * nameInjections.length)];
  }
  return template;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateBios(opts: {
  input: string;
  style: BioStyle;
  language: BioLanguage;
  length: BioLength;
  addEmojis: boolean;
  count?: number;
}): string[] {
  const { input, style, language, length, addEmojis, count = 4 } = opts;
  const pool = templates[style][language][length];
  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((template) => {
    let bio = injectName(template, input);
    if (!addEmojis) {
      bio = stripEmojis(bio);
    }
    return bio;
  });
}
