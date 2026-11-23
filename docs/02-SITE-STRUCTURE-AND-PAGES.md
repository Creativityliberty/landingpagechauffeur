# 02 — Architecture du Site, Pages & Spécifications Fonctionnelles

> **Objectif :** Cartographier l'ensemble des pages, des routes Next.js App Router, du modèle de données Clean Architecture (`core/` → `infra/` → `lib/` → `ui/`) et des contenus exacts du site.

---

## 1. Arborescence Complète du Site (Sitemap & Routes)

```text
/                                           → Home / Landing Page principale (EN par défaut + sélecteur EN/FR/ES/DE)
├── /excursions/etretat                     → Page pilier SEO : Étretat Cliffs Private Excursion from Le Havre
├── /excursions/honfleur                    → Page pilier SEO : Honfleur Harbour Private Excursion from Le Havre
├── /excursions/mont-saint-michel           → Page pilier SEO : Mont-Saint-Michel Private Day Trip from Le Havre
├── /excursions/dday-landing-beaches        → Page pilier SEO : D-Day Landing Beaches & American Cemetery Private Tour
├── /excursions/custom-normandy-tour        → Page pilier SEO : Custom Normandy Shore Excursion (1–4 Guests)
├── /cruise-port-guide                      → Guide pratique Terminal Croisière du Havre (Point de RDV, All-Aboard Policy)
├── /book                                   → Alias / vue dédiée vers le formulaire de devis croisiériste
├── /legal-notice                           → Mentions légales (statut VTC / transport privé avec chauffeur)
├── /terms                                  → Conditions générales de réservation & politique d'escale / annulation navire
├── /privacy                                → Politique de confidentialité (RGPD)
├── /api/excursion-request                  → Endpoint HTTP POST validation + email/notification demande de devis
├── /api/repo-chat                          → Endpoint Gemini AI Concierge (multilingue, aide au choix d'excursion)
├── /sitemap.xml                            → Sitemap dynamique Next.js
├── /robots.txt                             → Directives d'indexation (+ autorisation bots GEO/LLM)
└── /llms.txt                               → Index sémantique structuré pour ChatGPT / Perplexity / Claude / Gemini
```

> **Note sur les anciennes routes VTC (`app/entreprises`, `app/destinations/vtc-*`, `app/blog`) :**
> - Les slugs `vtc-le-havre`, `transfert-aeroport-cdg`, etc. dans `config.ts` doivent être remplacés par les 5 routes `/excursions/*` ci-dessus (avec redirections `301` dans `next.config.ts` si l'ancien domaine a déjà de l'historique Google).
> - `/entreprises` est supprimé de la navigation principale pour garder 100% du focus sur la clientèle croisiériste.

---

## 2. Clean Architecture (Respect de `INSTRUCTIONS_AI.md`)

Le refactoring conserve la séparation stricte **Domain / Ports / Application / Infra / UI** déjà en place :

### A. `core/` (Logique métier pure, zéro dépendance React/Next)
1. **`core/domain/excursion-request.ts`**
   - Type `ExcursionSlug = "etretat" | "honfleur" | "mont-saint-michel" | "dday-beaches" | "custom"`
   - Type `GuestCount = 1 | 2 | 3 | 4`
   - Type `PreferredLanguage = "English" | "French" | "Spanish" | "German" | "Other"`
   - Fonction pure `validateCruiseSchedule(arrivalTime, allAboardTime, excursion)`:
     - Calcule `portWindowMinutes`.
     - Vérifie `allAboardTime > shipArrivalTime`.
     - Retourne un statut de faisabilité (`"comfortable" | "tight" | "insufficient"`) selon la durée estimée de l'excursion (ex. Étretat ~4h, Honfleur ~4h, D-Day ~8h, Mont-Saint-Michel ~9h–10h avec trajet) + **marge de sécurité portuaire (60 min minimum avant *All Aboard*)**.
2. **`core/ports/excursion-request-repository.ts`**
   - Interface `ExcursionRequestRepository` (`save(request)`).
