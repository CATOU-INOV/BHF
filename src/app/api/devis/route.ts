import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY } from "@/lib/constants";

/**
 * Variables d'environnement (voir .env.example) :
 * - RESEND_API_KEY : clé API Resend (domaine bois-du-haut-forez.fr à vérifier dans Resend)
 * - DEVIS_TO       : boîte qui reçoit les demandes (défaut : COMPANY.email)
 * - DEVIS_FROM     : expéditeur, sur le domaine vérifié
 */
const RECIPIENT = process.env.DEVIS_TO || COMPANY.email;
const FROM_ADDRESS = process.env.DEVIS_FROM || `${COMPANY.name} <devis@bois-du-haut-forez.fr>`;

const C = {
  foret: "#228926",
  foretDark: "#112d15",
  ecorce: "#9d4804",
  text: "#1e1b18",
  muted: "#6b6259",
  border: "#e7ddcd",
  bg: "#fbf8f3",
};

const LIMITS: Record<string, number> = {
  nom: 100, entreprise: 100, email: 150, telephone: 20, profil: 20,
  essence: 30, codePostal: 5, commune: 80, message: 5000,
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function str(v: unknown, key: string) {
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

function emailLayout(bodyHtml: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${COMPANY.name}</title></head>
  <body style="margin:0;padding:0;background-color:${C.bg};font-family:Segoe UI,Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.bg};padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:6px;overflow:hidden;">
          <tr><td style="background-color:${C.foretDark};padding:26px 32px;border-top:4px solid ${C.foret};">
            <span style="font-size:20px;font-weight:700;color:#ffffff;">${COMPANY.name}</span><br/>
            <span style="font-size:12px;color:#e2efe0;">Scierie à Chalmazel — Monts du Forez (42)</span>
          </td></tr>
          <tr><td style="padding:32px;">${bodyHtml}</td></tr>
          <tr><td style="background-color:${C.bg};padding:18px 32px;border-top:1px solid ${C.border};">
            <p style="margin:0 0 4px;font-size:12px;color:${C.muted};">${COMPANY.name} — ${COMPANY.address.locality}, ${COMPANY.address.zip} ${COMPANY.address.city}</p>
            <p style="margin:0;font-size:12px;color:${C.muted};">
              <a href="${COMPANY.url}" style="color:${C.foret};text-decoration:none;">bois-du-haut-forez.fr</a>
              &nbsp;·&nbsp; ${COMPANY.phone} &nbsp;·&nbsp; ${COMPANY.email}
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  try {

    // Honeypot et soumission trop rapide (< 2 s) : on simule un succès pour ne pas renseigner les robots
    if (body._hp || !body._t || Date.now() - Number(body._t) < 2000) {
      return NextResponse.json({ success: true });
    }

    const f = Object.fromEntries(Object.keys(LIMITS).map((k) => [k, str(body[k], k)]));
    const produits = Array.isArray(body.produits)
      ? body.produits.filter((p: unknown): p is string => typeof p === "string").slice(0, 10).map((p: string) => p.slice(0, 60))
      : [];

    if (!f.nom || !f.email || !f.telephone || !f.message) {
      return NextResponse.json({ error: "Merci de remplir les champs obligatoires." }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(f.email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }
    if (f.codePostal && !/^\d{5}$/.test(f.codePostal)) {
      return NextResponse.json({ error: "Code postal invalide." }, { status: 400 });
    }
    if (!/^[\d\s+\-.]{6,20}$/.test(f.telephone)) {
      return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante : demande de devis non envoyée", { nom: f.nom, email: f.email });
      return NextResponse.json({ error: "Le formulaire est momentanément indisponible." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const produitsLabel = produits.length ? produits.join(", ") : "Non précisé";
    const s = Object.fromEntries(Object.entries(f).map(([k, v]) => [k, escapeHtml(v)]));
    const sProduits = escapeHtml(produitsLabel);
    const lieu = [f.codePostal, f.commune].filter(Boolean).join(" ");

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 12px;font-size:13px;font-weight:600;color:${C.muted};width:140px;border-bottom:1px solid ${C.border};vertical-align:top;">${label}</td>
        <td style="padding:10px 12px;font-size:14px;color:${C.text};border-bottom:1px solid ${C.border};vertical-align:top;">${value}</td>
      </tr>`;

    // 1. Email interne
    const internalHtml = `
      <p style="margin:0 0 20px;"><span style="display:inline-block;background-color:${C.ecorce};color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;padding:5px 12px;border-radius:3px;">Nouvelle demande de devis</span></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${row("Nom", `<strong>${s.nom}</strong>`)}
        ${row("Profil", s.profil || "Non précisé")}
        ${s.entreprise ? row("Entreprise", s.entreprise) : ""}
        ${row("Email", `<a href="mailto:${s.email}" style="color:${C.foret};">${s.email}</a>`)}
        ${row("Téléphone", `<a href="tel:${s.telephone.replace(/\s/g, "")}" style="color:${C.foret};">${s.telephone}</a>`)}
        ${row("Produits", sProduits)}
        ${row("Essence", s.essence || "Sans préférence")}
        ${lieu ? row("Chantier", escapeHtml(lieu)) : ""}
        ${row("Demande", `<span style="white-space:pre-wrap;">${s.message}</span>`)}
      </table>
      <p style="margin:20px 0 0;font-size:13px;color:${C.muted};">Répondez directement à cet email pour écrire à ${s.nom}.</p>`;

    const internalText = [
      "Nouvelle demande de devis", "",
      `Nom : ${f.nom}`, `Profil : ${f.profil || "Non précisé"}`,
      ...(f.entreprise ? [`Entreprise : ${f.entreprise}`] : []),
      `Email : ${f.email}`, `Téléphone : ${f.telephone}`,
      `Produits : ${produitsLabel}`, `Essence : ${f.essence || "Sans préférence"}`,
      ...(lieu ? [`Chantier : ${lieu}`] : []),
      "", "Demande :", f.message,
    ].join("\n");

    const internal = await resend.emails.send({
      from: FROM_ADDRESS,
      to: RECIPIENT,
      replyTo: f.email,
      subject: `Demande de devis — ${f.nom}${f.entreprise ? ` (${f.entreprise})` : ""}`,
      html: emailLayout(internalHtml, `Demande de devis de ${f.nom} : ${produitsLabel}`),
      text: internalText,
    });
    if (internal.error) {
      console.error("Erreur envoi devis (email interne) :", internal.error);
      return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
    }

    // 2. Confirmation au client
    const clientHtml = `
      <p style="margin:0 0 16px;font-size:16px;color:${C.text};">Bonjour <strong>${s.nom}</strong>,</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${C.text};">Nous avons bien reçu votre demande de devis. Merci pour votre confiance !</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${C.text};">Nous l'étudions et revenons vers vous rapidement avec un devis personnalisé.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.bg};margin-bottom:24px;">
        <tr><td style="padding:16px 20px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;color:${C.muted};">Votre demande</p>
          <p style="margin:0 0 8px;font-size:14px;color:${C.text};">${sProduits}${lieu ? ` — chantier : ${escapeHtml(lieu)}` : ""}</p>
          <p style="margin:0;font-size:14px;color:${C.text};white-space:pre-wrap;">${s.message}</p>
        </td></tr>
      </table>
      <p style="margin:0 0 6px;font-size:15px;color:${C.text};">Une question ? Appelez-nous :</p>
      <p style="margin:0 0 24px;font-size:20px;font-weight:700;"><a href="tel:${COMPANY.phoneRaw}" style="color:${C.foret};text-decoration:none;">${COMPANY.phone}</a></p>
      <p style="margin:0;font-size:14px;color:${C.muted};">À bientôt,<br/>L'équipe ${COMPANY.name}</p>`;

    const client = await resend.emails.send({
      from: FROM_ADDRESS,
      to: f.email,
      replyTo: RECIPIENT,
      subject: `Votre demande de devis a bien été reçue — ${COMPANY.name}`,
      html: emailLayout(clientHtml, "Merci pour votre demande, nous revenons vers vous rapidement."),
      text: [
        `Bonjour ${f.nom},`, "",
        "Nous avons bien reçu votre demande de devis. Merci pour votre confiance !",
        "Nous l'étudions et revenons vers vous rapidement avec un devis personnalisé.", "",
        `Votre demande : ${produitsLabel}${lieu ? ` — chantier : ${lieu}` : ""}`, f.message, "",
        `Une question ? Appelez-nous : ${COMPANY.phone}`, "", `L'équipe ${COMPANY.name}`,
      ].join("\n"),
    });
    if (client.error) {
      // La demande interne est partie : on ne fait pas échouer la requête
      console.error("Erreur envoi devis (confirmation client) :", client.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur devis :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
