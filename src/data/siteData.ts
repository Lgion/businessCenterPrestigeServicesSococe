export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  popularTag: string;
  image: string;
  icon: string;
  items: string[];
  actionText: string;
  actionMessage: string;
}

export interface SeasonalProduct {
  id: string;
  seasonId: string;
  name: string;
  price: number;
  badge: string;
  description: string;
  image: string;
}

export interface SeasonCategory {
  id: string;
  name: string;
  tag: string;
  promo: string;
  description: string;
}

export interface PricingItem {
  id: string;
  title: string;
  category: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaMessage: string;
}

export interface BoutiqueProduct {
  id: string;
  category: string;
  name: string;
  price: number;
  badge: string;
  description: string;
  image: string;
  inStock: boolean;
}

export interface SiteData {
  business: {
    name: string;
    tradeName: string;
    shortName: string;
    tagline: string;
    description: string;
    address: string;
    shortAddress: string;
    landmark: string;
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    whatsappPreFilled: string;
    openingHours: string;
    scheduleNote: string;
    openTime: string;
    closeTime: string;
    deliveryAvailable: boolean;
    deliveryNote: string;
    googleMapsUrl: string;
    googleMapsEmbed: string;
  };
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
  };
  wavePayment: {
    merchantName: string;
    locationSubtitle: string;
    merchantPhone: string;
    merchantId: string;
    defaultAmount: number;
    presetAmounts: number[];
    partnerBanks: string;
  };
  services: ServicePillar[];
  seasonalShowcase: {
    title: string;
    subtitle: string;
    activeSeasonId: string;
    seasons: SeasonCategory[];
    products: SeasonalProduct[];
  };
  pricingPackages: PricingItem[];
  boutiqueProducts: BoutiqueProduct[];
  reasonsToChoose: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const defaultSiteData: SiteData = {
  business: {
    name: "BUSINESS CENTER PRESTIGE SERVICES",
    tradeName: "Business Inter Prestige Services",
    shortName: "Prestige Services",
    tagline: "Studio Photo Pro • Réparation High-Tech • Boutique & Mobile Money",
    description: "Votre pôle d'excellence multiservices au sein du Super U Deux Plateaux (Gare de Sococé), Abidjan. Studio photo d'art, réparation smartphones en 30 minutes, accessoires tech certifiés, maroquinerie de prestige et transferts d'argent sécurisés.",
    address: "Au sein du Centre Commercial Super U, Boulevard des Martyrs, Deux Plateaux (proximité Gare de Sococé), Cocody, Abidjan",
    shortAddress: "Super U Deux Plateaux (Gare de Sococé), Abidjan",
    landmark: "À l'intérieur du Super U Deux Plateaux (accès sécurisé avec parking surveillé)",
    phone: "0789083085",
    phoneFormatted: "+225 07 89 08 30 85",
    whatsapp: "0544263245",
    whatsappFormatted: "+225 05 44 26 32 45",
    whatsappPreFilled: "Bonjour Business Center Prestige Services, je vous contacte depuis votre site web pour une demande d'information / devis.",
    openingHours: "Lundi au Samedi : 09h00 - 20h00",
    scheduleNote: "Sans interruption de 09h à 20h • Fermé le Dimanche",
    openTime: "09:00",
    closeTime: "20:00",
    deliveryAvailable: true,
    deliveryNote: "Livraison express sécurisée sur l'ensemble d'Abidjan (Cocody, Plateau, Marcory, Yopougon, Riviera) & retrait comptoir gratuit au Super U.",
    googleMapsUrl: "https://maps.google.com/?q=Super+U+Deux+Plateaux+Abidjan",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.3551528628045!2d-3.998492824249114!3d5.362692294616223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea49e4da747d%3A0xc3b8398b7e28b8a5!2sSuper%20U%20Deux%20Plateaux!5e0!3m2!1sfr!2sci!4v1700000000000!5m2!1sfr!2sci"
  },
  announcement: {
    enabled: true,
    badge: "AU SUPER U DEUX PLATEAUX",
    text: "Ouvert du Lundi au Samedi de 09h à 20h • Shooting express & Réparation en 30 min • Devis gratuit sur WhatsApp",
    linkText: "Contacter le service client"
  },
  wavePayment: {
    merchantName: "BUSINESS CENTER PRESTIGE SERVICES",
    locationSubtitle: "Super U Deux Plateaux • Cocody, Abidjan",
    merchantPhone: "0544263245",
    merchantId: "BCPS-ABJ-01",
    defaultAmount: 10000,
    presetAmounts: [5000, 10000, 15000, 20000, 30000, 50000],
    partnerBanks: "UBA • ORABANK"
  },
  services: [
    {
      id: "studio-photo",
      number: "01",
      title: "Studio Photo & Vidéo Professionnel",
      subtitle: "Capturer vos émotions avec un éclairage et une finition de maître",
      badge: "Signature Prestige",
      popularTag: "Service n°1",
      image: "/images/photo-studio.jpg",
      icon: "camera",
      items: [
        "Shooting photo studio solo, couple, famille & portraits corporate",
        "Photo d'identité certifiée (passeport, visa, concours, permis en 5 min)",
        "Tirage numérique haute définition & agrandissement grand format",
        "Restauration minutieuse de photos anciennes & retouches expertes",
        "Reportage photo & vidéo événementiel (mariages, baptêmes, galas)"
      ],
      actionText: "Réserver un Shooting",
      actionMessage: "Bonjour, je souhaite réserver une séance photo au studio / me renseigner sur les tarifs de shooting."
    },
    {
      id: "reparation-express",
      number: "02",
      title: "Réparation Express Smartphones & Tech",
      subtitle: "Diagnostic précis et remise en état rapide de vos appareils",
      badge: "Prêt en 30 min",
      popularTag: "Pièces Garanties",
      image: "/images/tech-repair.jpg",
      icon: "wrench",
      items: [
        "Remplacement écran fissuré (iPhone, Samsung, Xiaomi, Tecno, Infinix)",
        "Changement de batterie usée & connecteur de charge défaillant",
        "Déblocage système, suppression de codes & récupération de données",
        "Remplacement caméras, haut-parleurs et boutons latéraux",
        "Diagnostic transparent et devis gratuit avant toute intervention"
      ],
      actionText: "Devis Réparation Immédiat",
      actionMessage: "Bonjour, j'ai besoin d'un devis de réparation pour mon téléphone (marque / modèle / problème) :"
    },
    {
      id: "electronique-gaming",
      number: "03",
      title: "Électronique, Accessoires & Gaming",
      subtitle: "Le meilleur de la connectique, du son et du divertissement",
      badge: "Marques Certifiées",
      popularTag: "Gaming & Accessoires",
      image: "/images/hero-store.jpg",
      icon: "cpu",
      items: [
        "Smartphones neufs & reconditionnés garantis, tablettes et PC",
        "Univers Gaming : Manettes PS2, PS3, PS4, PS5, consoles et jeux vidéo",
        "Câbles blindés haute résistance & chargeurs ultra-rapides smartphone / PC",
        "Casques audio immersifs, écouteurs sans fil, souris et claviers",
        "Power banks haute capacité, verres trempés 9D et coques antichoc de luxe"
      ],
      actionText: "Consulter la Boutique Tech",
      actionMessage: "Bonjour, je recherche un accessoire ou une manette de jeu. Avez-vous en stock :"
    },
    {
      id: "boutique-cadeaux",
      number: "04",
      title: "Boutique Cadeaux, Montres & Maroquinerie",
      subtitle: "Élégance du quotidien, maroquinerie soignée et articles cadeaux",
      badge: "Sélection Exclusive",
      popularTag: "Idée Cadeau",
      image: "/images/boutique-gifts.jpg",
      icon: "gift",
      items: [
        "Cadres photo raffinés en bois noble, métal doré et verre biseauté",
        "Bijoux étincelants pour hommes, femmes et enfants (chaînes, gourmettes)",
        "Montres de prestige & service de remplacement immédiat de pile de montre et clé auto",
        "Maroquinerie fine : sacs à main femmes, sacoches hommes, portefeuilles élégants",
        "Sacs à dos scolaires ergonomiques, gourdes isothermes design, calculatrices"
      ],
      actionText: "Voir les Articles Cadeaux",
      actionMessage: "Bonjour, j'aimerais voir vos modèles de montres, sacs ou bijoux disponibles en boutique."
    },
    {
      id: "bureautique-transferts",
      number: "05",
      title: "Bureautique, Démarches & Mobile Money",
      subtitle: "Vos démarches administratives et opérations financières simplifiées",
      badge: "Guichet Unique",
      popularTag: "Mobile Money Intégré",
      image: "/images/hero-store.jpg",
      icon: "file-text",
      items: [
        "Photocopies et impressions haute fidélité (noir & blanc et couleur laser)",
        "Saisie de documents, rédaction de CV percutants, mémoires et reliures",
        "Assistance démarches administratives & inscriptions aux concours officiels",
        "Numérisation haute définition vers email, clé USB ou WhatsApp",
        "Agence Mobile Money officielle : Dépôts & Retraits Wave, Orange Money, MTN, Push"
      ],
      actionText: "Imprimer / Démarche Rapide",
      actionMessage: "Bonjour, je souhaite imprimer des documents ou faire une démarche administrative."
    }
  ],
  seasonalShowcase: {
    title: "Encart Dynamique : La Vitrine Saisonnière",
    subtitle: "Des offres exclusives et des produits sélectionnés selon les moments phares de l'année à Abidjan",
    activeSeasonId: "rentree",
    seasons: [
      {
        id: "rentree",
        name: "🎒 Rentrée Scolaire & Bureautique",
        tag: "Spécial Rentrée",
        promo: "-15% sur les packs fournitures & sacs",
        description: "Équipez vos enfants et étudiants avec des sacs à dos résistants, calculatrices scientifiques et forfaits d'impressions de cours."
      },
      {
        id: "noel",
        name: "🎄 Fêtes de Fin d'Année & Noël",
        tag: "Féerie de Noël",
        promo: "Peluches, montres & cadres cadeaux",
        description: "Des cadeaux inoubliables pour toute la famille, emballages cadeaux offerts et coffrets surprises."
      },
      {
        id: "mariages",
        name: "💍 Cérémonies, Mariages & Galas",
        tag: "Moments d'Émotion",
        promo: "Pack Shooting + Album offert",
        description: "Sublimez votre union avec notre équipe photo et vidéo dédiée pour immortaliser le plus beau jour de votre vie."
      },
      {
        id: "hightech",
        name: "⚡ High-Tech & Gaming Days",
        tag: "Promo Gaming",
        promo: "Manettes PS4/PS5 & Power banks",
        description: "Accessoires gaming et connectique rapide au meilleur prix du marché, testés sur place."
      }
    ],
    products: [
      {
        id: "prod-1",
        seasonId: "rentree",
        name: "Sac à Dos Ergonomique Grand Confort",
        price: 18000,
        badge: "Top Vente Rentrée",
        description: "Ultra résistant, multi-poches avec compartiment PC renforcé et bretelles matelassées.",
        image: "/images/boutique-gifts.jpg"
      },
      {
        id: "prod-2",
        seasonId: "rentree",
        name: "Pack Photo Identité Express (8 photos)",
        price: 2500,
        badge: "Prêt en 5 min",
        description: "Normes passeport biométrique, visa, concours d'entrée et dossiers scolaires.",
        image: "/images/photo-studio.jpg"
      },
      {
        id: "prod-3",
        seasonId: "rentree",
        name: "Gourde Isotherme Inox 750ml Prestige",
        price: 6500,
        badge: "Garde 24h frais",
        description: "Double paroi isolante, finitions dorées ou noires mat, étanche et durable.",
        image: "/images/boutique-gifts.jpg"
      },
      {
        id: "prod-4",
        seasonId: "noel",
        name: "Peluches Géantes & Coffrets Fêtes",
        price: 15000,
        badge: "Coup de Cœur Noël",
        description: "Peluches ultra douces pour émerveiller les tout-petits et faire un cadeau chaleureux.",
        image: "/images/boutique-gifts.jpg"
      },
      {
        id: "prod-5",
        seasonId: "noel",
        name: "Montre Homme Chronographe Édition Or",
        price: 28000,
        badge: "Coffret Cadeau",
        description: "Boîtier acier doré, bracelet cuir texturé avec pile haute autonomie garantie.",
        image: "/images/boutique-gifts.jpg"
      },
      {
        id: "prod-6",
        seasonId: "mariages",
        name: "Pack Mariage : Reportage Photo & Vidéo",
        price: 150000,
        badge: "Formule Complète",
        description: "Couverture cérémonie religieuse, civile et réception + album livre prestige remis.",
        image: "/images/photo-studio.jpg"
      },
      {
        id: "prod-7",
        seasonId: "hightech",
        name: "Manette Sans Fil DualShock & PS5 Pro",
        price: 25000,
        badge: "Gaming Premium",
        description: "Précision millimétrée, autonomie renforcée et compatibilité parfaite.",
        image: "/images/tech-repair.jpg"
      },
      {
        id: "prod-8",
        seasonId: "hightech",
        name: "Power Bank Fast Charge 20 000 mAh",
        price: 14000,
        badge: "Charge Rapide PD",
        description: "Recharge jusqu'à 4 fois votre téléphone, affichage LED de batterie restante.",
        image: "/images/tech-repair.jpg"
      }
    ]
  },
  pricingPackages: [
    {
      id: "pack-identite",
      title: "Photos d'Identité Express",
      category: "Studio Photo",
      price: "2 500 FCFA",
      period: "la planche de 8",
      features: [
        "Prise de vue immédiate sans rendez-vous",
        "Validation aux normes officielles (Passeport, Visa, Concours)",
        "Retouche légère anti-reflet & teint éclatant",
        "Impression sur papier photo argentique HD",
        "Envoi de la version numérique par WhatsApp"
      ],
      ctaText: "Faire mes photos d'identité",
      ctaMessage: "Bonjour, je souhaite faire des photos d'identité express au Super U."
    },
    {
      id: "pack-shooting",
      title: "Shooting Studio Portrait d'Art",
      category: "Studio Photo",
      price: "15 000 FCFA",
      period: "la séance",
      popular: true,
      features: [
        "Séance en studio privatisé avec éclairage de cinéma",
        "Conseil en pose & changement de tenue possible",
        "5 photos retouchées en ultra-haute résolution",
        "1 tirage grand format offert (A4 prestige)",
        "Livraison des fichiers numériques haute définition"
      ],
      ctaText: "Réserver mon Shooting",
      ctaMessage: "Bonjour, je souhaite réserver une séance shooting studio portrait."
    },
    {
      id: "pack-reparation",
      title: "Remplacement Écran Smartphone",
      category: "Réparation",
      price: "Sur Devis",
      period: "garantie 3 mois",
      features: [
        "Pièces d'origine & compatibles haut de gamme certifiées",
        "Intervention en 30 à 45 minutes sur place",
        "Nettoyage interne & test complet des capteurs",
        "Pose offerte d'un verre trempé anti-casse",
        "Garantie 3 mois sur la réparation effectuée"
      ],
      ctaText: "Demander mon Devis WhatsApp",
      ctaMessage: "Bonjour, quel est le tarif pour changer l'écran de mon téléphone :"
    },
    {
      id: "pack-impressions",
      title: "Forfait Impression & Reliure",
      category: "Bureautique",
      price: "Dégressif",
      period: "dès 50 F la page",
      features: [
        "Laser noir & blanc et couleur haute précision",
        "Papier 80g à 250g couché ou cartonné",
        "Reliure spirale plastique ou métallique",
        "Plastification de documents officiels",
        "Réductions importantes pour mémoires & gros volumes"
      ],
      ctaText: "Envoyer mes fichiers à imprimer",
      ctaMessage: "Bonjour, j'ai des documents PDF à imprimer en volume, voici les détails :"
    }
  ],
  boutiqueProducts: [
    {
      id: "btq-1",
      category: "gaming",
      name: "Manette Sans Fil PS4 DualShock v2",
      price: 22000,
      badge: "Top Vente Gaming",
      description: "Manette officielle sans fil, vibrations immersives, pavé tactile et batterie rechargeable haute tenue.",
      image: "/images/hero-store.jpg",
      inStock: true
    },
    {
      id: "btq-2",
      category: "gaming",
      name: "Manette Sans Fil PS5 DualSense Pro",
      price: 45000,
      badge: "Next-Gen",
      description: "Retour haptique dynamique, gâchettes adaptatives et microphone intégré.",
      image: "/images/hero-store.jpg",
      inStock: true
    },
    {
      id: "btq-3",
      category: "accessoires",
      name: "Câble Blindé Tressé Charge Rapide (Type-C / Lightning)",
      price: 4500,
      badge: "Ultra Résistant",
      description: "Gaine nylon renforcée anti-pliure, transfert de données 480 Mbps et charge rapide jusqu'à 65W.",
      image: "/images/tech-repair.jpg",
      inStock: true
    },
    {
      id: "btq-4",
      category: "accessoires",
      name: "Chargeur Secteur Rapide 35W Duo USB-C",
      price: 9500,
      badge: "Charge Rapide",
      description: "Double port USB-C Power Delivery, charge simultanément deux téléphones en toute sécurité.",
      image: "/images/tech-repair.jpg",
      inStock: true
    },
    {
      id: "btq-5",
      category: "accessoires",
      name: "Power Bank Fast Charge 20 000 mAh avec Écran LED",
      price: 16000,
      badge: "Haute Autonomie",
      description: "Capacité réelle de 20 000 mAh, écran d'affichage du pourcentage et multiples sorties rapides.",
      image: "/images/tech-repair.jpg",
      inStock: true
    },
    {
      id: "btq-6",
      category: "maroquinerie",
      name: "Sac à Dos Ergonomique Imperméable Écolier & PC",
      price: 18000,
      badge: "Spécial Rentrée",
      description: "Multi-compartiments matelassés pour ordinateur portable, dos respirant et fermeture sécurisée.",
      image: "/images/boutique-gifts.jpg",
      inStock: true
    },
    {
      id: "btq-7",
      category: "maroquinerie",
      name: "Sacoche Homme Cuir Vintage Élégance",
      price: 24000,
      badge: "Cuir Véritable",
      description: "Finition artisanale soignée, bandoulière réglable, poches zippées pour tablette et documents.",
      image: "/images/boutique-gifts.jpg",
      inStock: true
    },
    {
      id: "btq-8",
      category: "maroquinerie",
      name: "Sac à Main Femme Collection Prestige",
      price: 28000,
      badge: "Édition Limitée",
      description: "Design intemporel avec détails dorés, bandoulière amovible et finitions de haute maroquinerie.",
      image: "/images/boutique-gifts.jpg",
      inStock: true
    },
    {
      id: "btq-9",
      category: "montres",
      name: "Montre Homme Chronographe Acier & Or",
      price: 32000,
      badge: "Pile Incluse + Garantie",
      description: "Mouvement quartz japonais de précision, boîtier résistant à l'eau, pile longue durée offerte.",
      image: "/images/boutique-gifts.jpg",
      inStock: true
    },
    {
      id: "btq-10",
      category: "montres",
      name: "Montre Femme Cadran Nacré & Bracelet Maille",
      price: 26000,
      badge: "Finesse & Luxe",
      description: "Écrin cadeau inclus, verre minéral résistant aux rayures et bracelet maille milanaise dorée.",
      image: "/images/boutique-gifts.jpg",
      inStock: true
    },
    {
      id: "btq-11",
      category: "cadeaux",
      name: "Gourde Isotherme Inox 750ml Double Paroi",
      price: 6500,
      badge: "24h Frais / 12h Chaud",
      description: "Inox alimentaire de qualité supérieure, bouchon étanche antifuite, finition mate élégante.",
      image: "/images/boutique-gifts.jpg",
      inStock: true
    },
    {
      id: "btq-12",
      category: "cadeaux",
      name: "Cadre Photo Prestige Bois Doré & Verre Biseauté",
      price: 8500,
      badge: "Fabrication d'Art",
      description: "Idéal pour sublimer vos tirages de portrait studio ou offrir lors d'un anniversaire et mariage.",
      image: "/images/photo-studio.jpg",
      inStock: true
    }
  ],
  reasonsToChoose: [
    {
      title: "Emplacement Sécurisé & Idéal",
      description: "Directement accessible au sein du centre commercial Super U Deux Plateaux, avec vaste parking surveillé et commodités.",
      icon: "shield-check"
    },
    {
      title: "Guichet Unique Tout-en-Un",
      description: "Studio photo, réparation, gaming, maroquinerie et Mobile Money sous le même toit : gagnez un temps précieux !",
      icon: "layers"
    },
    {
      title: "Rapidité & Clarté des Tarifs",
      description: "Photos prêtes en 5 minutes, réparations en 30 minutes, devis gratuits transparents sans mauvaise surprise.",
      icon: "zap"
    },
    {
      title: "Paiement Wave & Mobile Money",
      description: "Réglez directement vos prestations via Wave avec QR code interactif ou Mobile Money (Orange, MTN, Push).",
      icon: "smartphone"
    }
  ],
  faqs: [
    {
      question: "Où êtes-vous exactement situés à Deux Plateaux ?",
      answer: "Nous sommes installés à l'intérieur de la galerie marchande du Super U Deux Plateaux, situé sur le Boulevard des Martyrs, juste à proximité du carrefour et de la Gare de Sococé. L'accès est simple et dispose d'un grand parking surveillé."
    },
    {
      question: "Faut-il obligatoirement prendre rendez-vous pour une photo ou une réparation ?",
      answer: "Non, pour les photos d'identité, les réparations express d'écrans, la boutique et la bureautique, nous vous accueillons directement sans rendez-vous de 09h00 à 20h00. Pour les séances shooting portraits complets ou les reportages cérémonies, une réservation sur WhatsApp est conseillée afin de bloquer le créneau idéal."
    },
    {
      question: "Proposez-vous la livraison à Abidjan pour les articles et tirages photos ?",
      answer: "Oui ! Nous assurons la livraison à domicile ou au bureau partout à Abidjan (Cocody, Plateau, Marcory, Riviera, Yopougon, etc.). Vous pouvez aussi choisir le retrait gratuit au comptoir en magasin."
    },
    {
      question: "Comment fonctionne le paiement par Wave ?",
      answer: "C'est ultra-simple : cliquez sur le bouton 'Paiement Wave' en haut ou en bas de page, saisissez le montant de votre facture ou choisissez un montant pré-défini, puis scannez le QR code ou cliquez sur 'Ouvrir dans Wave' sur votre mobile !"
    }
  ]
};
