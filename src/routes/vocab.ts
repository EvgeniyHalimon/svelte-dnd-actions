const rawVocab: string[] = [
    "talented",
    "honest",
    "authentic",
    "sharp",
    "reliable",
    "magnetic",
    "resilient",
    "positive",
    "sensible",
    "focused",
    "genuine",
    "charismatic",
    "dedicated",
    "creative",
    "adaptable",
    "courageous",
    "patient",
    "flexible",
    "perceptive",
    "grateful",
    "polite",
    "experienced",
    "versatile",
    "modest",
    "cooperative",
    "competent",
    "persistent",
    "sophisticated",
    "humble",
    "insightful",
    "resourceful",
    "logical",
    "generous",
    "articulate",
    "discerning",
    "balanced",
    "gracious",
    "practical",
    "observant",
    "adventurous",
    "grounded",
    "innovative",
    "wise",
    "forgiving",
    "friendly",
    "untalented",
    "dishonest",
    "fake",
    "dull",
    "unreliable",
    "repulsive",
    "fragile",
    "foolish",
    "unimaginative",
    "rigid",
    "timid",
    "impatient",
    "inflexible",
    "oblivious",
    "ungrateful",
    "impolite",
    "inexperienced",
    "specialized",
    "half-hearted",
    "incompetent",
    "inconsistent",
    "unsophisticated",
    "proud",
    "shallow",
    "helpless",
    "illogical",
    "stingy",
    "inarticulate",
    "indiscriminate",
    "unbalanced",
    "flighty",
    "demoralizing",
    "inefficient",
    "resentful",
    "bland",
    "distracted",
    "negative",
    "demanding",
    "captivating",
    "composed",
    "trusting",
    "inspiring",
    "skeptical",
    "meticulous",
    "resolute",
    "receptive",
    "cordial",
    "responsible",
    "ambitious",
    "analytical",
    "inspiring",
    "coherent",
    "accomplished",
    "decisive",
    "inquisitive",
    "dynamic",
    "enthusiastic",
    "passionate",
    "graceful",
    "vibrant",
    "innocent",
    "steadfast",
    "admirable",
    "intuitive",
    "honorable",
    "adventurous",
    "assertive",
    "admirable",
    "articulate",
    "authentic",
    "aware",
    "brave",
    "brilliant",
    "calm",
    "careful",
    "charming",
    "cheerful",
    "compassionate",
    "confident",
    "considerate",
    "convincing",
    "cooperative",
    "creative",
    "cultured",
    "daring",
    "dedicated",
    "delightful",
    "dependable",
    "determined",
    "diligent",
    "discerning",
    "discreet",
    "dynamic",
    "earnest",
    "efficient",
    "elegant",
    "eloquent",
    "energetic",
    "enthusiastic",
    "excellent",
    "experienced",
    "fearless",
    "friendly",
    "funny",
    "generous",
    "gentle",
    "genuine",
    "graceful",
    "gracious",
    "honest",
    "humble",
    "impartial",
    "independent",
    "insightful",
    "intelligent",
    "kind",
    "knowledgeable",
    "likable",
    "loving",
    "loyal",
    "mature",
    "methodical",
    "motivated",
    "neat",
    "nice",
    "open-minded",
    "optimistic",
    "organized",
    "patient",
    "peaceful",
    "persuasive",
    "polite",
    "practical",
    "proactive",
    "productive",
    "punctual",
    "rational",
    "reliable",
    "resourceful",
    "respectful",
    "responsible",
    "sensible",
    "sincere",
    "skillful",
    "steadfast",
    "supportive",
    "talented",
    "thoughtful",
    "tolerant",
    "trustworthy",
    "understanding",
    "versatile",
    "vibrant",
    "wise",
    "witty",
    "wonderful",
    "youthful",
    "zealous",
    "abundant",
    "accessible",
    "accurate",
    "active",
    "admired",
    "adored",
    "affectionate",
    "agreeable",
    "alert",
    "amazing",
    "amiable",
    "amusing",
    "appreciated",
    "assertive",
    "astonishing",
    "astute",
    "attentive",
    "attractive",
    "authentic",
    "awake",
    "balanced",
    "beautiful",
    "beloved",
    "beneficial",
    "benevolent",
    "best",
    "blessed",
    "blissful",
    "bold",
    "brave",
    "bright",
    "brilliant",
    "buoyant",
    "calm",
    "capable",
    "carefree",
    "careful",
    "celebrated",
    "charismatic",
    "charming",
    "cheerful",
    "cherished",
    "clean",
    "clever",
    "colorful",
    "comfortable",
    "compassionate",
    "confident",
    "conscious",
    "considerate",
    "content",
    "convincing",
    "cool",
    "cosmopolitan",
    "creative",
    "credible",
    "curious",
    "daring",
    "dashing",
    "dazzling",
    "decent",
    "dedicated",
    "delicate",
    "delightful",
    "dependable",
    "desirable",
    "devoted",
    "diligent",
    "diplomatic",
    "discerning",
    "discreet",
    "diverse",
    "dynamic",
    "eager",
    "earnest",
    "easygoing",
    "ebullient",
    "eclectic",
    "efficient",
    "elated",
    "elegant",
    "eloquent",
    "empathetic",
    "energetic",
    "enlightened",
    "enthusiastic",
    "esteemed",
    "ethical",
    "excellent",
    "exciting",
    "exhilarated",
    "exquisite",
    "extraordinary",
    "fabulous",
    "fair",
    "faithful",
    "fascinating",
    "fearless",
    "fine",
    "flawless",
    "fond",
    "fortunate",
    "friendly",
    "funny",
    "gallant",
    "generous",
    "gentle",
    "genuine",
    "glorious",
    "glowing",
    "good",
    "gorgeous",
    "graceful",
    "gracious",
    "grand",
    "grateful",
    "great",
    "gutsy",
    "happy",
    "hardworking",
    "harmonious",
    "helpful",
    "heroic",
    "honest",
    "honorable",
    "hopeful",
    "humble",
    "illustrious",
    "imaginative",
    "impartial",
    "impeccable",
    "incomparable",
    "independent",
    "innovative",
    "insightful",
    "inspiring",
    "intelligent",
    "intrepid",
    "inventive",
    "invigorated",
    "invincible",
    "irresistible",
    "jovial",
    "joyful",
    "jubilant",
    "just",
    "keen",
    "kind",
    "laudable",
    "lavish",
    "lovable",
    "lovely",
    "loving",
    "loyal",
    "lucky",
    "luminous",
    "magnanimous",
    "marvelous",
    "masterful",
    "mature",
    "meaningful",
    "mellow",
    "merciful",
    "meritorious",
    "merry",
    "methodical",
    "meticulous",
    "mighty",
    "mindful",
    "miraculous",
    "modest",
    "motivated",
    "neat",
    "nice",
    "noble",
    "nonchalant",
    "nurturing",
    "observant",
    "open-minded",
    "optimistic",
    "outstanding",
    "passionate",
    "patient",
    "peaceful",
    "perfect",
    "persistent",
    "phenomenal",
    "playful",
    "plentiful",
    "poised",
    "polished",
    "popular",
    "positive",
    "powerful",
    "practical",
    "precious",
    "precise",
    "premium",
    "prestigious",
    "pretty",
    "proactive",
    "proficient",
    "profound",
    "prominent",
    "protected",
    "proud",
    "qualified",
    "radiant",
    "rational",
    "reassured",
    "receptive",
    "reliable",
    "remarkable",
    "resilient",
    "resolute",
    "resourceful",
    "respected",
    "revered",
    "rewarding",
    "rigorous",
    "romantic",
    "safe",
    "satisfied",
    "scholarly",
    "scrupulous",
    "secure",
    "seductive",
    "self-assured",
    "selfless",
    "sensational",
    "sensitive",
    "serene",
    "shining",
    "sincere",
    "skillful",
    "smart",
    "smooth",
    "soothing",
    "soulful",
    "sparkling",
    "spirited",
    "splendid",
    "steadfast",
    "stimulating",
    "stunning",
    "stupendous",
    "stylish",
    "succes",
]

export const vocab = [...new Set(rawVocab)].map((word) => word.charAt(0).toUpperCase() + word.slice(1))