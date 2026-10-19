# Bois du Haut Forez — site vitrine

Site de la scierie Bois du Haut Forez (Chalmazel, Loire) : Next.js 16 (App Router), Tailwind CSS v4, pages statiques. Il remplace l'ancien WordPress/Divi géré par l'agence.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (vérifie les erreurs)
npm run lint
```

## Organisation

| Élément | Emplacement |
|---|---|
| Données de l'entreprise, gamme, FAQ, mentions légales | `src/lib/constants.ts` (source de vérité unique) |
| Données structurées Schema.org | `src/lib/schema.ts` |
| Modèle des pages produits et services | `src/components/ProductPageLayout.tsx` |
| Formulaire de devis et envoi des emails | `src/components/DevisForm.tsx` + `src/app/api/devis/route.ts` (Resend) |
| Redirections de l'ancien WordPress | `next.config.ts` |
| Inventaire de l'ancien site, backlinks, NAP | `contenu/inventaire-site-actuel.md` |

Les dossiers `recup-wp/`, le `.wpress` et le questionnaire ne sont pas versionnés : l'export WordPress contient des messages de clients (données personnelles).

## Avant la mise en ligne

- [x] Réponses au questionnaire intégrées (`constants.ts`) : année, adresse, email, horaires, dimensions, pas de livraison, historique, PEFC n° 10-31-735
- [ ] Mentions légales : directeur de publication, greffe (RCS), n° de TVA à vérifier sur le Kbis (`LEGAL` dans `constants.ts`)
- [x] Nouvelles photos du parc (octobre 2026) — il manque encore des photos de l'équipe et des machines
- [ ] Logo BHF en haute définition (vectoriel si possible)
- [ ] Récupérer le nom de domaine bois-du-haut-forez.fr (OVH, **expire le 2026-11-28**) et boisduhautforez.fr
- [ ] Resend : vérifier le domaine (DNS SPF + DKIM), créer la clé API, renseigner `.env.local` (voir `.env.example`)
- [ ] Search Console : vérifier la propriété, puis soumettre `/sitemap.xml`
- [ ] Mettre à jour le NAP sur la fiche Google Business Profile, Fibois 42 et scierie-locale.fr

## Déploiement (VPS Hostinger)

Même serveur que pacap84.com et la démo Cayrol Énergie. Chaîne : Nginx Proxy Manager (Docker, ports 80/443) → nginx de l'hôte sur le **port 8087** (`/etc/nginx/sites-available/bhf`) → Next.js sous pm2 sur le **port 3002** (`bhf`). Les ports 3000 et 3001 sont pris par pacap-bois et thomascat-dev.

- Code : `/var/www/bhf`, cloné en HTTPS (dépôt public, aucune clé nécessaire)
- Secrets : `/var/www/bhf/.env.local` (clé Resend, voir `.env.example`)
- Redéploiement automatique : chaque push sur `main` appelle le webhook `bhf-deploy` (`/etc/webhook/hooks.json`), qui lance `/var/www/bhf-deploy.sh` (pull, `npm ci`, build, `pm2 restart bhf`). Journal : `/var/log/bhf-deploy.log`
- Démo v0 : `https://bois-du-haut-forez.duckdns.org`, servie avec `X-Robots-Tag: noindex` pour ne pas être indexée

Redéploiement manuel : `ssh root@72.62.238.206 /var/www/bhf-deploy.sh`

Pour la mise en production sur bois-du-haut-forez.fr : ajouter un proxy host NPM `bois-du-haut-forez.fr` + `www` vers `172.17.0.1:8087`, retirer l'en-tête `X-Robots-Tag` du nginx de l'hôte, faire pointer les enregistrements A `@` et `www` vers l'IP du VPS, et rediriger `boisduhautforez.fr` en 301 vers `https://www.bois-du-haut-forez.fr`.

Le site redirige déjà les anciennes URL WordPress (pages villes, PDF, mentions légales) : voir `next.config.ts`.