3. **`core/application/submit-excursion-request.ts`**
   - Cas d'usage `SubmitExcursionRequestService` : valide les champs obligatoires, calcule le diagnostic horaire d'escale, sauvegarde/notifie, et renvoie un récapitulatif structuré (utilisé ensuite par l'email et le lien WhatsApp).

### B. `infra/` & `lib/`
- **`infra/in-memory-excursion-repository.ts`** (et adaptateur email/webhook optionnel type Resend pour recevoir chaque demande de devis directement dans ta boîte mail).
- **`lib/container.ts`** : injection de `submitExcursionRequestService`.
- **`lib/i18n/`** (ou dictionnaire centralisé dans `config.ts`) : gestion des langues `en` (défaut), `fr`, `es`, `de` sans dupliquer les composants UI.

---

## 3. Contenu Exact & Structure de Chaque Section (Home `/`)

### Section 1 — Hero (`HeroSection.tsx`)
- **Eyebrow :** `NORMANDY PRIVATE TOURS · LE HAVRE CRUISE PORT` *(nom provisoire à valider)*
- **H1 :** `Discover Normandy, Your Way.`
- **Sous-titre H2 :** `Private Shore Excursions from Le Havre Cruise Port`
- **Paragraphe :**
  > Make the most of your time in Normandy with a private driver and a comfortable vehicle exclusively for your group. Discover iconic destinations such as Étretat, Honfleur, Mont-Saint-Michel and the D-Day landing beaches.
- **4 points forts (badges icônes) :**
  - `Private transportation for 1 to 4 guests`
  - `Pick-up and drop-off at Le Havre Cruise Port`
  - `Flexible and personalized itineraries`
  - `Multilingual communication`
- **CTA principal :** `BOOK YOUR PRIVATE EXCURSION`
- **Micro-mention sous CTA :** `Private vehicle · 1–4 guests · Personalized excursions`

### Section 2 — Nos 4 Destinations (`ExcursionsSection.tsx`)
- **Titre :** `Explore Normandy`
- **Carte 1 — ÉTRETAT – The Famous Cliffs**
  - *Description :* Discover the famous white cliffs, natural arches and spectacular coastal views.
  - *Badge durée :* `Approx. 4 hours (indicative, according to schedule)`
  - *Trajet depuis le port :* `~35 min drive from Le Havre Terminal`
- **Carte 2 — HONFLEUR – The Charming Harbour**
  - *Description :* Enjoy the charm of this historic harbour, its picturesque streets and traditional architecture.
  - *Badge durée :* `Approx. 4 hours (indicative)`
  - *Trajet depuis le port :* `~30 min drive across Normandy Bridge`
- **Carte 3 — MONT-SAINT-MICHEL – A Magical Destination**
  - *Description :* Visit one of France's most remarkable landmarks and discover its medieval village and abbey.
  - *Badge durée :* `Full-day excursion (adapted to ship schedule)`
  - *Trajet depuis le port :* `~2h30 drive each way · Long port call recommended`
- **Carte 4 — D-DAY LANDING BEACHES – A Journey Through History**
  - *Description :* Explore the historic landing sites, memorials and the American cemetery.
  - *Badge durée :* `Approx. 8 hours (depending on sites visited)`
  - *Trajet depuis le port :* `~1h45 drive each way`
- **Note commerciale sous la grille :**
  > *All durations are indicative estimates and will be confirmed after checking routes, planned stops, and your ship's exact port schedule.*

### Section 3 — Pourquoi nous choisir ? (`WhyChooseUsSection.tsx`)
- **Titre :** `Your Private Excursion, Your Way`
- **4 blocs :**
  1. **Private Experience** — *Enjoy an exclusive vehicle reserved for your group of up to 4 guests.*
  2. **Personalized Itinerary** — *Choose your destinations and enjoy a trip adapted to your preferences and available time.*
  3. **Multilingual Communication** — *Communicate with us in different languages to make your booking easier.*
  4. **Cruise Port Pick-up** — *Start your excursion directly from Le Havre Cruise Port.*

### Section 4 — Confiance, Véhicule & Clarté Commerciale (`VehicleTrustSection.tsx`)
- **Titre :** `Your Private Sedan & Professional Driver`
- **3 garanties clés pour rassurer la clientèle américaine/internationale :**
  1. **Real Vehicle & Driver Transparency :** Photo du véhicule réel (berline confortable 1–4 passagers + bagages/achats), climatisation, eau fraîche, chargeurs USB.
  2. **All-Aboard Safety Buffer :** Nous calculons systématiquement votre retour avec une marge de sécurité avant votre *All Aboard Time*. Aucun circuit incompatible avec l'escale n'est accepté.
  3. **Clear Per-Vehicle Positioning & Legal Scope :** Vous réservez le véhicule privatif pour votre groupe (1–4 pers.), sur devis personnalisé. Prestation de **transport privé avec chauffeur** (les visites guidées commentées à l'intérieur des monuments ou musées nécessitant un guide-conférencier agréé ne sont pas incluses).

### Section 5 — Formulaire de Réservation Croisiéristes (`BookingSection.tsx`)
- **Titre :** `Plan Your Normandy Excursion`
- **Introduction :**
  > Are you visiting Le Havre on a cruise? Tell us about your visit, your cruise ship and the places you would like to discover. We will get back to you with availability and a personalized quotation.

| Champ (Label EN) | Type HTML / UI | Obligatoire | Détails / Options |
| :--- | :--- | :---: | :--- |
| `Full name` | `text` | Oui | Nom du passager référent |
| `Email address` | `email` | Oui | Pour envoyer le devis personnalisé |
| `WhatsApp / Phone number` | `tel` | Oui | Avec indicatif pays (ex. `+1`, `+44`, `+49`) |
| `Cruise ship name` | `text` | Oui | Ex. *MSC Virtuosa, Princess, Celebrity, Royal Caribbean* |
| `Date of arrival in Le Havre` | `date` | Oui | Date d'escale |
| `Ship arrival time` | `time` | Oui | Heure prévue d'accostage |
| `All aboard time (latest boarding time)` | `time` | Oui | Champ critique pour la sécurité d'escale |
| `Preferred excursion` | `select` | Oui | `Étretat`, `Honfleur`, `Mont-Saint-Michel`, `D-Day Landing Beaches`, `Custom itinerary` |
| `Number of guests (1–4)` | `select` | Oui | `1`, `2`, `3`, `4` |
| `Preferred language` | `select` | Oui | `English`, `French`, `Spanish`, `German`, `Other` |
| `Additional requests` | `textarea` | Non | Horaires souhaités, mobilité, arrêts spécifiques, combiné Étretat + Honfleur… |

- **Mention obligatoire affichée au-dessus du CTA :**
  > *Please note that all bookings are subject to availability and confirmation. We will contact you with a personalized quotation.*
- **CTA :** `REQUEST YOUR PRIVATE TOUR`

---

## 4. Structure des Pages Piliers `/excursions/[slug]`

Chaque page d'excursion dédiée suivra ce gabarit uniforme orienté conversion + SEO :
1. **Hero Destination** (photo plein cadre + temps de trajet depuis le port du Havre + durée indicative + bouton `Request a Quote for This Tour`).
2. **Answer Box (40–60 mots)** : résumé factuel immédiat pour les croisiéristes (distance, durée, capacité 1–4 pers., retour garanti avant *All-Aboard*).
3. **Suggested Timeline & Highlights** : exemple de déroulé heure par heure calé sur une escale type (ex. 08:30 Pier Pick-up → Étretat → Option Honfleur → 16:30 Back at Le Havre Cruise Terminal).
4. **What's Included / Not Included** (transparence totale : véhicule privé + chauffeur + carburant/péages/parking vs billets d'entrée/repas/guide conférencier intérieur).
5. **Pre-filled Booking Form** : le même composant `BookingSection` avec l'excursion déjà pré-sélectionnée.
