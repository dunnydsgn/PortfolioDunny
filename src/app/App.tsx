import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import svgPaths from "@/imports/Home-2/svg-fhyirnhqjt";

// ── Image imports (Home-2) ─────────────────────────────────────────────────────
import imgFooterLogo   from "@/imports/Home-2/f54ac1fc19bb08d07586a1d50537950f5dcd3093.png";
import imgNoise        from "@/imports/Home-2/3365021da70d4555ce147b5cabc4c900f7308661.png";
import imgTemplatePPT  from "@/imports/Home-2/c01e9835e1346270c53ef33ad50629509c571ba4.png";
import imgBrechoPeachy from "@/imports/Home-2/837b9f4a81cb65d419e4c84cedf0249795d377e6.png";
import imgApresentacao from "@/imports/Home-2/80bf0a74fff4ee33fbada16a96ca3a143e8587c4.png";
import imgCaderno      from "@/imports/Home-2/b4055263a19758818c98b2cbf005f5bffd13e96a.png";
import imgCartas       from "@/imports/Home-2/27249605b31dcf429649225e3b760324634557b2.png";
import imgLyricsBook   from "@/imports/Home-2/ccd6395189d51c0a860c51547ab2699b80564e64.png";
import imgEbacPods     from "@/imports/Home-2/9529ad254696b21d7e30cd7c6c9524bb04264d4c.png";
import imgSupersticao  from "@/imports/Home-2/bf33788c08930f5ac1546c279ae62cdf90b6f894.png";
import imgPptPalestra  from "@/imports/Home-2/0526f9e252f9e47ff16da7cf42e0b2921e262c1e.png";
import imgBackdrop     from "@/imports/Home-2/dce4136f38bceed7aef66f551ebfb3e9bf370b15.png";
import imgHeroBg       from "@/imports/Home-2/b8dc61aff71dcf861c9a43a0a5bb39ebc529476d.png";
import imgHeaderLogo   from "@/imports/Home-2/530ba864da046f1c49ea097b67753c784ff1c2ca.png";

// ── Animation variants ─────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

const staggerContainer = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ── Types ──────────────────────────────────────────────────────────────────────
type FilterKey    = "creative" | "corporate";
type ActiveFilter = "todos" | FilterKey;

interface Project {
  category:  string;
  title:     string;
  tags:      string[];
  description: string;
  image:     string;
  href?:     string;
  filterKey: FilterKey;
}

// ── Shared primitives ──────────────────────────────────────────────────────────
function NavArrow() {
  return (
    <svg fill="none" height="9.357" viewBox="0 0 9.357 9.357" width="9.357"
      className="shrink-0 mt-0.5" aria-hidden>
      <path d={svgPaths.p2703180} stroke="#E87EA2"
        strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

function ButtonArrow() {
  return (
    <svg fill="none" height="11.357" viewBox="0 0 11.357 11.357" width="11.357" aria-hidden>
      <path d={svgPaths.p264a0c80} stroke="#E9DEFF"
        strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="relative inline-flex items-center px-3 py-1.5 rounded-full shrink-0">
      <span className="absolute inset-0 border border-[#e9deff] rounded-full pointer-events-none" />
      <span className="text-[#e9deff] text-[13px] tracking-[-0.01em] whitespace-nowrap font-normal">
        {label}
      </span>
    </span>
  );
}

function VejaMaisButton({ href }: { href: string }) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      className="relative inline-flex items-center gap-2.5 bg-[#40184c] px-3.5 py-2.5 rounded-full hover:brightness-110 transition-all duration-200 self-start"
      style={{ boxShadow: "0 0 9.5px rgba(162,45,247,0.12), 0 0 23px rgba(162,45,247,0.1), 0 0 6.5px rgba(162,45,247,0.1)" }}
    >
      <span className="absolute inset-0 border border-[#8338ec] rounded-full pointer-events-none" />
      <span className="text-[#e9deff] text-sm tracking-[-0.01em] uppercase font-medium">Veja mais</span>
      <ButtonArrow />
    </a>
  );
}

