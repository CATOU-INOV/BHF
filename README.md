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

- [ ] Réponses au questionnaire, puis mise à jour des valeurs « À CONFIRMER » dans `constants.ts` : année de création, adresse exacte, email, longueurs et diamètres
- [ ] Mentions légales : capital social, directeur de publication, greffe (RCS), n° de TVA (`LEGAL` dans `constants.ts`)
- [ ] Vente aux particuliers et retrait sur place à confirmer (FAQ de l'accueil)
- [ ] Nouvelles photos : remplacer les images de `public/images/`, dont la plupart font moins de 1 000 px
- [ ] Récupérer le nom de domaine bois-du-haut-forez.fr (OVH, **expire le 2026-11-28**) et boisduhautforez.fr
- [ ] Resend : vérifier le domaine (DNS SPF + DKIM), créer la clé API, renseigner `.env.local` (voir `.env.example`)
- [ ] Search Console : vérifier la propriété, puis soumettre `/sitemap.xml`
- [ ] Mettre à jour le NAP sur la fiche Google Business Profile, Fibois 42 et scierie-locale.fr

## Déploiement (VPS Hostinger, comme PACAP)

Même serveur que pacap84.com : Next.js tourne sous pm2, derrière Nginx Proxy Manager. BHF utilise le **port 3001** (PACAP est sur le 3000).

```bash
# Première installation
cd /var/www
git clone git@github.com:CATOU-INOV/BHF.git bhf      # clé de déploiement GitHub en lecture seule
cd bhf
cp .env.example .env.local && nano .env.local        # clé Resend
npm ci && npm run build
pm2 start npm --name bhf -- start -- -p 3001
pm2 save

# Mises à jour
cd /var/www/bhf && git pull && npm ci && npm run build && pm2 restart bhf
```

Dans Nginx Proxy Manager, ajouter un proxy host `bois-du-haut-forez.fr` + `www.bois-du-haut-forez.fr` vers `http://<ip-docker-host>:3001` (même cible que PACAP, port 3001), avec un certificat SSL Let's Encrypt et la redirection HTTPS forcée. Côté DNS, faire pointer les enregistrements A `@` et `www` vers l'IP du VPS. Le domaine `boisduhautforez.fr` doit rediriger en 301 vers `https://www.bois-du-haut-forez.fr`.

Le site redirige déjà les anciennes URL WordPress (pages villes, PDF, mentions légales) : voir `next.config.ts`.
