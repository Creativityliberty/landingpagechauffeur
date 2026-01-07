# Architecture - Chauffeur Privé VTC

## Vue d'ensemble

Application Next.js 16 avec architecture Clean Architecture, optimisée pour Bun et déployée sur Vercel.

## Structure du projet

```
chauffeur-prive-template/
├── core/                      # Logique métier (framework-agnostic)
│   ├── domain/                # Entités et règles de validation
│   │   ├── trip.ts           # Entité Trip avec calcul de prix
│   │   └── waitlist-entry.ts # Entité Waitlist
│   ├── application/           # Cas d'usage / Services
│   │   ├── calculate-price.ts
│   │   └── join-waitlist.ts
│   └── ports/                 # Interfaces (contrats)
│       └── waitlist-repository.ts
│
├── infra/                     # Implémentations infrastructure
│   └── in-memory-waitlist-repository.ts
│
├── lib/                       # Utilitaires et DI
│   ├── container.ts          # Injection de dépendances
│   └── utils.ts              # Helpers (cn pour classes)
│
├── ui/                        # Composants React (pas de logique métier)
│   ├── components/           # Composants réutilisables
│   │   ├── ShinyButton.tsx   # Bouton animé avec effet brillant
│   │   ├── BentoGrid.tsx     # Grille asymétrique moderne
│   │   └── BackgroundBeams.tsx # Faisceaux lumineux animés
│   ├── layout/
│   │   └── Navbar.tsx        # Navigation avec toggle dark/light
│   ├── sections/             # Sections de la landing page
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── BookingSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── ...
│   └── support/
│       ├── SupportMenu.tsx   # Menu d'assistance
│       └── RepoChatbot.tsx   # Chatbot IA "Mikmik Agent IA"
│
├── app/                       # Next.js App Router
│   ├── api/                  # Routes API (adaptateurs HTTP)
│   │   ├── waitlist/route.ts
│   │   └── repo-chat/route.ts # Endpoint chatbot Gemini
│   ├── LandingPage.tsx       # Orchestrateur principal
│   ├── globals.css           # Styles globaux + animations
│   └── layout.tsx            # Layout racine
│
├── config.ts                  # Configuration centralisée (thème, contenu, pricing)
└── public/                    # Assets statiques
```

## Principes architecturaux

### 1. Clean Architecture
- **Logique métier dans `core/`** : Aucune dépendance Next.js, React ou Bun
- **Routes = Adaptateurs** : Délèguent aux services
- **Dépendances vers l'intérieur** : `core/` n'importe jamais depuis `infra/` ou `app/`
- **Pas de logique dans les composants** : UI → API → Service → Repository

### 2. Flux de données

```
Composant UI → API HTTP → Service → Repository
     ↓            ↓          ↓           ↓
   React      app/api/*   core/app/   infra/
```

### 3. Configuration centralisée

Le fichier `config.ts` contient :
- **Thème** : Modes dark/light, couleurs, typographie
- **Contenu** : Textes, services, pricing
- **Forfaits** : Tarifs aéroports et locaux

## Stack technique

### Runtime & Framework
- **Runtime** : Bun 1.3.5
- **Framework** : Next.js 16.1.1 (App Router + Turbopack)
- **Language** : TypeScript (strict mode)

### UI & Styling
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion v12
- **Icons** : Lucide React
- **Design System** : Composants inspirés d'Aceternity UI et Magic UI

### IA & APIs
- **Chatbot** : Google Generative AI (Gemini)
- **Deployment** : Vercel (Bun Runtime Beta)

## Composants animés

### ShinyButton
Bouton avec effet de reflet brillant qui se déplace périodiquement. Utilisé pour les CTAs principaux.

**Props** :
- `children` : Contenu du bouton
- `className` : Classes Tailwind additionnelles
- `onClick` : Handler de clic

**Utilisation** :
```tsx
<ShinyButton onClick={handleClick} className="bg-[#D4AF37]">
  Réserver Maintenant
</ShinyButton>
```