function CardGlow({ cyan = false }: { cyan?: boolean }) {
  const c1 = cyan ? "rgba(165,239,255,1)"   : "rgba(210,165,255,1)";
  const c2 = cyan ? "rgba(110,191,244,0.22)" : "rgba(177,110,244,0.22)";
  return (
    <span aria-hidden
      className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden">
      <span className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 55% 70% at 15% 20%, ${c1} 0%, ${c2} 77%, transparent 100%)`,
        opacity: 0.2,
      }} />
      <span className="absolute inset-0 mix-blend-overlay" style={{
        backgroundImage: `url("${imgNoise}")`,
        backgroundSize: "925px 462px",
        backgroundPosition: "top left",
        opacity: 0.08,
      }} />
    </span>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/dailiveira/" },
  { label: "Behance",   href: "https://www.behance.net/dailiveira" },
  { label: "Whatsapp",  href: "https://wa.me/message/NDCJUMKWIGRDD1" },
  { label: "E-mail",    href: "mailto:dunnydsgn@gmail.com" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 px-4 md:px-10">
      <div className="relative bg-[#270f2e] border-b-2 border-l-2 border-r-2 border-[#98f9ff] rounded-bl-[35px] rounded-br-[35px]">
        <div className="flex items-center justify-between px-6 md:px-10 h-[80px] md:h-[100px]">
          <div className="h-9 md:h-[55px] w-auto">
            <ImageWithFallback src={imgHeaderLogo} alt="Dunny"
              className="h-full w-auto object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <span className="text-[#f3f1eb] text-sm tracking-[0.1em] uppercase font-normal">
                  {link.label}
                </span>
                <NavArrow />
              </a>
            ))}
          </nav>

          <button className="md:hidden text-[#f3f1eb] p-1 -mr-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden flex flex-col gap-5 px-8 pb-8 border-t border-[#98f9ff]/25 pt-5">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}>
                <span className="text-[#f3f1eb] text-sm tracking-[0.1em] uppercase font-normal">
                  {link.label}
                </span>
                <NavArrow />
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ── Hero + About (connected block) ─────────────────────────────────────────────
function HeroAndAbout() {
  return (
    <section className="mx-4 md:mx-10 mt-3">
      {/* Hero panel */}
      <div className="relative rounded-tl-[35px] rounded-tr-[35px] overflow-hidden border-t-2 border-l-2 border-r-2 border-[#98f9ff] min-h-[420px] md:min-h-[535px]">
        <ImageWithFallback src={imgHeroBg} alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <span aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#270f2e]/85 via-[#270f2e]/50 to-transparent md:from-[#270f2e]/75 md:via-[#270f2e]/30 md:to-transparent" />

        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-14 md:py-16 min-h-[420px] md:min-h-[535px] max-w-[640px]">
          <motion.div variants={fadeUp} className="mb-5 md:mb-6">
            <p className="text-[#e87ea2] text-2xl md:text-3xl leading-tight font-normal">
              Oi! Meu nome é
            </p>
            <h1 className="text-[#e87ea2] font-bold leading-none tracking-tight text-[clamp(60px,9.5vw,128px)]">
              Daiane
            </h1>
          </motion.div>

          <motion.p variants={fadeUp}
            className="text-[#f3f1eb] text-base md:text-xl leading-relaxed font-normal mb-8 max-w-[480px]">
            Bacharelada em Design e especialista em Design Gráfico e Digital,
            apaixonada por transformar ideias em soluções visuais com estética e propósito.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a href="https://wa.me/message/NDCJUMKWIGRDD1" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#6717a4] text-white px-6 py-2.5 rounded-full text-base tracking-[0.1em] uppercase font-normal hover:brightness-110 transition-all duration-200">
              Entre em contato
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* About panel */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative overflow-hidden border-l-2 border-r-2 border-b-2 border-[#eabfff]/55 rounded-bl-[34px] rounded-br-[34px] px-6 md:px-16 py-10 md:py-14">
        <CardGlow cyan />

        <div className="absolute top-5 right-6 flex gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-[10px] h-[10px] rounded-full bg-white/50" />
          ))}
        </div>

        <div className="relative z-10">
          <motion.h2 variants={fadeUp}
            className="text-[#e87ea2] font-normal text-4xl md:text-5xl lg:text-[64px] leading-tight mb-8">
            Sobre mim
          </motion.h2>

          <motion.div variants={staggerContainer}
            className="text-white text-base md:text-lg lg:text-xl leading-[1.6] font-normal space-y-5 max-w-[1100px]">
            {[
              "Especialista em Design Gráfico e Digital, transformo ideias complexas em soluções visuais que unem estética, estratégia e propósito. Minha atuação transita com facilidade entre o design visual corporativo, o ecossistema digital e o design de experiência (UI/UX).",
              "Ao longo da minha trajetória, colaborei com gigantes do mercado como Itaú, Natura, Unilever, Suzano e WEG, desenvolvendo narrativas visuais de alto impacto, infográficos e apresentações estratégicas. Também possuo forte atuação no mercado de educação corporativa (EAD/LMS), onde aplico o design para transformar conteúdos técnicos em experiências de aprendizado fluidas e eficazes.",
              "Minha metodologia une o rigor técnico à inovação: combino o domínio do ecossistema Adobe e Figma com o uso estratégico de Inteligência Artificial generativa para otimizar fluxos de trabalho e acelerar entregas criativas.",
            ].map((para, i) => (
              <motion.p key={i} variants={fadeUp}>{para}</motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Filter tabs ────────────────────────────────────────────────────────────────
const TABS: { id: ActiveFilter; label: string }[] = [
  { id: "todos",     label: "Todos" },
  { id: "creative",  label: "Creative Lab" },
  { id: "corporate", label: "Corporate" },
];

const ACTIVE_TAB_BG =
  "radial-gradient(ellipse 110% 110% at 10% 20%, rgba(152,249,255,0.85) 0%, transparent 55%), " +
  "radial-gradient(ellipse 110% 110% at 90% 80%, rgba(234,191,255,1) 0%, rgba(185,115,219,0.55) 42%, transparent 80%)";

function FilterTabs({
  active, onChange,
}: {
  active: ActiveFilter;
  onChange: (f: ActiveFilter) => void;
}) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="flex justify-center px-4 md:px-10"
    >
      {/* Outer pill — purple glow + noise + thin border */}
      <div className="relative flex items-center rounded-[52px] p-[4px] gap-0">
        <span aria-hidden className="absolute inset-0 rounded-[52px] pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 70% at 15% 20%, rgba(210,165,255,0.2) 0%, rgba(177,110,244,0.05) 77%, transparent 100%)",
        }} />
        <span aria-hidden className="absolute inset-0 mix-blend-overlay rounded-[52px] pointer-events-none" style={{
          backgroundImage: `url("${imgNoise}")`,
          backgroundSize: "925px 462px",
          opacity: 0.08,
        }} />
        <span className="absolute inset-0 border border-[#eabfff]/40 rounded-[52px] pointer-events-none" />

        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex items-center justify-center h-[54px] md:h-[56px] px-6 md:px-8 rounded-[48px] cursor-pointer transition-colors duration-300 min-w-[100px] md:min-w-[150px]"
              aria-pressed={isActive}
            >
              {/* Active highlight pill — fades in/out smoothly */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-[48px] transition-opacity duration-300"
                style={{
                  background: ACTIVE_TAB_BG,
                  opacity: isActive ? 1 : 0,
                }}
              />
              <span className={`relative z-10 text-lg md:text-2xl font-normal transition-colors duration-300 ${
                isActive ? "text-[#270f2e]" : "text-white"
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Project card ───────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative mx-4 md:mx-10 rounded-[34px] border border-[#eabfff]/30 overflow-hidden"
    >
      <CardGlow />

      <div className="relative z-10 flex flex-col md:flex-row min-h-[360px] md:min-h-[533px]">

        {/* Text column */}
        <div className="flex flex-col justify-center gap-10 md:gap-[60px] px-7 py-10 md:pl-[55px] lg:pl-[75px] md:pr-0 md:py-[58px] w-full md:w-[44%] lg:w-[40%] shrink-0">
          <motion.div variants={staggerContainer} className="flex flex-col gap-4 md:gap-[21px]">
            <motion.p variants={fadeIn}
              className="text-[#e9deff] text-[13px] uppercase tracking-wide font-normal">
              {project.category}
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-[#e87ea2] font-bold leading-none tracking-tight text-[clamp(32px,4.5vw,64px)]">
              {project.title}
            </motion.h2>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
              {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} className="flex flex-col gap-8">
            <motion.p variants={fadeUp}
              className="text-[#e9deff] text-base md:text-[18px] lg:text-xl leading-[1.6] font-normal">
              {project.description}
            </motion.p>
            {project.href && (
              <motion.div variants={fadeIn}>
                <VejaMaisButton href={project.href} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Image column — self-stretch so flex-1 fills height between padding */}
        <div className="self-stretch flex flex-col items-center w-full md:flex-1 px-6 pb-8 md:px-8 lg:px-12 md:py-[46px]">
          <motion.div variants={fadeIn}
            className="relative w-full max-w-[630px] rounded-[30px] overflow-hidden h-[240px] md:flex-1">
            <ImageWithFallback src={project.image} alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <motion.footer variants={fadeIn} initial="hidden" whileInView="visible"
      viewport={{ once: true }} className="mt-4 md:mt-5">
      <div className="bg-[#6717a4] rounded-tl-[34px] rounded-tr-[34px] flex flex-col items-center py-10 md:py-16 gap-8">
        <div className="h-16 md:h-24 w-auto">
          <ImageWithFallback src={imgFooterLogo} alt="Dunny"
            className="h-full w-auto object-contain" />
        </div>
        <div className="flex items-center gap-5">
          <a href="mailto:dunnydsgn@gmail.com" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity" aria-label="Email">
            <svg fill="none" height="37" viewBox="0 0 37 37" width="37" aria-hidden>
              <path d={svgPaths.p5d61200} fill="#F3F1EB" />
            </svg>
          </a>
          <a href="https://wa.me/message/NDCJUMKWIGRDD1" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity" aria-label="WhatsApp">
            <svg fill="none" height="37" viewBox="0 0 30.8333 33.6299" width="37" aria-hidden>
              <path d={svgPaths.p1b86940} fill="#F3F1EB" />
              <path d={svgPaths.p17df2d40} fill="#F3F1EB" />
            </svg>
          </a>
          <a href="https://instagram.com/dunnydsgn" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity" aria-label="Instagram">
            <svg fill="none" height="37" viewBox="0 0 37 37" width="37" aria-hidden>
              <path d={svgPaths.p1918d600} fill="#F3F1EB" />
            </svg>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

// ── Projects data ──────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    category:    "HUMANARE | RIW 2026",
    title:       "BACKDROP",
    tags:        ["Design Gráfico"],
    description: "Design de backdrop e comunicação visual para o Palco Humanare no Rio Innovation Week 2026, alinhando presença de marca e cenografia para grandes eventos.",
    image:       imgBackdrop,
    filterKey:   "corporate",
  },
  {
    category:    "TEDxFIA Business School",
    title:       "PPT PALESTRA",
    tags:        ["Design Gráfico"],
    description: "Identidade visual e design de slides para apresentação em palco no formato TEDx. Foco em storytelling visual, sintetizando ideias complexas com minimalismo e clareza.",
    image:       imgPptPalestra,
    filterKey:   "creative",
  },
  {
    category:    "PROJETO ACADÊMICO",
    title:       "SUPERSTIÇÃO",
    tags:        ["Design Gráfico", "Design Digital", "Intervenção Urbana"],
    description: "Projeto de intervenção urbana e design digital que explora a cultura brasileira através das superstições, unindo a estética de lambe-lambes a uma plataforma interativa.",
    image:       imgSupersticao,
    href:        "https://www.behance.net/gallery/245775183/Supersticao-O-Signo-da-Crenca",
    filterKey:   "creative",
  },
  {
    category:    "CASE STUDY",
    title:       "EBAC PODS",
    tags:        ["UX/UI Design", "Mobile App", "EdTech"],
    description: "Aplicativo de áudio focado em podcasts educacionais, desenhado para transformar a escuta passiva em uma experiência de aprendizado ativa, fluida e organizada.",
    image:       imgEbacPods,
    filterKey:   "creative",
  },
  {
    category:    "PROJETO ACADÊMICO",
    title:       "LYRICS BOOK",
    tags:        ["Design Gráfico", "Editorial", "Diagramação"],
    description: "Projeto de design editorial e experimentação tipográfica que traduz a poética e o universo visual das músicas do Jão para o formato impresso.",
    image:       imgLyricsBook,
    href:        "https://www.behance.net/gallery/234621597/Lyrics-Book-Jao",
    filterKey:   "creative",
  },
  {
    category:    "PROPOSTA COMERCIAL",
    title:       "TEMPLATE PPT",
    tags:        ["Design Gráfico", "Apresentação", "Powerpoint"],
    description: "Layout estratégico e profissional criado para padronizar o envio de orçamentos. Unificação da identidade visual da marca com um design claro, elegante e de alto impacto de conversão.",
    image:       imgTemplatePPT,
    href:        "https://www.behance.net/gallery/181607941/Apresentacao-Comercial-Powerpoint",
    filterKey:   "creative",
  },
  {
    category:    "IDENTIDADE VISUAL",
    title:       "BRECHÓ PEACHY",
    tags:        ["Design Gráfico", "Identidade Visual", "Design Digital"],
    description: "Projeto de identidade visual desenvolvido para posicionar a marca no universo da moda consciente.",
    image:       imgBrechoPeachy,
    href:        "https://www.behance.net/gallery/181458089/Brecho-Peachy-Identidade-Visual",
    filterKey:   "creative",
  },
  {
    category:    "TREINAMENTO CORPORATIVO",
    title:       "APRESENTAÇÃO",
    tags:        ["Design Gráfico", "Apresentação", "Powerpoint"],
    description: "Design de apresentação desenvolvido para o programa de formação de lideranças pretas da Natura. Projeto construído com sensibilidade estética e cuidado visual.",
    image:       imgApresentacao,
    filterKey:   "corporate",
  },
  {
    category:    "TREINAMENTO CORPORATIVO",
    title:       "CADERNO",
    tags:        ["Design Gráfico", "Design Editorial", "Impressão & Digital"],
    description: "Design editorial para material de treinamento corporativo, unindo ferramentas de gestão e páginas interativas de preenchimento.",
    image:       imgCaderno,
    filterKey:   "corporate",
  },
  {
    category:    "TREINAMENTO CORPORATIVO",
    title:       "CARTAS DE BARALHO",
    tags:        ["Design Gráfico", "Gamificação", "Impressão"],
    description: "Design de cartas informativas e dinâmicas para facilitação de treinamentos corporativos. Síntese de conteúdo e identidade visual estratégica para apoiar o aprendizado em equipe.",
    image:       imgCartas,
    filterKey:   "corporate",
  },
];

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("todos");

  const visible = activeFilter === "todos"
    ? projects
    : projects.filter((p) => p.filterKey === activeFilter);

  return (
    <div className="bg-[#270f2e] min-h-screen font-['Montserrat',sans-serif] antialiased">
      <Header />

      <main className="flex flex-col gap-4 md:gap-5">
        <HeroAndAbout />

        {/* Filter tabs */}
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        {/* Projects */}
        <section className="flex flex-col gap-4 md:gap-5" aria-label="Projetos">
          {visible.map((project) => (
            // Key includes filter so cards re-animate when filter changes
            <ProjectCard
              key={activeFilter + ":" + project.title}
              project={project}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
