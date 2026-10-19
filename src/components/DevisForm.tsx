"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COMPANY, ESSENCES, PRODUCTS, SERVICES } from "@/lib/constants";

const input =
  "w-full border border-sciure-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-foret-600 focus:border-foret-600";
const label = "block text-sm font-semibold text-charbon-700 mb-1.5";

const CHOICES = [...PRODUCTS.map((p) => p.title), ...SERVICES.map((s) => s.title)];

export default function DevisForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  // Heure d'affichage du formulaire : les robots soumettent en moins de 2 s
  const loadedAt = useRef(0);

  useEffect(() => { loadedAt.current = Date.now(); }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd.entries()),
      produits: fd.getAll("produits"),
      _t: loadedAt.current,
    };

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return setStatus("success");
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border-t-4 border-foret-600 p-10 text-center shadow-sm">
        <svg className="w-14 h-14 mx-auto mb-4 text-foret-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-3xl font-bold uppercase text-foret-900 mb-2">Demande envoyée</h2>
        <p className="text-charbon-700 mb-8">
          Merci ! Nous étudions votre demande et revenons vers vous rapidement. Un email de confirmation vient de vous être envoyé.
        </p>
        <Link href="/" className="inline-block bg-foret-700 hover:bg-foret-600 text-white font-bold px-8 py-3 uppercase tracking-wide text-sm">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <form className="bg-white border border-sciure-200 p-6 md:p-10 space-y-6 shadow-sm" onSubmit={handleSubmit}>
      {/* Honeypot : invisible pour les humains, rempli par les robots */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className={label}>Vous êtes *</legend>
        <div className="flex flex-wrap gap-3">
          {["Particulier", "Professionnel"].map((p, i) => (
            <label key={p} className="flex items-center gap-2 border border-sciure-200 px-4 py-2.5 cursor-pointer has-[:checked]:border-foret-600 has-[:checked]:bg-foret-50">
              <input type="radio" name="profil" value={p} defaultChecked={i === 0} className="accent-foret-600" />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className={label}>Nom et prénom *</label>
          <input id="nom" name="nom" required maxLength={100} autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="entreprise" className={label}>Entreprise</label>
          <input id="entreprise" name="entreprise" maxLength={100} autoComplete="organization" className={input} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" name="email" type="email" required maxLength={150} autoComplete="email" className={input} />
        </div>
        <div>
          <label htmlFor="telephone" className={label}>Téléphone *</label>
          <input id="telephone" name="telephone" type="tel" required maxLength={20} autoComplete="tel" className={input} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Produits ou services concernés</legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {CHOICES.map((c) => (
            <label key={c} className="flex items-center gap-3 border border-sciure-200 px-4 py-2.5 cursor-pointer text-sm has-[:checked]:border-foret-600 has-[:checked]:bg-foret-50">
              <input type="checkbox" name="produits" value={c} className="accent-foret-600 w-4 h-4" />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="essence" className={label}>Essence souhaitée</label>
          <select id="essence" name="essence" className={input} defaultValue="Sans préférence">
            <option>Sans préférence</option>
            {ESSENCES.map((e) => <option key={e.name}>{e.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="codePostal" className={label}>Code postal du chantier</label>
          <input id="codePostal" name="codePostal" inputMode="numeric" pattern="\d{5}" maxLength={5} autoComplete="postal-code" placeholder="42600" className={input} />
        </div>
        <div>
          <label htmlFor="commune" className={label}>Commune</label>
          <input id="commune" name="commune" maxLength={80} autoComplete="address-level2" placeholder="Montbrison" className={input} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Votre liste de bois ou votre projet *</label>
        <textarea
          id="message" name="message" rows={7} required maxLength={5000}
          placeholder={"Exemple :\n10 chevrons 60×80 en 4 m\n4 pannes 100×220 en 6 m\nDouglas, traité classe 2, enlèvement semaine 12"}
          className={`${input} resize-y`}
        />
        <p className="text-xs text-charbon-500 mt-1.5">
          Votre liste est sur un tableur ou un plan ? Envoyez-la à{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a>.
        </p>
      </div>

      {status === "error" && (
        <p className="text-ecorce-700 bg-ecorce-100 px-4 py-3 text-sm" role="alert">
          {error || "Une erreur est survenue."} Vous pouvez réessayer ou nous appeler au{" "}
          <a href={`tel:${COMPANY.phoneRaw}`} className="font-bold underline">{COMPANY.phone}</a>.
        </p>
      )}

      <button
        type="submit" disabled={status === "loading"}
        className="w-full bg-ecorce-600 hover:bg-ecorce-700 disabled:opacity-60 text-white font-bold py-4 uppercase tracking-wide transition-colors"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande de devis"}
      </button>
      <p className="text-xs text-charbon-500">
        Devis gratuit et sans engagement. Vos données servent uniquement à répondre à votre demande, voir notre{" "}
        <Link href="/politique-de-confidentialite" className="underline">politique de confidentialité</Link>.
      </p>
    </form>
  );
}
