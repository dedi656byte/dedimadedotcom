import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSendContactMessage } from "@workspace/api-client-react";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CandlestickChart,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Menu,
  Send,
  X,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();

const services = [
  {
    number: "01 / AUTOMATION",
    title: "Robot metatrader 4/5 et tradingview",
    description:
      "Dans ce service nous vous proposons de créer votre robot sur mésure pour les plateformes Metatrader 4/5 et tradingview.",
    icon: Bot,
    label: "Expert advisors · Pine Script",
  },
  {
    number: "02 / VISUALS",
    title: "Indicateur et dashboard metatrader 4/5 et tradingview",
    description:
      "Dans ce service nous vous proposons de créer votre Indicateur personnalisé ou votre dashboard pour les plateformes Metatrader 4/5 et tradingview.",
    icon: BarChart3,
    label: "Signal design · Data",
  },
  {
    number: "03 / CRYPTO",
    title: "Robot de trading crypto",
    description:
      "Dans ce service nous vous proposons de créer votre robot sur mésure pour les plateformes nécessitant une application web, des plateformes comme Coinbase, Binance, Bybit etc... ",
    icon: CandlestickChart,
    label: "Coinbase · Binance · Bybit",
  },
];

const team = [
  {
    index: "TEAM / 01",
    name: "Dedi David",
    firstName: "David",
    role: "Programmeur MQL4, MQL5, Pinescript, Python, Community Manager et Manager General.",
    bio: "Autodidacte en programmation, en trading algorithmique et diplomé en E-commerce et Marketing Digital, Initiateur et manager de l’équipe.",
    initial: "DD",
    tag: "MQL4 / MQL5 / PINE",
    photo: "/images/dedi_david.png",
  },
  {
    index: "TEAM / 02",
    name: "Silué Samuel",
    firstName: "Samuel",
    role: "Ingénieur Logiciel et developpeur web.",
    bio: "Est Diplomé en Génie Logiciel, développement web et Big data, pur produit d’une grande école d’ingénieur.",
    initial: "SS",
    tag: "WEB / BIG DATA",
    photo: "/images/silu_samuel.png",
  },
  {
    index: "TEAM / 03",
    name: "Jonathan Levrien",
    firstName: "Jonathan",
    role: "Trader Professionel.",
    bio: "Est un client qui est devenue menbre de l’équipe, en tant que consultant en stratégie de trading.",
    initial: "JL",
    tag: "STRATEGY / TRADER",
    photo: "/images/jonathan_levrien.png",
  },
];

const pricing = [
  {
    short: "Robot de trading MT4/MT5 & TV",
    title: "Robot de trading MT4/MT5 & TV",
    description:
      "Une exécution fidèle à votre stratégie sur les environnements de trading les plus utilisés.",
    promise: [
      "fidèle à votre stratégie.",
      "avec une optimisation poussée.",
      "une assistance complète après la conception du robot.",
    ],
  },
  {
    short: "Indicateur & Dashboard personnalisé",
    title: "Indicateur & Dashboard personnalisé",
    description:
      "Une lecture claire de vos données, pensée pour vos descriptions et votre manière de décider.",
    promise: [
      "fidèle à vos descriptions.",
      "avec une optimisation poussée.",
      "une assistance complète après la réalisation de votre projet.",
    ],
  },
  {
    short: "Robot crypto",
    title: "Robot crypto",
    description:
      "Une automatisation sur mesure pour les plateformes nécessitant une application web.",
    promise: [
      "fidèle à votre stratégie.",
      "avec une optimisation poussée.",
      "une assistance complète après la conception du robot.",
    ],
  },
];

const projectOptions = [
  "Création de Robot MT4",
  "Création de Robot MT5",
  "Création de Robot Tradingview",
  "Création d'indicateur MT4",
  "Création d'indicateur MT5",
  "Création d'indicateur Tradingview",
  "Modification de robot MT4",
  "Modification de robot MT5",
  "Modification de robot Tradingview",
  "Modification d'indicateur MT4",
  "Modification d'indicateur MT5",
  "Modification d'indicateur Tradingview",
  "Création de Robot de Trading de crypto",
  "Modification de Robot de Trading de crypto",
];

