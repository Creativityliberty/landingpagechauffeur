# 🤖 AI HANDBOOK - Template Architecture & Rules

Ce document est destiné à guider les futures IA (ou développeurs) travaillant sur ce dépôt. L'objectif est de maintenir l'intégrité de l'architecture **Service Layer** et de préserver la qualité esthétique du projet.

## 🏗️ Architecture : Service Layer (Hexagonale Lite)

Le projet suit une séparation stricte des préoccupations. Ne mélangez JAMAIS la logique métier avec l'UI.

### 1. `core/` (Le Cerveau)
- **domain/** : Contient les entités métier (ex: `Trip`, `WaitlistEntry`). C'est du **TypeScript pur**, sans dépendances externes.
- **ports/** : Interfaces définissant comment le core communique avec l'extérieur (ex: `WaitlistRepository`).
- **application/** : Les "Use Cases" ou Services. Ils orchestrent la logique (ex: `CalculatePriceService`, `JoinWaitlistService`).

### 2. `infra/` (Les Mains)
- Implémentations concrètes des ports (ex: `InMemoryWaitlistRepository`, `SupabaseRepository`).
- On ne met AUCUNE logique métier ici, juste de la plomberie technique (Appels API, DB).

### 3. `lib/` (Le Cœur)
- **container.ts** : Le "Composition Root". C'est ici que l'on instancie les repositories et que l'on injecte les dépendances dans les services.
- L'UI doit consommer les services UNIQUEMENT via cet export `container`.

### 4. `ui/` (Le Visage)
- Composants React (Framer Motion, Tailwind).
- **Règle d'or** : L'UI demande des données ou déclenche des actions, elle ne calcule rien.
- Utilisez `config.ts` pour tout ce qui est contenu textuel ou tokens de design.

---

## 🎨 Règles de Design & UX

### 1. Esthétique Premium
- Utilisez des gradients subtils, du **glassmorphism** (`glass-dark`), et des animations **Framer Motion**.
- Les couleurs doivent être harmonieuses (ex: Noir #0B0B0F et Or #D4AF37 pour le VTC).

### 2. Configuration Centralisée
- Modifiez `config.ts` pour changer les textes, les tarifs ou les couleurs globales.
- Ne hardcodez JAMAIS de chaînes de caractères dans les composants si elles peuvent être configurées.

---

## 🚀 Workflow pour ajouter une fonctionnalité

1. **Domain** : Créer l'entité dans `core/domain`.
2. **Ports** : Si besoin d'accès aux données, créer l'interface dans `core/ports`.
3. **Application** : Créer le service/use-case dans `core/application`.
4. **Infra** : Implémenter le repository dans `infra/` si nécessaire.
5. **Container** : Enregistrer le nouveau service dans `lib/container.ts`.
6. **UI** : Créer le composant et appeler le service via `container.services.monService.execute()`.

---

## 🚫 Ne faites JAMAIS ceci :
- Importer `CONFIG` dans le `core` (Passer les paramètres au service ou via un port).
- Faire des calculs complexes (prix, validation) directement dans un composant React.
- Installer des bibliothèques UI lourdes sans version spécifique.
- Casser le typage TypeScript (Évitez les `any`).

---

*Ce document fait partie intégrante du projet. Merci de le respecter pour assurer la longévité du code.*
