import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="site-shell">
      <main>
        <section className="section legal-section" id="a-propos">
          <div className="container legal-content">
            <span className="eyebrow">DEDIMADE / À PROPOS</span>
            <h1>Qui est DEDIMADE ?</h1>
            <p>
              DEDIMADE est une équipe de développeurs spécialisés dans le trading algorithmique. Nous concevons des robots de trading (Expert Advisors), des indicateurs personnalisés et des dashboards sur mesure pour MetaTrader 4, MetaTrader 5, TradingView (Pine Script), ainsi que des robots de trading crypto pour des plateformes comme Coinbase, Binance ou Bybit.
            </p>
            <p>
              Notre mission est simple : transformer une idée ou une stratégie de trading en un outil automatisé fiable, fidèle à la logique définie par le client, avec une optimisation poussée et une assistance après la livraison.
            </p>
            <h2>Notre équipe</h2>
            <p>
              L'équipe est menée par <strong>Dedi David</strong>, programmeur MQL4/MQL5/Pine Script/Python et manager général, autodidacte en programmation et en trading algorithmique, diplômé en E-commerce et Marketing Digital. Il est entouré de <strong>Silué Samuel</strong>, ingénieur logiciel et développeur web, diplômé en génie logiciel, développement web et big data, ainsi que de <strong>Jonathan Levrien</strong>, trader professionnel et consultant en stratégie de trading. Au-delà de ce noyau, DEDIMADE s'appuie sur plus d'une trentaine de collaborateurs à travers le monde pour mener à bien les projets clients.
            </p>
            <h2>Nos domaines d'intervention</h2>
            <ul>
              <li>Création et modification de robots de trading MT4 / MT5 / TradingView</li>
              <li>Création et modification d'indicateurs et de dashboards personnalisés</li>
              <li>Création et modification de robots de trading crypto (applications web)</li>
            </ul>
            <p>
              Les avis de nos clients sont consultables publiquement sur notre profil ComeUp, sans sélection ni reformulation de notre part.
            </p>
            <Link className="ghost-button" href="/#pricing">Voir nos tarifs <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
