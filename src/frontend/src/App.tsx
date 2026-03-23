import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { useTypewriter } from "@/hooks/useTypewriter";
import {
  type BioLanguage,
  type BioLength,
  type BioStyle,
  generateBios,
} from "@/lib/bioTemplates";
import {
  Check,
  ChevronDown,
  Copy,
  Globe,
  Heart,
  Instagram,
  MessageCircle,
  Moon,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Wand2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Theme Context ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({
  dark: true,
  toggle: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("shubh_theme");
    return stored ? stored === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    localStorage.setItem("shubh_theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = () => setDark((d) => !d);
  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>
  );
}

const useTheme = () => useContext(ThemeCtx);

// ── Types ─────────────────────────────────────────────────────────────────────
interface SavedBio {
  id: string;
  text: string;
  style: BioStyle;
  savedAt: number;
}

const SURPRISE_VIBES = [
  "wanderlust soul",
  "music addict",
  "gym freak",
  "bookworm",
  "foodie",
  "coder",
  "artist",
  "dreamer",
  "hustler",
  "gamer",
  "traveler",
  "photographer",
];

// ── Background ────────────────────────────────────────────────────────────────
function CosmicBackground() {
  return (
    <div className="cosmic-bg">
      <div className="stars" />
      <div className="cosmic-orb" />
    </div>
  );
}

// ── Loading Dots ──────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="loading-dot" />
      <span className="loading-dot" />
      <span className="loading-dot" />
    </span>
  );
}

// ── Bio Card ──────────────────────────────────────────────────────────────────
function BioCard({
  bio,
  style,
  index,
  onSave,
  isSaved,
}: {
  bio: string;
  style: BioStyle;
  index: number;
  onSave: (bio: string) => void;
  isSaved: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const { displayed } = useTypewriter(bio, 22);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bio);
    setCopied(true);
    toast.success("Copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const encoded = encodeURIComponent(bio);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener");
  };

  const handleSave = () => {
    onSave(bio);
  };

  const styleBadge = {
    attitude: { label: "Attitude 😎", className: "badge-attitude" },
    cute: { label: "Cute ❤️", className: "badge-cute" },
    professional: { label: "Professional 💼", className: "badge-professional" },
  }[style];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 48px rgba(168,85,247,0.28)",
      }}
      className="glass-card-light p-5 flex flex-col gap-3"
      data-ocid={`bio.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styleBadge.className}`}
        >
          {styleBadge.label}
        </span>
        <button
          onClick={handleSave}
          className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
            isSaved ? "text-pink-400" : "text-muted-fg hover:text-pink-400"
          }`}
          title={isSaved ? "Saved!" : "Save bio"}
          data-ocid={`bio.toggle.${index + 1}`}
          type="button"
        >
          <Heart
            size={15}
            fill={isSaved ? "currentColor" : "none"}
            strokeWidth={2}
          />
        </button>
      </div>

      <p
        className="text-sm leading-relaxed flex-1 whitespace-pre-line bio-text"
        style={{ minHeight: "3em" }}
      >
        {displayed}
        <span className="typewriter-cursor" />
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          type="button"
          className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 copy-btn ${
            copied
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "btn-ghost"
          }`}
          data-ocid={`bio.button.${index + 1}`}
        >
          {copied ? (
            <>
              <Check size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy Bio
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          type="button"
          title="Share on WhatsApp"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold btn-whatsapp transition-all duration-200"
          data-ocid={`bio.secondary_button.${index + 1}`}
        >
          <span>📲</span>
          <Share2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Saved Bio Card ────────────────────────────────────────────────────────────
function SavedBioCard({
  saved,
  onRemove,
}: {
  saved: SavedBio;
  onRemove: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(saved.text);
    setCopied(true);
    toast.success("Copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      className="glass-card-light p-4 flex flex-col gap-3 card-hover"
    >
      <p className="text-sm leading-relaxed bio-text whitespace-pre-line flex-1">
        {saved.text}
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium btn-ghost transition-all"
          data-ocid="saved.button"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={() => onRemove(saved.id)}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium btn-danger transition-all"
          data-ocid="saved.delete_button"
        >
          <Trash2 size={12} />
          Remove
        </button>
      </div>
    </motion.div>
  );
}

// ── Placeholder Cards (pre-generation) ───────────────────────────────────────
function PlaceholderCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08 }}
          className="glass-card-light p-5 flex flex-col gap-3"
          data-ocid={`bio.item.${i}`}
        >
          <div className="flex items-center gap-2">
            <div className="skeleton-line w-24 h-5 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="skeleton-line h-3 rounded w-full" />
            <div className="skeleton-line h-3 rounded w-4/5" />
            <div className="skeleton-line h-3 rounded w-3/5" />
          </div>
          <div className="skeleton-line h-8 rounded-xl w-full" />
        </motion.div>
      ))}
    </div>
  );
}

