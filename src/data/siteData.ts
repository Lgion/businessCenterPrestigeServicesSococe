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
  mainSection?: 'hightech' | 'maroquinerie';
  name: string;
  price: number;
  badge: string;
  description: string;
  image: string;
  inStock: boolean;
}

export interface YangoTier {
  id: string;
  zone: string;
  distance: string;
  price: number;
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
  yangoDelivery: {
    enabled: boolean;
    tiers: YangoTier[];
  };
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
      image: "/images/service-studio-photo.jpg",
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
      image: "/images/service-tech-repair.jpg",
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
      id: "boutique-produits",
      number: "03",
      title: "Boutique Prestige : High-Tech & Maroquinerie",
      subtitle: "Le meilleur de la connectique, du gaming, des sacs de luxe & montres",
      badge: "Rayons Certifiés",
      popularTag: "High-Tech & Maroquinerie",
      image: "/images/service-gaming-tech.jpg",
      icon: "shopping-bag",
      items: [
        "Produits High-Tech & Gaming : Manettes PS4/PS5, câbles blindés, chargeurs rapides, écouteurs, power banks",
        "Maroquinerie fine : Sacs à main femmes, sacoches hommes, portefeuilles élégants en cuir véritable",
        "Horlogerie & Piles : Montres de prestige, service de remplacement immédiat de pile de montre et clé auto",
        "Bijoux & Idées Cadeaux : Chaînes, gourmettes étincelantes et cadres photo raffinés",
        "Scolaire & Accessoires : Sacs à dos ergonomiques, calculatrices scientifiques et gourdes isothermes"
      ],
      actionText: "Ouvrir la Boutique",
      actionMessage: "Bonjour, je souhaite commander un article en boutique (High-Tech ou Maroquinerie) :"
    },
    {
      id: "bureautique-pao",
      number: "04",
      title: "Bureautique, Impression & PAO Professionnelle",
      subtitle: "Impressions haute fidélité, reliures soignées, création graphique & démarches",
      badge: "Atelier Pro",
      popularTag: "Impression Laser HD",
      image: "/images/service-bureautique-transferts.jpg",
      icon: "printer",
      items: [
        "Photocopies et impressions laser haute fidélité (noir & blanc et couleur)",
        "PAO & Création Graphique : Conception & impression de flyers, cartes de visite, affiches et bâches",
        "Saisie de documents, rédaction de CV percutants, mémoires d'études et reliures spirales",
        "Assistance démarches administratives officielles & inscriptions aux concours (ENA, CAFOP, Police)",
        "Numérisation haute définition 600 DPI vers email, clé USB ou WhatsApp"
      ],
      actionText: "Imprimer / Projet PAO",
      actionMessage: "Bonjour, j'ai des documents ou un projet d'impression / PAO à réaliser au Super U :"
    },
    {
      id: "mobile-money",
      number: "05",
      title: "Guichet Agréé Mobile Money & Transferts",
      subtitle: "Dépôts, retraits et transferts d'argent sécurisés sans rupture de liquidité",
      badge: "Zéro Rupture",
      popularTag: "Guichet Express VIP",
      image: "/images/service-mobile-money.jpg",
      icon: "wallet",
      items: [
        "Wave Mobile Money : Dépôts et retraits express sécurisés via QR Code",
        "Orange Money & MTN MoMo : Dépôts, transferts régionaux et retraits instantanés",
        "Moov Money & Push : Toutes opérations financières et recharges de crédit",
        "Code Coupe-File VIP en ligne pour un passage prioritaire sans file d'attente au guichet",
        "Guichet climatisé, confidentiel et sécurisé au sein du Super U avec parking surveillé"
      ],
      actionText: "Passage Mobile Money Express",
      actionMessage: "Bonjour, je souhaite effectuer une opération Mobile Money (Wave / Orange / MTN) :"
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
      id: "pack-mariage",
      title: "Couverture Mariage & Cérémonie",
      category: "Studio Photo",
      price: "150 000 FCFA",
      period: "formule complète",
      features: [
        "Couverture mairie, église / mosquée et vin d'honneur",
        "Photographe et cadreur vidéo professionnels dédiés",
        "Album livre photo relié grand format prestige",
        "Clé USB personnalisée avec toutes les photos HD",
        "Film rétrospective monté et étalonné en 4K"
      ],
      ctaText: "Devis Mariage & Cérémonie",
      ctaMessage: "Bonjour, je souhaite des informations sur le pack Mariage / Cérémonie."
    },
    {
      id: "pack-reparation-ecran",
      title: "Remplacement Écran Smartphone",
      category: "Réparation Tech",
      price: "Sur Devis",
      period: "dès 12 000 F • garantie 3 mois",
      popular: true,
      features: [
        "Écrans OLED & LCD d'origine certifiés toutes marques",
        "Intervention express en 30 minutes sur place",
        "Nettoyage interne & test complet des capteurs",
        "Pose offerte d'un verre trempé haute protection 9D",
        "Option coursier Yango disponible à domicile"
      ],
      ctaText: "Demander Devis Écran",
      ctaMessage: "Bonjour, j'ai besoin d'un devis pour changer l'écran de mon smartphone :"
    },
    {
      id: "pack-reparation-batterie",
      title: "Changement Batterie Haute Tenue",
      category: "Réparation Tech",
      price: "Sur Devis",
      period: "dès 8 000 F • prêt en 20 min",
      features: [
        "Batteries neuves de qualité d'origine certifiées",
        "Remplacement express en 20 minutes chrono",
        "Diagnostic complet du circuit de charge offert",
        "Garantie 3 mois sur la pièce installée",
        "Possibilité d'enlèvement et retour via Yango"
      ],
      ctaText: "Devis Batterie Neuve",
      ctaMessage: "Bonjour, je souhaite faire remplacer la batterie de mon téléphone :"
    },
    {
      id: "pack-chargeur",
      title: "Pack Charge Rapide 35W Duo & Câble",
      category: "Gaming & High-Tech",
      price: "13 000 FCFA",
      period: "pack certifié",
      features: [
        "Bloc secteur 35W Power Delivery à double port USB-C",
        "Câble blindé nylon tressé 2 mètres ultra résistant",
        "Protection anti-surtension & régulation thermique",
        "Compatible iPhone, Samsung, Xiaomi et consoles",
        "Garantie remplacement 6 mois au Super U"
      ],
      ctaText: "Commander ce Pack Tech",
      ctaMessage: "Bonjour, je souhaite réserver le Pack Charge Rapide 35W Duo."
    },
    {
      id: "pack-gaming",
      title: "Manette Sans Fil PS4 / PS5 Gamer Pro",
      category: "Gaming & High-Tech",
      price: "25 000 FCFA",
      period: "manette neuve garantie",
      features: [
        "Manette sans fil officielle avec vibrations immersives",
        "Batterie rechargeable longue tenue & pavé tactile précis",
        "Testée et vérifiée sur console avant retrait",
        "Câble de recharge offert inclus",
        "Retrait comptoir immédiat ou livraison Abidjan"
      ],
      ctaText: "Réserver ma Manette",
      ctaMessage: "Bonjour, je souhaite réserver une manette PS4/PS5 gamer."
    },
    {
      id: "pack-montre",
      title: "Montre Chronographe & Pile Incluse",
      category: "Maroquinerie & Montres",
      price: "32 000 FCFA",
      period: "coffret cadeau prestige",
      popular: true,
      features: [
        "Boîtier acier inoxydable & bracelet cuir ou maille milanaise",
        "Mouvement quartz haute précision & cadran soigné",
        "Remplacement de pile gratuit à vie au magasin",
        "Écrin velours & emballage cadeau de luxe offerts",
        "Gravure personnalisée disponible sur demande"
      ],
      ctaText: "Voir les Montres Disponibles",
      ctaMessage: "Bonjour, je souhaite voir les modèles de montres du coffret prestige."
    },
    {
      id: "pack-impressions",
      title: "Forfait Impression & Reliure Dossier",
      category: "Bureautique & Documents",
      price: "Dégressif",
      period: "dès 50 F la page",
      features: [
        "Impression laser haute fidélité noir & blanc et couleur",
        "Papier 80g à 250g couché ou cartonné de qualité",
        "Reliure spirale plastique ou métallique avec transparents",
        "Plastification de documents officiels et diplômes",
        "Envoi de vos fichiers PDF par WhatsApp avant passage"
      ],
      ctaText: "Envoyer mes fichiers à imprimer",
      ctaMessage: "Bonjour, j'ai des documents PDF à imprimer en volume, voici les détails :"
    },
    {
      id: "pack-pao",
      title: "Pack 100 Flyers ou Cartes de Visite",
      category: "Bureautique & Documents",
      price: "18 000 FCFA",
      period: "les 100 exemplaires",
      features: [
        "Impression offset ou numérique couleur recto/verso",
        "Papier épais 300g couché brillant ou mat de prestige",
        "Aide à la mise en page et vérification du fichier offerte",
        "Livraison sous 24h à 48h au Super U",
        "Idéal pour commerçants, entreprises et événements"
      ],
      ctaText: "Commander Flyers / Cartes",
      ctaMessage: "Bonjour, je souhaite imprimer des flyers ou cartes de visite."
    }
  ],
  boutiqueProducts: [
    {
      id: "btq-1",
      category: "gaming",
      mainSection: "hightech",
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
      mainSection: "hightech",
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
      mainSection: "hightech",
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
      mainSection: "hightech",
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
      mainSection: "hightech",
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
      mainSection: "maroquinerie",
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
      mainSection: "maroquinerie",
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
      mainSection: "maroquinerie",
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
      mainSection: "maroquinerie",
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
      mainSection: "maroquinerie",
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
      mainSection: "maroquinerie",
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
      mainSection: "maroquinerie",
      name: "Cadre Photo Prestige Bois Doré & Verre Biseauté",
      price: 8500,
      badge: "Fabrication d'Art",
      description: "Idéal pour sublimer vos tirages de portrait studio ou offrir lors d'un anniversaire et mariage.",
      image: "/images/photo-studio.jpg",
      inStock: true
    }
  ],
  yangoDelivery: {
    enabled: true,
    tiers: [
      { id: "zone-1", zone: "Cocody Deux Plateaux / Vallon / Aghien", distance: "0 - 3 km", price: 1500 },
      { id: "zone-2", zone: "Riviera (2, 3, 4, Palmeraie, Bonoumin, Attoban)", distance: "3 - 8 km", price: 2500 },
      { id: "zone-3", zone: "Plateau / Adjamé / Marcory / Zone 4", distance: "8 - 15 km", price: 3500 },
      { id: "zone-4", zone: "Yopougon / Koumassi / Port-Bouët / Bingerville", distance: "15+ km", price: 5000 }
    ]
  },
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
