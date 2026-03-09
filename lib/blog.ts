export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    imageUrl: string;
    content: string; // Markdown content
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "transfert-aeroport-cdg-vtc",
        title: "Comment optimiser votre transfert vers l'Aéroport CDG ?",
        description: "Découvrez pourquoi réserver un VTC privé est la solution la plus sereine et fiable pour vos départs et arrivées à Paris Charles de Gaulle depuis la Normandie.",
        date: "2026-03-09",
        author: "L'Équipe CARINE VTC",
        category: "Voyage d'Affaires",
        imageUrl: "/hero_bg.png", // Temporaire
        content: `
Atteindre l'Aéroport de Paris Charles de Gaulle (CDG) depuis Le Havre, Rouen ou Deauville peut vite devenir un parcours du combattant. Entre les correspondances de train incertaines et le stress lié à la conduite dans les embouteillages parisiens, votre voyage commence souvent dans la fatigue.

## La solution "Sérénité Absolue" : Le Chauffeur Privé

Opter pour un **transfert VTC privé**, c'est faire le choix de l'efficacité et du luxe. Nos chauffeurs viennent vous chercher directement à votre domicile ou à votre hôtel, s'occupent de vos bagages et vous déposent devant le terminal exact de votre vol.

### Les avantages de notre service :
- **Ponctualité garantie :** Nous suivons l'état du trafic en temps réel pour assurer une arrivée à l'heure, sans compromis.
- **Confort Classe Affaires :** Wi-Fi, rafraîchissements et presse à bord de nos berlines premium.
- **Tarif fixe et transparent :** Aucun surcoût lié aux bouchons, le prix est connu à l'avance.

### Pourquoi éviter les taxis de dernière minute ?
Les files d'attente à l'aéroport ou la recherche d'un taxi à 4h le matin peuvent être très anxiogènes. Avec une réservation à l'avance, votre *Chauffeur CARINE VTC* vous attend avec une pancarte personnalisée dans le hall des arrivées de CDG, prêt à vous ramener chez vous en tout confort.

*Réservez votre prochain transfert aéroport directement sur notre site et commencez vos vacances (ou votre voyage d'affaires) dès la porte de votre domicile !*
        `
    },
    {
        slug: "visiter-normandie-chauffeur-prive",
        title: "Visiter les Plages du Débarquement et la Normandie sans stress",
        description: "Explorez Omaha Beach, le Mont-Saint-Michel ou Deauville au rythme de vos envies, en vous laissant conduire par un expert local.",
        date: "2026-03-01",
        author: "Alexandre - Chauffeur Expert",
        category: "Tourisme Premium",
        imageUrl: "/hero_bg.png",
        content: `
La Normandie est une région d'une richesse historique et culturelle exceptionnelle. Du Mont-Saint-Michel aux Plages du Débarquement, en passant par les falaises d'Étretat et le charme de Honfleur, chaque recoin mérite d'être exploré.

Toutefois, orchestrer soi-même une telle tournée peut s'avérer complexe, surtout en haute saison.

## La Mise à Disposition : Votre Pass Liberté

Pour ceux qui souhaitent découvrir la région sans la contrainte du GPS, du stationnement ou de la fatigue de conduite, notre service de **mise à disposition** est la solution idéale.

Vous louez les services exclusifs de votre chauffeur privé pour une demi-journée ou plusieurs jours.

### Ce que comprend notre service touristique :
1. **Un itinéraire sur-mesure :** Vous décidez de l'itinéraire, nous vous conseillons sur les temps de trajet optimaux.
2. **Une présence discrète :** Votre chauffeur vous dépose au plus près des monuments et vous attend pendant vos visites.
3. **Une expertise locale :** Accédez aux meilleures adresses gastronomiques que seules les personnes de la région connaissent.

Que vous soyez un passionné d'histoire souhaitant vous recueillir à Omaha Beach, ou en quête de romantisme à Deauville, confiez le volant à un professionnel de la route et concentrez-vous sur l'essentiel : profiter du paysage normand.
        `
    }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
    return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
