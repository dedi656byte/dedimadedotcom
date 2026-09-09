import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="site-shell">
      <main>
        <section className="section legal-section" id="contact-page">
          <div className="container legal-content">
            <span className="eyebrow">DEDIMADE / CONTACT</span>
            <h1>Parlons de votre projet</h1>
            <p>
              La manière la plus rapide de nous contacter est d'utiliser le
              formulaire de projet accessible sur notre page d'accueil, via le
              bouton « Parlez nous de votre projet ». Vous y précisez votre
              adresse email, le type de projet concerné (création ou
              modification de robot MT4/MT5/TradingView, d'indicateur, ou de
              robot crypto) et une description de votre besoin. Nous répondons
              directement par email dès que possible.
            </p>
            <p>
              Vous pouvez aussi nous écrire directement à{" "}
              <a href="mailto:dedimade000@gmail.com">dedimade000@gmail.com</a>,
              ou nous suivre et échanger avec nous sur nos réseaux : Facebook,
              X, YouTube et Reddit, dont les liens figurent en pied de page de
              ce site. Nos réalisations et les retours de nos clients sont par
              ailleurs consultables publiquement sur notre profil ComeUp.
            </p>
            <p>
              Avant de nous écrire, vous pouvez consulter nos{" "}
              <Link href="/#services">services</Link> et nos{" "}
              <Link href="/#pricing">tarifs indicatifs</Link> pour préciser
              votre demande : cela nous permet de vous répondre plus rapidement
              avec une estimation adaptée à votre projet.
            </p>
            <Link className="lime-button" href="/#contact">
              Ouvrir le formulaire de projet <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