// ── Favorites Empty State ─────────────────────────────────────────────────────
function FavoritesEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-light flex flex-col items-center justify-center py-14 gap-4"
      data-ocid="saved.empty_state"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full flex items-center justify-center empty-state-icon">
          <Heart size={28} className="text-pink-400" />
        </div>
        <motion.span
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            repeatDelay: 2,
          }}
          className="absolute -top-1 -right-1 text-lg"
        >
          ✨
        </motion.span>
      </div>
      <div className="text-center">
        <p className="font-semibold empty-state-title text-base mb-1">
          No favorites yet
        </p>
        <p className="text-sm empty-state-body max-w-xs">
          Heart a bio to save it here! ❤️ Your collection will appear once you
          start saving.
        </p>
      </div>
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const { dark, toggle } = useTheme();
  const [input, setInput] = useState("");
  const [style, setStyle] = useState<BioStyle>("attitude");
  const [language, setLanguage] = useState<BioLanguage>("english");
  const [length, setLength] = useState<BioLength>("short");
  const [addEmojis, setAddEmojis] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bios, setBios] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [savedBios, setSavedBios] = useState<SavedBio[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("shubh_saved");
    if (stored) {
      try {
        setSavedBios(JSON.parse(stored));
      } catch (_) {
        // ignore
      }
    }
  }, []);

  const persistSaved = (updated: SavedBio[]) => {
    setSavedBios(updated);
    localStorage.setItem("shubh_saved", JSON.stringify(updated));
  };

  const doGenerate = async (overrides?: {
    input?: string;
    style?: BioStyle;
    language?: BioLanguage;
    length?: BioLength;
    addEmojis?: boolean;
  }) => {
    setLoading(true);
    setBios([]);
    setHasGenerated(true);
    await new Promise((r) => setTimeout(r, 1400));
    const generated = generateBios({
      input: overrides?.input ?? input,
      style: overrides?.style ?? style,
      language: overrides?.language ?? language,
      length: overrides?.length ?? length,
      addEmojis: overrides?.addEmojis ?? addEmojis,
      count: 4,
    });
    setBios(generated);
    setLoading(false);
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleGenerate = () => doGenerate();

  const handleRegenerate = () => doGenerate();

  const handleSurpriseMe = () => {
    const styles: BioStyle[] = ["attitude", "cute", "professional"];
    const languages: BioLanguage[] = ["english", "hindi"];
    const lengths: BioLength[] = ["short", "medium"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    const randomLen = lengths[Math.floor(Math.random() * lengths.length)];
    const randomVibe =
      SURPRISE_VIBES[Math.floor(Math.random() * SURPRISE_VIBES.length)];
    const randomEmoji = Math.random() > 0.3;
    setStyle(randomStyle);
    setLanguage(randomLang);
    setLength(randomLen);
    setAddEmojis(randomEmoji);
    setInput(randomVibe);
    doGenerate({
      input: randomVibe,
      style: randomStyle,
      language: randomLang,
      length: randomLen,
      addEmojis: randomEmoji,
    });
  };

  const handleSave = (bioText: string) => {
    const exists = savedBios.some((b) => b.text === bioText);
    if (exists) {
      persistSaved(savedBios.filter((b) => b.text !== bioText));
      toast("Removed from favorites");
    } else {
      const newSaved: SavedBio = {
        id: `${Date.now()}-${Math.random()}`,
        text: bioText,
        style,
        savedAt: Date.now(),
      };
      persistSaved([newSaved, ...savedBios]);
      toast.success("Added to favorites! ❤️");
    }
  };

  const handleRemoveSaved = (id: string) => {
    persistSaved(savedBios.filter((b) => b.id !== id));
    toast("Removed from favorites");
  };

  return (
    <div className="min-h-screen relative theme-root">
      {dark && <CosmicBackground />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: dark ? "rgba(20,22,30,0.95)" : "rgba(255,255,255,0.97)",
            border: dark
              ? "1px solid rgba(168,85,247,0.3)"
              : "1px solid rgba(168,85,247,0.2)",
            color: dark ? "#F3F4F6" : "#1a1c26",
          },
        }}
      />

      {/* Navbar */}
      <header className="navbar-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#generator"
            className="flex items-center gap-2.5"
            data-ocid="nav.link"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #A855F7, #3B82F6)",
                boxShadow: "0 0 16px rgba(168,85,247,0.5)",
              }}
            >
              B
            </div>
            <span className="font-display font-bold text-lg nav-brand">
              Shubh<span className="gradient-text">AI</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {["Features", "How it Works", "FAQs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm nav-link transition-colors"
                data-ocid="nav.link"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              type="button"
              onClick={toggle}
              whileTap={{ scale: 0.88 }}
              className="theme-toggle-btn p-2 rounded-xl transition-all"
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
              data-ocid="nav.toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {dark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Sun size={18} className="text-yellow-300" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Moon size={18} className="text-purple-500" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              className="md:hidden p-2 nav-link"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.toggle"
            >
              <ChevronDown
                size={20}
                className={`transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-2">
            {["Features", "How it Works", "FAQs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm nav-link py-1"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.link"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-16 pb-12 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 hero-badge"
            >
              <Sparkles size={12} />
              Powered by AI Templates
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <span className="gradient-text-animated">
                Create Your Perfect Bio
              </span>
              <br />
              <span className="hero-title-plain">in Seconds</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-subtitle text-base sm:text-lg mb-8 max-w-xl mx-auto"
            >
              AI-powered Instagram &amp; WhatsApp bio generator. Stand out with
              bios that match your vibe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10"
            >
              {[
                { icon: <Sparkles size={14} />, label: "50K+ Bios Generated" },
                { icon: <Star size={14} />, label: "3 Style Modes" },
                { icon: <Globe size={14} />, label: "2 Languages" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm stat-item"
                >
                  <span className="stat-icon">{icon}</span>
                  {label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {[
                { icon: <Instagram size={12} />, label: "Instagram" },
                { icon: <MessageCircle size={12} />, label: "WhatsApp" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="platform-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {icon} {label}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Card */}
        <section id="generator" className="px-4 sm:px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display font-bold text-xl mb-6 gradient-text">
                Generate Your Bio
              </h2>

              <div className="mb-4">
                <Label className="text-xs font-semibold label-text mb-2 block uppercase tracking-wider">
                  Your Name / Vibe
                </Label>
                <input
                  className="neon-input w-full px-4 py-3 text-sm"
                  placeholder="Enter your name or vibe... (e.g. Riya, loves music and travel)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !loading && handleGenerate()
                  }
                  data-ocid="bio.input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div>
                  <Label className="text-xs font-semibold label-text mb-2 block uppercase tracking-wider">
                    Style
                  </Label>
                  <Select
                    value={style}
                    onValueChange={(v) => setStyle(v as BioStyle)}
                  >
                    <SelectTrigger
                      className="neon-select-trigger"
                      data-ocid="bio.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="neon-select-content">
                      <SelectItem value="attitude">Attitude 😎</SelectItem>
                      <SelectItem value="cute">Cute ❤️</SelectItem>
                      <SelectItem value="professional">
                        Professional 💼
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold label-text mb-2 block uppercase tracking-wider">
                    Language
                  </Label>
                  <Select
                    value={language}
                    onValueChange={(v) => setLanguage(v as BioLanguage)}
                  >
                    <SelectTrigger
                      className="neon-select-trigger"
                      data-ocid="bio.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="neon-select-content">
                      <SelectItem value="english">English 🇬🇧</SelectItem>
                      <SelectItem value="hindi">Hindi 🇮🇳</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold label-text mb-2 block uppercase tracking-wider">
                    Length
                  </Label>
                  <Select
                    value={length}
                    onValueChange={(v) => setLength(v as BioLength)}
                  >
                    <SelectTrigger
                      className="neon-select-trigger"
                      data-ocid="bio.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="neon-select-content">
                      <SelectItem value="short">Short ⚡</SelectItem>
                      <SelectItem value="medium">Medium 📝</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="emoji-toggle-row flex items-center justify-between p-3 rounded-xl mb-6">
                <div>
                  <p className="text-sm font-medium emoji-toggle-label">
                    Add Emojis
                  </p>
                  <p className="text-xs emoji-toggle-sub">
                    Include emojis in your bio
                  </p>
                </div>
                <Switch
                  checked={addEmojis}
                  onCheckedChange={setAddEmojis}
                  data-ocid="bio.switch"
                  className="data-[state=checked]:bg-purple-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleGenerate}
                  type="button"
                  disabled={loading}
                  whileTap={{ scale: 0.96 }}
                  className="neon-btn flex-1 py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  data-ocid="bio.primary_button"
                >
                  {loading ? (
                    <>
                      <LoadingDots />
                      <span className="ml-1">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate Bio ✨
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={handleSurpriseMe}
                  type="button"
                  disabled={loading}
                  whileTap={{ scale: 0.96 }}
                  className="surprise-btn py-3.5 px-5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  data-ocid="bio.secondary_button"
                >
                  {loading ? (
                    <>
                      <LoadingDots />
                    </>
                  ) : (
                    <>
                      <Wand2 size={16} />
                      Surprise Me ✨
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Output Section */}
        <section
          ref={outputRef}
          id="output"
          className="px-4 sm:px-6 pb-16"
          style={{ scrollMarginTop: "80px" }}
        >
          <div className="max-w-3xl mx-auto">
            {hasGenerated && (
              <>
                <div className="section-divider mb-10" />
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-2xl">
                    <span className="gradient-text">Your Perfect</span>
                    <span className="section-title-plain"> Bios</span>
                  </h2>
                  {bios.length > 0 && (
                    <motion.button
                      onClick={handleRegenerate}
                      type="button"
                      disabled={loading}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold regen-btn transition-all"
                      data-ocid="bio.secondary_button"
                    >
                      <RefreshCw
                        size={14}
                        className={loading ? "animate-spin" : ""}
                      />
                      Regenerate 🔄
                    </motion.button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 gap-4"
                      data-ocid="bio.loading_state"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-14 h-14 rounded-full flex items-center justify-center loading-orb"
                      >
                        <Sparkles size={24} className="text-purple-400" />
                      </motion.div>
                      <p className="text-sm loading-text">
                        Crafting your perfect bios...
                      </p>
                      <LoadingDots />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bios"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {bios.length === 0 ? (
                        <PlaceholderCards />
                      ) : (
                        bios.map((bio, i) => (
                          <BioCard
                            key={bio.slice(0, 20)}
                            bio={bio}
                            style={style}
                            index={i}
                            onSave={handleSave}
                            isSaved={savedBios.some((s) => s.text === bio)}
                          />
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {!hasGenerated && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center py-8"
              >
                <p className="prompt-text text-sm">
                  👆 Enter your vibe above and hit <strong>Generate Bio</strong>{" "}
                  to see your bios here!
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Saved Favorites */}
        <section id="favorites" className="px-4 sm:px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="section-divider mb-10" />
            <div className="flex items-center gap-3 mb-6">
              <Heart size={20} className="text-pink-400" fill="currentColor" />
              <h2 className="font-display font-bold text-2xl">
                <span className="gradient-text">Saved</span>
                <span className="section-title-plain"> Favorites</span>
              </h2>
              {savedBios.length > 0 && (
                <span className="saved-count text-xs font-semibold px-2 py-0.5 rounded-full">
                  {savedBios.length}
                </span>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {savedBios.length === 0 ? (
                <FavoritesEmpty key="empty" />
              ) : (
                <motion.div
                  key="list"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <AnimatePresence>
                    {savedBios.map((saved) => (
                      <SavedBioCard
                        key={saved.id}
                        saved={saved}
                        onRemove={handleRemoveSaved}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-4 sm:px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="section-divider mb-10" />
            <div className="text-center mb-10">
              <h2 className="font-display font-bold text-3xl mb-3">
                <span className="gradient-text">Why Shubh?</span>
              </h2>
              <p className="text-sm feature-sub max-w-md mx-auto">
                Everything you need to craft a bio that stops the scroll.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  icon: <Zap size={22} />,
                  title: "3 Unique Styles",
                  desc: "Attitude, Cute, or Professional — pick your vibe and let the AI do the rest.",
                  color: "rgba(168,85,247,0.25)",
                  border: "rgba(168,85,247,0.3)",
                  textColor: "#C4B5FD",
                },
                {
                  icon: <Globe size={22} />,
                  title: "Bilingual Support",
                  desc: "Generate bios in English or Hindi. Reach your audience in their language.",
                  color: "rgba(59,130,246,0.25)",
                  border: "rgba(59,130,246,0.3)",
                  textColor: "#93C5FD",
                },
                {
                  icon: <Copy size={22} />,
                  title: "Instant Copy",
                  desc: "One click to copy any bio. Paste directly into Instagram or WhatsApp.",
                  color: "rgba(236,72,153,0.2)",
                  border: "rgba(236,72,153,0.3)",
                  textColor: "#F9A8D4",
                },
              ].map(({ icon, title, desc, color, border, textColor }) => (
                <motion.div
                  key={title}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 16px 40px rgba(168,85,247,0.18)",
                  }}
                  className="glass-card-light card-hover p-6 flex flex-col gap-3"
                  data-ocid="features.card"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: color,
                      border: `1px solid ${border}`,
                      color: textColor,
                    }}
                  >
                    {icon}
                  </div>
                  <h3 className="font-display font-bold feature-card-title text-lg">
                    {title}
                  </h3>
                  <p className="feature-card-body text-sm leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="px-4 sm:px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="section-divider mb-10" />
            <div className="text-center mb-10">
              <h2 className="font-display font-bold text-3xl mb-3">
                <span className="gradient-text">How It Works</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Enter Your Vibe",
                  desc: "Type your name or a few keywords about yourself.",
                },
                {
                  step: "02",
                  title: "Choose Your Style",
                  desc: "Select Attitude, Cute, or Professional + language.",
                },
                {
                  step: "03",
                  title: "Copy & Shine",
                  desc: "Get 4 unique bios instantly. Copy and post away!",
                },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #A855F7, #3B82F6)",
                      boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                      color: "white",
                    }}
                  >
                    {step}
                  </div>
                  <h3 className="font-bold step-title">{title}</h3>
                  <p className="text-sm step-body">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="px-4 sm:px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="section-divider mb-10" />
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl">
                <span className="gradient-text">FAQs</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  q: "Is Shubh free to use?",
                  a: "Yes! Shubh is completely free. Generate as many bios as you want.",
                },
                {
                  q: "Can I use these bios on WhatsApp too?",
                  a: "Absolutely. Our bios are crafted to work great on both Instagram and WhatsApp.",
                },
                {
                  q: "Does it support Hindi?",
                  a: "Yes! Switch to Hindi in the language dropdown to get Hinglish-style bios.",
                },
                {
                  q: "Can I save my favorite bios?",
                  a: "Yes, hit the heart icon on any bio to save it to your Favorites section.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="glass-card-light p-5"
                  data-ocid="faqs.card"
                >
                  <p className="font-semibold faq-q text-sm mb-2">{q}</p>
                  <p className="faq-a text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 footer-border border-t py-8 px-4 text-center">
        <p className="footer-text text-sm">
          © {new Date().getFullYear()} Shubh. Built with{" "}
          <span className="text-pink-400">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