const testimonialImages = [
  "/images/avis_client_1.png",
  "/images/avis_client_2.png",
  "/images/avis_client_3.png",
  "/images/avis_client_4.png",
  "/images/avis_client_5.png",
  "/images/avis_client_6.png",
];

function setMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activePrice, setActivePrice] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const sendContactMessage = useSendContactMessage();

  useEffect(() => {
    document.title = "DEDIMADE — Trading algorithmique sur mesure";
    document.documentElement.lang = "fr";
    setMeta(
      "description",
      "Créez des robots de trading, indicateurs et dashboards sur mesure pour MetaTrader 4/5, TradingView et crypto. Automatisez votre stratégie avec DEDIMADE.",
    );
    setMeta(
      "keywords",
      "bot, trading, robot, tradingview, metatrader, indicateur, automatiser, stratégie, trading bot",
    );
    setMeta("author", "DEDIMADE");
    setProperty("og:title", "DEDIMADE — Trading algorithmique sur mesure");
    setProperty(
      "og:description",
      "Créez des robots de trading, indicateurs et dashboards sur mesure pour MetaTrader 4/5, TradingView et crypto. Automatisez votre stratégie avec DEDIMADE.",
    );
    setProperty("og:type", "website");
    setProperty("og:url", window.location.href);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  useEffect(() => {
    if (testimonialPaused) return;
    const timer = window.setInterval(() => {
      setTestimonial((current) => (current + 1) % testimonialImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [testimonialPaused]);

  const openModal = () => {
    setSubmitted(false);
    setEmail("");
    setProjectType("");
    setMessage("");
    setFormError("");
    setModalOpen(true);
    setMobileOpen(false);
  };

  const closeModal = () => setModalOpen(false);

  const navigateTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    sendContactMessage.mutate(
      { data: { email, projectType, message } },
      {
        onSuccess: () => setSubmitted(true),
        onError: () =>
          setFormError(
            "Le message n’a pas pu être envoyé. Réessayez dans quelques instants.",
          ),
      },
    );
  };

  return (
    <div className="site-shell">
      <header
        className={`site-header ${headerScrolled ? "scrolled" : ""}`}
        data-testid="site-header"
      >
        <div className="container nav-row">
          <button
            className="brand"
            onClick={() => navigateTo("intro")}
            aria-label="Retour à l'accueil"
            data-testid="button-brand"
          >
            <span className="brand-mark">
              <img src="/images/logo_dedimade.jpg" alt="Logo DEDIMADE" />
            </span>
            <span>
              <span className="brand-text">DEDIMADE</span>
              <span className="brand-sub">ALGORITHMIC STUDIO</span>
            </span>
          </button>
          <nav className="desktop-nav" aria-label="Navigation principale">
            <a href="#intro" data-testid="link-accueil">
              Acceuil
            </a>
            <a href="#services" data-testid="link-services">
              Nos Services
            </a>
            <a href="#team" data-testid="link-equipe">
              Notre Equipe
            </a>
            <a href="#pricing" data-testid="link-tarifs">
              Nos Tarifs
            </a>
            <button
              className="nav-cta"
              onClick={openModal}
              data-testid="button-open-contact"
            >
              Parlez nous de votre projet <ArrowUpRight size={15} />
            </button>
          </nav>
          <button
            className="nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <a
          href="#intro"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-link-accueil"
        >
          Acceuil
        </a>
        <a
          href="#services"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-link-services"
        >
          Nos Services
        </a>
        <a
          href="#team"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-link-equipe"
        >
          Notre Equipe
        </a>
        <a
          href="#pricing"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-link-tarifs"
        >
          Nos Tarifs
        </a>
        <button
          className="nav-cta"
          onClick={openModal}
          data-testid="mobile-button-contact"
        >
          Parlez nous de votre projet <ArrowUpRight size={15} />
        </button>
      </div>

      <main>
        <section className="hero" id="intro">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">DEDIMADE / SIGNAL TO SYSTEM</span>
              <h1>
                Vos idées.
                <br />
                <em>Notre code.</em>
                <br />
                Votre edge.
              </h1>
              <p className="hero-copy">
                Nous sommes une équipe de développeurs experts en trading
                algorithmique, dont la mission est de transformer vos idées en
                robots rentables, indicateurs précis et tableaux de bord
                efficaces. Fini les opportunités manquées et les tâches
                répétitives : grâce à nos services, prenez le contrôle, nous
                vous accompagnons à chaque étape. Confiez-nous votre vision,
                nous nous occupons de tout.
              </p>
              <div className="hero-actions">
                <button
                  className="lime-button"
                  onClick={openModal}
                  data-testid="button-hero-contact"
                >
                  Parlez nous de votre projet <ArrowUpRight size={16} />
                </button>
                <a
                  className="ghost-button"
                  href="#services"
                  data-testid="link-hero-services"
                >
                  Voir nos services <ChevronRight size={16} />
                </a>
              </div>
              <div className="hero-note">
                <span className="signal-dot" />{" "}
                <span>STRATEGIES EN CONSTRUCTION / MARCHÉS EN MOUVEMENT</span>
              </div>
            </div>
            <div
              className="terminal-card"
              aria-label="Illustration abstraite d'un terminal de marché"
              data-testid="display-market-terminal"
            >
              <div className="terminal-top">
                <div className="terminal-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>DEDIMade_core / live</span>
                <span>01—04</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-label">
                  Strategy performance / EURUSD
                </div>
                <div className="terminal-value">
                  +24.8% <small>↑ signal validé</small>
                </div>
                <div className="chart-wrap">
                  <svg
                    viewBox="0 0 520 170"
                    role="img"
                    aria-label="Courbe abstraite de performance"
                  >
                    <defs>
                      <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#c6f36b" />
                        <stop offset="1" stopColor="#c6f36b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      className="chart-area"
                      d="M0 145 L0 131 L40 138 L80 112 L120 124 L160 78 L202 96 L245 70 L288 91 L330 53 L370 78 L414 34 L455 52 L493 20 L520 27 L520 170 L0 170Z"
                    />
                    <path
                      className="chart-line"
                      d="M0 131 L40 138 L80 112 L120 124 L160 78 L202 96 L245 70 L288 91 L330 53 L370 78 L414 34 L455 52 L493 20 L520 27"
                    />
                    <circle cx="493" cy="20" r="5" fill="#f0a44a" />
                  </svg>
                </div>
                <div className="terminal-bottom">
                  <span>
                    drawdown <strong>-3.2%</strong>
                  </span>
                  <span>
                    robustness <strong>high</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label="Identité DEDIMADE">
          <div className="container ticker-track">
            <span>MT4 / MT5</span>
            <span className="ticker-sep">—</span>
            <span>TRADINGVIEW</span>
            <span className="ticker-sep">—</span>
            <span>PYTHON</span>
            <span className="ticker-sep">—</span>
            <span>COINBASE</span>
            <span className="ticker-sep">—</span>
            <b>STRATEGY → ROBOT</b>
          </div>
        </div>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="services-head">
              <div className="section-heading">
                <span className="eyebrow">01 / CAPABILITIES</span>
                <h2>Nos Services</h2>
                <p>
                  Optimisez vos performances de trading grâce à nos services de
                  création et de modification de robots, d’indicateurs
                  personnalisés et de tableaux de bord !
                </p>
              </div>
              <a
                className="ghost-button"
                href="#pricing"
                data-testid="link-services-pricing"
              >
                Découvrir les tarifs <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    className="service-card"
                    key={service.number}
                    data-testid={`card-service-${index}`}
                  >
                    <div>
                      <div className="service-number">{service.number}</div>
                      <div className="service-icon">
                        <Icon size={22} />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="service-link">
                      <span>{service.label}</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section team-section" id="team">
          <div className="container team-layout">
            <div className="team-intro">
              <div className="section-heading">
                <span className="eyebrow">02 / THE PEOPLE</span>
                <h2>Notre équipe</h2>
                <p>Juste la partie visible de l’iceberg !</p>
              </div>
              <div className="team-aside">
                <strong>30+</strong> Et bien d'autre menbres, au total nous
                sommes plus d'une trentaine à travers le monde à travailler sur
                vos projets.
              </div>
            </div>
            <div>
              <div className="team-grid">
                {team.map((person, index) => (
                  <article
                    className="person"
                    key={person.name}
                    data-testid={`card-team-${index}`}
                  >
                    <div className="person-visual">
                      <img
                        className="person-photo"
                        src={person.photo}
                        alt={person.name}
                        loading="lazy"
                      />
                      <div
                        className="person-visual-overlay"
                        aria-hidden="true"
                      />
                      <span className="person-index">{person.index}</span>
                      <span className="person-role">{person.tag}</span>
                    </div>
                    <div className="person-copy">
                      <h3>{person.name}</h3>
                      <p>{person.bio}</p>
                      <p
                        style={{
                          marginTop: 12,
                          color: "#101820",
                          fontWeight: 600,
                        }}
                      >
                        {person.role}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="world-note">
                Et bien d'autre menbres, au total nous sommes{" "}
                <strong>plus d'une trentaine à travers le monde</strong> à
                travailler sur vos projets.{" "}
                <span className="world-ring">
                  <Globe2 size={15} />
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="container">
            <div className="pricing-head">
              <div className="section-heading">
                <span className="eyebrow">03 / INVESTMENT</span>
                <h2>Nos Tarifs</h2>
                <p>Les tarifs dépendent des exigeances de vos projets.</p>
              </div>
              <a
                className="ghost-button"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  openModal();
                }}
                data-testid="link-pricing-contact"
              >
                Parlez nous de votre projet <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="pricing-grid">
              <div
                className="pricing-list"
                role="tablist"
                aria-label="Offres DEDIMADE"
              >
                {pricing.map((offer, index) => (
                  <button
                    className={`price-tab ${activePrice === index ? "active" : ""}`}
                    key={offer.short}
                    onClick={() => setActivePrice(index)}
                    role="tab"
                    aria-selected={activePrice === index}
                    data-testid={`button-price-${index}`}
                  >
                    <span className="price-tab-index">0{index + 1}</span>
                    <span className="price-tab-name">{offer.short}</span>
                    <ArrowUpRight className="price-tab-arrow" size={17} />
                  </button>
                ))}
              </div>
              <div
                className="price-detail"
                role="tabpanel"
                data-testid="display-price-detail"
              >
                <span className="price-detail-label">
                  OFFRE 0{activePrice + 1} / À PARTIR DE
                </span>
                <h3>{pricing[activePrice].title}</h3>
                <p className="price-detail-sub">
                  {pricing[activePrice].description}
                </p>
                <div className="price-amounts">
                  <span className="price-amount">
                    Création à partir de<b>100 €</b>
                  </span>
                  <span className="price-amount">
                    Modification à partir de<b>20 €</b>
                  </span>
                </div>
                <div className="promise">
                  {pricing[activePrice].promise.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <button
                  className="lime-button price-cta"
                  onClick={openModal}
                  data-testid="button-price-contact"
                >
                  Parlez nous de votre projet <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials" aria-labelledby="testimonials-title">
          <div className="container testimonial-layout">
            <div>
              <span className="eyebrow">04 / OUT IN THE WORLD</span>
              <h2 id="testimonials-title">Témoignages clients</h2>
              <p>
                Des retours clients sont disponibles sur notre profil public
                ComeUp. Consultez-les directement.
              </p>
            </div>
            <div
              className="testimonial-card"
              data-testid="display-testimonial"
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => setTestimonialPaused(false)}
            >
              <div className="testimonial-meta">
                <span>ComeUp / DEDIMADE</span>
                <div className="testimonial-controls">
                  <button
                    className="circle-control"
                    onClick={() =>
                      setTestimonial(
                        (testimonial - 1 + testimonialImages.length) %
                          testimonialImages.length,
                      )
                    }
                    aria-label="Témoignage précédent"
                    data-testid="button-testimonial-prev"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    className="circle-control"
                    onClick={() =>
                      setTestimonial(
                        (testimonial + 1) % testimonialImages.length,
                      )
                    }
                    aria-label="Témoignage suivant"
                    data-testid="button-testimonial-next"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
              <div className="testimonial-body">
                <img
                  className="testimonial-image"
                  src={testimonialImages[testimonial]}
                  alt={`Avis client DEDIMADE ${testimonial + 1}`}
                  loading="lazy"
                />
              </div>
              <a
                className="testimonial-link"
                href="https://comeup.com/fr/@dedi-david"
                target="_blank"
                rel="noreferrer"
                data-testid="link-testimonials"
              >
                cliquez ici pour voire tous les témoignages{" "}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-cta">
            <h2>Une stratégie à mettre en mouvement ?</h2>
            <button
              className="lime-button"
              onClick={openModal}
              data-testid="button-footer-contact"
            >
              Parlez nous de votre projet <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="footer-bottom">
            <p>
              © 2025 All Rights Reserved. Powered by{" "}
              <span className="powered">DEDIMADE</span>
            </p>
            <ul className="socials">
              <li>
                <a href="/a-propos" data-testid="link-about">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" data-testid="link-contact-page">
                  Contact
                </a>
              </li>
              <li>
                <a href="/confidentialite" data-testid="link-privacy">
                  Confidentialité
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/61566334743542/"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-facebook"
                >
                  Facebook <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/dedimade187641"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-x"
                >
                  X <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/user/CauliflowerOdd4048/"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-reddit"
                >
                  Reddit <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@dedimade827"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-youtube"
                >
                  YouTube <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {modalOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            tabIndex={-1}
            ref={dialogRef}
            data-testid="dialog-contact"
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Fermer la fenêtre"
              data-testid="button-close-contact"
            >
              <X size={18} />
            </button>
            {!submitted ? (
              <>
                <span className="eyebrow">CONTACT / START A CONVERSATION</span>
                <h2 id="contact-title">Parlez nous de votre projet</h2>
                <form className="form-stack" onSubmit={handleSubmit}>
                  <label className="form-label">
                    Votre Adresse Email
                    <input
                      className="form-input"
                      id="client_email"
                      name="client_email"
                      type="email"
                      placeholder="vous@exemple.fr"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      data-testid="input-email"
                    />
                  </label>
                  <label className="form-label">
                    Le Type de Votre Projet
                    <select
                      className="form-select"
                      name="projet_type"
                      value={projectType}
                      onChange={(event) => setProjectType(event.target.value)}
                      required
                      data-testid="select-project-type"
                    >
                      <option value="" disabled>
                        Le Type de Votre Projet
                      </option>
                      {projectOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-label">
                    Expliquez nous votre projet ici...
                    <textarea
                      className="form-textarea"
                      id="message"
                      name="message"
                      rows={7}
                      placeholder="Expliquez nous votre projet ici..."
                      required
                      maxLength={4070}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      data-testid="input-project-message"
                    />
                  </label>
                  <div className="form-help">
                    <span>
                      <strong>{4070 - message.length}</strong> caractères
                      restants
                    </span>
                    <span>Maximum 4070 caractères</span>
                  </div>
                  <p className="form-note">
                    <strong>
                      Seuls les caractères standards sont autorisés (pas
                      d’émojis, symboles spéciaux, etc.).
                    </strong>
                  </p>
                  {formError && (
                    <p className="form-error" role="alert">
                      {formError}
                    </p>
                  )}
                  <button
                    className="lime-button submit-button"
                    type="submit"
                    disabled={sendContactMessage.isPending}
                    data-testid="button-submit-contact"
                  >
                    {sendContactMessage.isPending
                      ? "Envoi en cours…"
                      : "Envoyer"}{" "}
                    <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div
                className="success-state"
                data-testid="status-contact-success"
              >
                <div>
                  <div className="success-mark">
                    <Check size={27} />
                  </div>
                  <h2 id="contact-title">Message reçu.</h2>
                  <p>
                    Nous avons recu votre message, nous vous repondrons dès que
                    possible !
                  </p>
                  <button
                    className="lime-button"
                    onClick={closeModal}
                    data-testid="button-success-close"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/a-propos" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/confidentialite" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