### BentoGrid
Grille asymétrique moderne pour afficher des cartes de contenu avec des tailles variables.

**Composants** :
- `BentoGrid` : Conteneur de la grille
- `BentoGridItem` : Item individuel avec header, icon, title, description

**Utilisation** :
```tsx
<BentoGrid>
  <BentoGridItem
    title="Service VIP"
    description="Transport premium"
    header={<img src="..." />}
    icon={<Car size={20} />}
    className="md:col-span-2"
  />
</BentoGrid>
```

### BackgroundBeams
Faisceaux lumineux animés en arrière-plan, créant une ambiance luxueuse.

**Utilisation** :
```tsx
<section className="relative">
  <BackgroundBeams className="-z-10" />
  {/* Contenu */}
</section>
```

## Fonctionnalités clés

### 1. Calcul de prix dynamique
- Forfaits aéroports (CDG, Orly, Beauvais)
- Tarification locale au kilomètre
- Suppléments nuit/weekend
- Calcul en temps réel dans `BookingSection`

### 2. Chatbot IA intégré
- Assistant "Mikmik Agent IA" basé sur Gemini
- Connaissance du projet via `INSTRUCTIONS_AI.md`
- Interface conversationnelle dans `SupportMenu`

### 3. Thème adaptatif
- Mode sombre/clair avec toggle
- Transitions fluides
- Couleurs adaptées au branding VTC (noir/or)

### 4. Responsive design
- Mobile-first
- Breakpoints Tailwind
- Navigation mobile avec menu hamburger

## Déploiement

### Vercel (Recommandé)

1. **Configuration** : `vercel.json` avec `"bunVersion": "1.x"`
2. **Scripts** : Utilisation de `bun --bun next`
3. **Variables d'environnement** :
   - `GEMINI_API_KEY` : Clé API pour le chatbot

```bash
bun i -g vercel
vercel login
vercel deploy
```

### Build local

```bash
bun install
bun run build
bun run start
```

## Développement

### Ajouter une nouvelle fonctionnalité

1. **Entité** : Créer dans `core/domain/`
2. **Port** : Définir l'interface dans `core/ports/`
3. **Service** : Implémenter dans `core/application/`
4. **Infrastructure** : Créer l'implémentation dans `infra/`
5. **DI** : Enregistrer dans `lib/container.ts`
6. **API** : Créer la route dans `app/api/`
7. **UI** : Construire le composant dans `ui/`

### Ajouter un composant animé

1. Créer le fichier dans `ui/components/`
2. Utiliser Framer Motion pour les animations
3. Exporter depuis `ui/index.ts`
4. Utiliser `cn()` pour fusionner les classes Tailwind

### Conventions de code

- **Composants** : PascalCase, fichiers `.tsx`
- **Hooks** : `use` prefix
- **Types** : Interfaces pour les props, types pour les données
- **Styles** : Tailwind utility-first, `cn()` pour les conditions
- **Animations** : Framer Motion avec `as const` pour les types littéraux

## Maintenance

### Dépendances principales

```json
{
  "next": "^16.1.1",
  "react": "^19.2.0",
  "framer-motion": "^12.24.10",
  "@google/generative-ai": "^0.24.1",
  "tailwindcss": "^4",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0"
}
```

### Mise à jour

```bash
bun update
bun run build  # Vérifier que tout compile
```

## Performance

- **SSG** : Pages statiques pré-rendues
- **Turbopack** : Build ultra-rapide en dev
- **Code splitting** : Automatique avec Next.js
- **Optimisation images** : Next.js Image component

## Sécurité

- **Variables d'environnement** : Jamais commitées
- **API Routes** : Validation des entrées
- **CORS** : Configuré pour production
- **Rate limiting** : À implémenter pour le chatbot

## Support

Pour toute question sur l'architecture ou l'implémentation, consulter :
- `INSTRUCTIONS_AI.md` : Guide pour l'assistant IA
- `README.md` : Documentation utilisateur
- Code source : Commentaires inline pour la logique complexe
