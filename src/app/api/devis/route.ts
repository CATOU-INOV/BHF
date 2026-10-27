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

// Couleurs du site (globals.css)
const C = {
  foret900: "#112d15",
  foret700: "#1d5a23",
  foret100: "#e2efe0",
  ecorce600: "#9d4804",
  ecorce500: "#b8590f",
  sciure50: "#fbf8f3",
  sciure100: "#f4eee4",
  sciure200: "#e7ddcd",
  charbon900: "#1e1b18",
  charbon700: "#3b3530",
  charbon500: "#6b6259",
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
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${COMPANY.name}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${C.sciure100};font-family:Segoe UI,Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.sciure100};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:${C.foret900};padding:28px 32px;border-top:4px solid ${C.ecorce500};">
                <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.3px;text-transform:uppercase;">${COMPANY.name}</span><br/>
                <span style="font-size:12px;color:${C.foret100};">Scierie de résineux à Chalmazel — Monts du Forez (42)</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${C.sciure50};padding:20px 32px;border-top:1px solid ${C.sciure200};">
                <p style="margin:0 0 4px;font-size:12px;color:${C.charbon500};">${COMPANY.name} — ${COMPANY.address.street}, ${COMPANY.address.zip} ${COMPANY.address.city}</p>
                <p style="margin:0;font-size:12px;color:${C.charbon500};">
                  <a href="${COMPANY.url}" style="color:${C.foret700};text-decoration:none;">bois-du-haut-forez.fr</a>
                  &nbsp;·&nbsp; ${COMPANY.phone}
                  &nbsp;·&nbsp; ${COMPANY.email}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Prévient la boîte de réception en cas d'échec d'envoi, pour ne pas perdre une demande en silence. */
async function alertFailure(resend: Resend, context: string, detail: unknown) {
  const now = new Date().toISOString();
  console.error(`[devis] ÉCHEC ${context} — ${now}`, detail);
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: RECIPIENT,
      subject: `⚠️ Échec envoi formulaire devis — ${context}`,
      text: `Un échec est survenu sur le formulaire de devis (bois-du-haut-forez.fr).\n\nContexte : ${context}\nDate : ${now}\nDétail : ${JSON.stringify(detail, null, 2)}`,
    });
  } catch (alertError) {
    console.error(`[devis] Échec de l'envoi de l'alerte elle-même — ${now}`, alertError);
  }
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
        <td style="padding:10px 12px;font-size:13px;font-weight:600;color:${C.charbon500};width:150px;border-bottom:1px solid ${C.sciure200};vertical-align:top;">${label}</td>
        <td style="padding:10px 12px;font-size:14px;color:${C.charbon900};border-bottom:1px solid ${C.sciure200};vertical-align:top;">${value}</td>
      </tr>`;

    // 1. Email interne
    const internalHtml = `
      <p style="margin:0 0 24px;"><span style="display:inline-block;background-color:${C.ecorce600};color:#ffffff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;padding:5px 12px;border-radius:4px;">Nouvelle demande de devis</span></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${row("Nom", `<strong>${s.nom}</strong>`)}
        ${row("Profil", s.profil || "Non précisé")}
        ${s.entreprise ? row("Entreprise", s.entreprise) : ""}
        ${row("Email", `<a href="mailto:${s.email}" style="color:${C.foret700};text-decoration:none;">${s.email}</a>`)}
        ${row("Téléphone", `<a href="tel:${s.telephone.replace(/\s/g, "")}" style="color:${C.foret700};text-decoration:none;">${s.telephone}</a>`)}
        ${row("Produits", sProduits)}
        ${row("Essence", s.essence || "Sans préférence")}
        ${lieu ? row("Chantier", escapeHtml(lieu)) : ""}
        ${row("Demande", `<span style="white-space:pre-wrap;">${s.message}</span>`)}
      </table>
      <p style="margin:24px 0 0;font-size:13px;color:${C.charbon500};">Vous pouvez répondre directement à cet email, la réponse ira à ${s.nom} (${s.email}).</p>`;

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
      await alertFailure(resend, `email interne (demande de ${f.nom})`, internal.error);
      return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
    }

    // 2. Confirmation au client
    const clientHtml = `
      <p style="margin:0 0 16px;font-size:16px;color:${C.charbon900};">Bonjour <strong>${s.nom}</strong>,</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${C.charbon700};">Nous avons bien reçu votre demande de devis${produits.length ? ` concernant <strong>${sProduits}</strong>` : ""}. Merci pour votre confiance !</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${C.charbon700};">Nous l'étudions et revenons vers vous rapidement avec un devis personnalisé.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.sciure50};border:1px solid ${C.sciure200};border-left:4px solid ${C.foret700};border-radius:6px;margin-bottom:24px;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;color:${C.charbon500};">Récapitulatif de votre demande</p>
            <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:${C.charbon900};">${sProduits}${lieu ? ` — chantier : ${escapeHtml(lieu)}` : ""}</p>
            <p style="margin:0;font-size:14px;line-height:1.5;color:${C.charbon700};white-space:pre-wrap;">${s.message}</p>
          </td>
        </tr>
      </table>
      <p style="margin:0 0 8px;font-size:15px;color:${C.charbon700};">Une question urgente ? Appelez-nous directement :</p>
      <p style="margin:0 0 4px;font-size:20px;font-weight:700;"><a href="tel:${COMPANY.phoneRaw}" style="color:${C.ecorce600};text-decoration:none;">${COMPANY.phone}</a></p>
      <p style="margin:0 0 24px;font-size:13px;color:${C.charbon500};">${COMPANY.hours.label}. ${COMPANY.hours.note}.</p>
      <p style="margin:0;font-size:14px;color:${C.charbon500};">À bientôt,<br/>L'équipe ${COMPANY.name}</p>`;

    const client = await resend.emails.send({
      from: FROM_ADDRESS,
      to: f.email,
      replyTo: RECIPIENT,
      subject: `Votre demande de devis a bien été reçue — ${COMPANY.name}`,
      html: emailLayout(clientHtml, "Merci pour votre demande, nous revenons vers vous rapidement."),
      text: [
        `Bonjour ${f.nom},`, "",
        `Nous avons bien reçu votre demande de devis${produits.length ? ` concernant ${produitsLabel}` : ""}. Merci pour votre confiance !`,
        "Nous l'étudions et revenons vers vous rapidement avec un devis personnalisé.", "",
        `Votre demande : ${produitsLabel}${lieu ? ` — chantier : ${lieu}` : ""}`, f.message, "",
        `Une question urgente ? Appelez-nous directement : ${COMPANY.phone}`,
        `${COMPANY.hours.label}. ${COMPANY.hours.note}.`, "", "À bientôt,", `L'équipe ${COMPANY.name}`,
      ].join("\n"),
    });
    if (client.error) {
      // La demande interne est partie : on ne fait pas échouer la requête
      await alertFailure(resend, `confirmation client (${f.nom} / ${f.email})`, client.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur devis :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
