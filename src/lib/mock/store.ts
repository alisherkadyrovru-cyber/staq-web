import { City, Quest, QuestStep, Partner, Offer, UserProfile } from '../types';

// ─── Cities ───────────────────────────────────────────────────────────────────

export const MOCK_CITIES: City[] = [
  {
    id: 'city-istanbul',
    slug: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    isAvailable: true,
  },
  {
    id: 'city-barcelona',
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    isAvailable: false,
  },
  {
    id: 'city-tokyo',
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    isAvailable: false,
  },
  {
    id: 'city-lisbon',
    slug: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    coverImage: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800',
    isAvailable: false,
  },
];

// ─── Quests ───────────────────────────────────────────────────────────────────

export const MOCK_QUESTS: Quest[] = [
  {
    id: 'quest-old-city-walk',
    cityId: 'city-istanbul',
    title: 'Old City Walk',
    description:
      'Journey through the heart of Byzantine and Ottoman history. From the Sultanahmet to the Grand Bazaar, every cobblestone tells a story.',
    category: 'historical',
    difficulty: 'easy',
    durationMinutes: 90,
    distanceKm: 2.8,
    isPremium: false,
    priceUsd: 0,
    coverImage: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800',
    rating: 4.9,
    completionCount: 1243,
    startLocation: { latitude: 41.0062, longitude: 28.9778 },
    route: [
      { latitude: 41.0062, longitude: 28.9778 }, // Sultanahmet Square
      { latitude: 41.0054, longitude: 28.9768 }, // Blue Mosque
      { latitude: 41.0086, longitude: 28.9802 }, // Hagia Sophia
      { latitude: 41.0105, longitude: 28.9681 }, // Grand Bazaar
      { latitude: 41.0167, longitude: 28.9700 }, // Spice Bazaar
    ],
  },
  {
    id: 'quest-street-food-hunt',
    cityId: 'city-istanbul',
    title: 'Street Food Hunt',
    description:
      "Follow your nose through spice-filled markets and waterfront docks. Taste simit, balık ekmek, and the city's best börek.",
    category: 'gastronomy',
    difficulty: 'easy',
    durationMinutes: 75,
    distanceKm: 1.9,
    isPremium: false,
    priceUsd: 0,
    coverImage: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800',
    rating: 4.7,
    completionCount: 876,
    startLocation: { latitude: 41.0167, longitude: 28.9700 },
    route: [
      { latitude: 41.0167, longitude: 28.9700 },
      { latitude: 41.0173, longitude: 28.9712 },
      { latitude: 41.0188, longitude: 28.9731 },
      { latitude: 41.0195, longitude: 28.9745 },
    ],
  },
  {
    id: 'quest-hidden-gems-beyoglu',
    cityId: 'city-istanbul',
    title: 'Hidden Gems of Beyoğlu',
    description:
      'Discover secret courtyards, independent bookshops, and rooftop cafés tucked away in the bohemian streets of Beyoğlu.',
    category: 'hidden_gems',
    difficulty: 'medium',
    durationMinutes: 120,
    distanceKm: 3.4,
    isPremium: true,
    priceUsd: 0.49,
    coinPrice: 49,
    coverImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
    rating: 4.8,
    completionCount: 542,
    startLocation: { latitude: 41.0256, longitude: 28.9742 },
    route: [
      { latitude: 41.0256, longitude: 28.9742 },
      { latitude: 41.0271, longitude: 28.9759 },
      { latitude: 41.0285, longitude: 28.9770 },
      { latitude: 41.0299, longitude: 28.9776 },
      { latitude: 41.0314, longitude: 28.9782 },
      { latitude: 41.0328, longitude: 28.9794 },
    ],
  },
  {
    id: 'quest-istanbul-old-city-no-entrance',
    cityId: 'city-istanbul',
    title: 'Istanbul Old City Quest (No Entrance Tickets Required)',
    description:
      'Walk through 2,000 years of history in the Sultanahmet district without spending a single lira on entrance fees. From the ancient Hippodrome to the Eminönü waterfront, discover iconic monuments, local street life, and hidden corners — all from the outside.',
    category: 'historical',
    difficulty: 'easy',
    durationMinutes: 180,
    distanceKm: 4.5,
    isPremium: false,
    priceUsd: 0,
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    rating: 4.8,
    completionCount: 0,
    startLocation: { latitude: 41.0062, longitude: 28.9778 },
    route: [
      { latitude: 41.0062, longitude: 28.9778 }, // Sultanahmet Square
      { latitude: 41.0057, longitude: 28.9769 }, // German Fountain
      { latitude: 41.0063, longitude: 28.9769 }, // Hippodrome
      { latitude: 41.0065, longitude: 28.9773 }, // Obelisk of Theodosius
      { latitude: 41.0063, longitude: 28.9775 }, // Serpent Column
      { latitude: 41.0054, longitude: 28.9768 }, // Blue Mosque exterior
      { latitude: 41.0082, longitude: 28.9784 }, // Fountain / Hagia Sophia benches
      { latitude: 41.0068, longitude: 28.9782 }, // Chestnut vendor area
      { latitude: 41.0086, longitude: 28.9802 }, // Hagia Sophia exterior
      { latitude: 41.0115, longitude: 28.9842 }, // Topkapi outer gate
      { latitude: 41.0119, longitude: 28.9825 }, // Gülhane Park
      { latitude: 41.0139, longitude: 28.9753 }, // Sirkeci Station
      { latitude: 41.0167, longitude: 28.9700 }, // Spice Bazaar
      { latitude: 41.0165, longitude: 28.9690 }, // New Mosque
      { latitude: 41.0178, longitude: 28.9712 }, // Eminönü waterfront
    ],
  },
];

// ─── Quest Steps ──────────────────────────────────────────────────────────────

export const MOCK_STEPS: QuestStep[] = [
  // Old City Walk – 5 steps (updated per spec)
  {
    id: 'step-ocw-1',
    questId: 'quest-old-city-walk',
    order: 1,
    title: 'Sultanahmet Square',
    description:
      "You're standing at the crossroads of two empires. The Hippodrome once roared with 100,000 spectators here. Find the Egyptian Obelisk — it has stood in this spot for 3,500 years.",
    location: { latitude: 41.0062, longitude: 28.9778 },
    radius: 50,
    task: { type: 'arrive' },
    audioUrl: 'https://example.com/audio/ocw-step-1.mp3',
    pointsReward: 50,
  },
  {
    id: 'step-ocw-2',
    questId: 'quest-old-city-walk',
    order: 2,
    title: 'Blue Mosque Entrance',
    description:
      'The only mosque in Istanbul with six minarets. Stand at the main entrance — look up and count them all before you go inside.',
    location: { latitude: 41.0054, longitude: 28.9768 },
    radius: 30,
    task: {
      type: 'photo',
      question: 'Take a photo showing at least two of the six minarets.',
      hint: 'Step back toward Sultanahmet Square for the best angle.',
    },
    audioUrl: 'https://example.com/audio/ocw-step-2.mp3',
    pointsReward: 100,
  },
  {
    id: 'step-ocw-3',
    questId: 'quest-old-city-walk',
    order: 3,
    title: 'Hagia Sophia',
    description:
      'For nearly a thousand years this was the largest cathedral in the world. Emperor Justinian I reportedly said "Solomon, I have surpassed thee" when it was completed.',
    location: { latitude: 41.0086, longitude: 28.9802 },
    radius: 40,
    task: {
      type: 'quiz',
      question: 'In what year was Hagia Sophia completed?',
      options: ['537 AD', '632 AD', '330 AD', '1453 AD'],
      correctAnswer: '537 AD',
      hint: 'It was completed under Emperor Justinian I during the Byzantine era.',
    },
    audioUrl: 'https://example.com/audio/ocw-step-3.mp3',
    pointsReward: 75,
  },
  {
    id: 'step-ocw-4',
    questId: 'quest-old-city-walk',
    order: 4,
    title: 'Grand Bazaar Entrance',
    description:
      "One of the world's oldest and largest covered markets — over 4,000 shops across 60 streets. Look for the inscription above the main gate.",
    location: { latitude: 41.0105, longitude: 28.9681 },
    radius: 35,
    task: {
      type: 'text_input',
      question: 'Find the inscription above the Grand Bazaar main gate. What year does it show?',
      correctAnswer: '1461',
      hint: 'Look up at the arch above the Beyazit entrance.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-ocw-5',
    questId: 'quest-old-city-walk',
    order: 5,
    title: 'Spice Bazaar',
    description:
      'Follow the scent of saffron and dried figs to the Mısır Çarşısı. This L-shaped market has been selling spices since 1664.',
    location: { latitude: 41.0167, longitude: 28.9700 },
    radius: 30,
    task: {
      type: 'photo',
      question: 'Take a photo of the most colourful stall you can find inside.',
      hint: 'The spice pyramids and dried fruit displays are the most photogenic.',
    },
    audioUrl: 'https://example.com/audio/ocw-step-5.mp3',
    pointsReward: 150,
  },

  // Street Food Hunt – 4 steps
  {
    id: 'step-sfh-1',
    questId: 'quest-street-food-hunt',
    order: 1,
    title: 'Spice Bazaar (Mısır Çarşısı)',
    description:
      'Let the scent of saffron, sumac, and dried figs guide you in. This 17th-century market has fed Istanbul for over 350 years.',
    location: { latitude: 41.0167, longitude: 28.9700 },
    radius: 80,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-sfh-2',
    questId: 'quest-street-food-hunt',
    order: 2,
    title: 'Simit Cart',
    description:
      "Find a street vendor selling simit — Istanbul's iconic sesame-crusted bread ring. Buy one and take a photo eating it by the water.",
    location: { latitude: 41.0173, longitude: 28.9712 },
    radius: 100,
    task: {
      type: 'photo',
      question: 'Take a photo of yourself holding or eating a simit.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-sfh-3',
    questId: 'quest-street-food-hunt',
    order: 3,
    title: 'Balık Ekmek Boats',
    description:
      'The famous fish sandwich boats bob on the Golden Horn. The smell of grilled mackerel will reach you before you see them.',
    location: { latitude: 41.0188, longitude: 28.9731 },
    radius: 80,
    task: {
      type: 'quiz',
      question: 'What fish is traditionally used in balık ekmek?',
      options: ['Sardine', 'Mackerel', 'Sea bass', 'Anchovy'],
      correctAnswer: 'Mackerel',
      hint: "It's a fatty, oily fish common in the Bosphorus.",
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-sfh-4',
    questId: 'quest-street-food-hunt',
    order: 4,
    title: 'Eminönü Waterfront',
    description:
      "Finish at the waterfront and look out over the Golden Horn. You've eaten like a local — now describe your favourite taste of Istanbul.",
    location: { latitude: 41.0195, longitude: 28.9745 },
    radius: 100,
    task: {
      type: 'text_input',
      question: 'What was your favourite food you tried today and why?',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },

  // Hidden Gems of Beyoğlu – 6 steps
  {
    id: 'step-hgb-1',
    questId: 'quest-hidden-gems-beyoglu',
    order: 1,
    title: 'Galata Tower',
    description:
      'A 14th-century Genoese watchtower that once surveyed the whole city. Legend says Hezarfen Ahmed Çelebi flew from this tower with artificial wings.',
    location: { latitude: 41.0256, longitude: 28.9742 },
    radius: 80,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-hgb-2',
    questId: 'quest-hidden-gems-beyoglu',
    order: 2,
    title: 'Asmalımescit Alley',
    description:
      "Wander into this vine-canopied street. In the 1990s it was Istanbul's bohemian heart — poets, musicians, and artists drank tea here all night.",
    location: { latitude: 41.0271, longitude: 28.9759 },
    radius: 80,
    task: {
      type: 'photo',
      question: "Find and photograph a detail that looks like it's from another era.",
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-hgb-3',
    questId: 'quest-hidden-gems-beyoglu',
    order: 3,
    title: 'Pera Museum',
    description:
      "Home to Osman Hamdi Bey's 'The Tortoise Trainer' — Turkey's most famous painting. The museum itself was once the Bristol Hotel, built in 1893.",
    location: { latitude: 41.0285, longitude: 28.9770 },
    radius: 80,
    task: {
      type: 'quiz',
      question: 'Who painted "The Tortoise Trainer"?',
      options: ['Osman Hamdi Bey', 'Şeker Ahmet Paşa', 'Halil Paşa', 'İbrahim Çallı'],
      correctAnswer: 'Osman Hamdi Bey',
      hint: 'He was also a pioneering archaeologist.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-hgb-4',
    questId: 'quest-hidden-gems-beyoglu',
    order: 4,
    title: 'İstiklal Avenue Bookshop',
    description:
      'Find one of the independent bookshops along İstiklal and pick up a book about Istanbul — novels, travel writing, or history.',
    location: { latitude: 41.0299, longitude: 28.9776 },
    radius: 100,
    task: {
      type: 'text_input',
      question: 'What book did you find, or what book about Istanbul would you love to read?',
      hint: 'Orhan Pamuk novels are a popular choice!',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-hgb-5',
    questId: 'quest-hidden-gems-beyoglu',
    order: 5,
    title: 'Balık Pazarı (Fish Market)',
    description:
      'Tucked between restaurants, this covered market sells fresh fish, meze, and pickled everything. Navigating it requires a willingness to brush shoulders.',
    location: { latitude: 41.0314, longitude: 28.9782 },
    radius: 80,
    task: {
      type: 'photo',
      question: 'Photograph something colourful or unusual in the market.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-hgb-6',
    questId: 'quest-hidden-gems-beyoglu',
    order: 6,
    title: 'Tünel Square',
    description:
      "You've reached Tünel — the southern end of İstiklal and one of the oldest underground railways in the world. Opened in 1875, it's just two stops long.",
    location: { latitude: 41.0328, longitude: 28.9794 },
    radius: 80,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 150,
  },

  // Istanbul Old City Quest (No Entrance Tickets Required) – 15 steps
  {
    id: 'step-iocne-1',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 1,
    title: 'Welcome to Sultanahmet',
    description:
      "You've arrived at the beating heart of Istanbul's Old City. This square has been a gathering place for over 1,500 years — the ceremonial core of Byzantine Constantinople and the political stage of the Ottoman Empire. Look around and get your bearings before the adventure begins.",
    location: { latitude: 41.0062, longitude: 28.9778 },
    radius: 80,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-2',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 2,
    title: 'The German Fountain',
    description:
      "That ornate domed pavilion in the middle of the square is the German Fountain. Built to mark Kaiser Wilhelm II's 1898 visit to Istanbul, it is a symbol of the close diplomatic ties between the German and Ottoman empires. Which country gifted it?",
    location: { latitude: 41.0057, longitude: 28.9769 },
    radius: 30,
    task: {
      type: 'quiz',
      question: 'Which country gifted the German Fountain to the Ottoman Empire?',
      options: ['Germany', 'France', 'Italy', 'Greece'],
      correctAnswer: 'Germany',
      hint: 'It commemorates a state visit by Kaiser Wilhelm II in 1898.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-3',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 3,
    title: 'The Ancient Hippodrome',
    description:
      'The long open square stretching in front of you was once the great Hippodrome of Constantinople — an arena that held up to 100,000 spectators for chariot races, public ceremonies, and political gatherings. Walk through and imagine the roar of the crowds that once filled this place.',
    location: { latitude: 41.0063, longitude: 28.9769 },
    radius: 80,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-4',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 4,
    title: 'The Obelisk of Theodosius',
    description:
      'This towering pink-granite column has stood here since 390 AD, but its story begins 3,500 years earlier. Emperor Theodosius I transported it to Constantinople from a distant land. Where did it originally come from?',
    location: { latitude: 41.0065, longitude: 28.9773 },
    radius: 30,
    task: {
      type: 'quiz',
      question: 'Where did the Obelisk of Theodosius originally come from?',
      options: ['Egypt', 'Rome', 'Persia', 'Greece'],
      correctAnswer: 'Egypt',
      hint: 'It was originally carved in the reign of pharaoh Thutmose III.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-5',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 5,
    title: 'The Serpent Column',
    description:
      'Find the twisted bronze column standing nearby — this is the Serpent Column, one of the oldest Greek monuments in existence. It was cast in Delphi around 479 BC to celebrate a Greek victory over the Persian Empire, then moved here by the Byzantines over a thousand years later. Look closely at its spiralling form.',
    location: { latitude: 41.0063, longitude: 28.9775 },
    radius: 30,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-6',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 6,
    title: 'Blue Mosque Viewpoint',
    description:
      'Step back to get a full view of the Blue Mosque — officially the Sultanahmet Mosque. Six minarets rise above its cascading domes, making it unique among all imperial mosques in Istanbul. Take a photo that captures the scale of this masterpiece from the outside.',
    location: { latitude: 41.0054, longitude: 28.9768 },
    radius: 50,
    task: {
      type: 'photo',
      question: 'Take a photo showing the Blue Mosque domes and minarets from outside.',
      hint: 'Step back toward the centre of the square for the widest angle.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-7',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 7,
    title: 'Fountain Photo Quest',
    description:
      'Find the benches and open area near the big fountain between the Blue Mosque and Hagia Sophia. This free outdoor space is one of the finest vantage points in Sultanahmet — the historic architecture on every side is extraordinary. Take a photo with the Blue Mosque visible in the background.',
    location: { latitude: 41.0082, longitude: 28.9784 },
    radius: 40,
    task: {
      type: 'photo',
      question: 'Take a photo from the fountain area with the Blue Mosque visible behind you.',
      hint: 'Position yourself near the benches with the mosque in the distance.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-8',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 8,
    title: 'The Chestnut Vendor',
    description:
      "Look around for a street vendor selling roasted chestnuts near the square. You do not have to buy anything — just spot the cart and take in the smoke, the smell, and the street atmosphere around it. Roasted chestnuts, called 'kestane' in Turkish, are one of Istanbul's most beloved street snacks.",
    location: { latitude: 41.0068, longitude: 28.9782 },
    radius: 100,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-9',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 9,
    title: 'Hagia Sophia From Outside',
    description:
      "You're standing outside one of the most recognisable buildings in the world. Hagia Sophia's massive dome was an engineering marvel when it was completed — it remained the largest cathedral dome on earth for nearly a thousand years. What was it originally built as in 537 AD?",
    location: { latitude: 41.0086, longitude: 28.9802 },
    radius: 50,
    task: {
      type: 'quiz',
      question: 'What was Hagia Sophia originally built as in 537 AD?',
      options: ['A Byzantine cathedral', 'An Ottoman palace', 'A Roman market', 'A city gate'],
      correctAnswer: 'A Byzantine cathedral',
      hint: 'It was commissioned by Emperor Justinian I of the Byzantine Empire.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-10',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 10,
    title: 'The Imperial Gate Area',
    description:
      'Walk toward the outer gate of Topkapi Palace and observe the monumental entrance and surrounding fortifications from outside. The palace complex was the main residence and administrative heart of the Ottoman sultans for over four centuries — home to the imperial court, treasuries, and archives.',
    location: { latitude: 41.0115, longitude: 28.9842 },
    radius: 80,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-11',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 11,
    title: 'Gülhane Park Walk',
    description:
      "Step inside Gülhane Park — entry is free. Follow the main path through the trees and enjoy a rare quiet green space in the heart of the Old City. This park was once part of the outer gardens of Topkapi Palace and later became one of Istanbul's most beloved public spaces, sitting above the Bosphorus shoreline.",
    location: { latitude: 41.0119, longitude: 28.9825 },
    radius: 100,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-12',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 12,
    title: 'Sirkeci Station',
    description:
      "Sirkeci Station is one of the most storied railway stations in the world. Look at its ornate Orientalist facade — its architects blended Western and Ottoman styles into something unique. This was the final stop of one of Europe's most legendary train routes. Which one?",
    location: { latitude: 41.0139, longitude: 28.9753 },
    radius: 50,
    task: {
      type: 'quiz',
      question: 'Sirkeci Station is historically connected with which famous train route?',
      options: ['Orient Express', 'Trans-Siberian Railway', 'Flying Scotsman', 'Glacier Express'],
      correctAnswer: 'Orient Express',
      hint: 'It connected Paris and Istanbul and was immortalised by Agatha Christie.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-13',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 13,
    title: 'Spice Market Entrance',
    description:
      "You've reached the Spice Bazaar — also known as the Egyptian Market or Mısır Çarşısı. The aromas of saffron, sumac, dried figs, and Turkish tea reach you well before you step inside. Complete this stage from the entrance area, or walk through the covered market if it is open.",
    location: { latitude: 41.0167, longitude: 28.9700 },
    radius: 60,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 50,
  },
  {
    id: 'step-iocne-14',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 14,
    title: 'New Mosque Courtyard View',
    description:
      "The New Mosque — Yeni Cami — stands at the edge of Eminönü with its grey stone domes and twin minarets. Despite its name, it was completed in 1665 and has overlooked this busy waterfront for nearly 360 years. Find a clear angle and take a photo of the domes or the surrounding courtyard.",
    location: { latitude: 41.0165, longitude: 28.9690 },
    radius: 50,
    task: {
      type: 'photo',
      question: 'Take a photo of the New Mosque from the square or courtyard area.',
      hint: 'Step back toward the square to capture the full dome and minaret silhouette.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-15',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 15,
    title: 'Finish at Eminönü',
    description:
      "You've made it to the Eminönü waterfront. Look out toward the Galata Bridge and the Golden Horn — you are standing at one of Istanbul's most iconic crossroads, where ferries, fish stalls, mosques, and street vendors have come together for centuries. Quest complete.",
    location: { latitude: 41.0178, longitude: 28.9712 },
    radius: 100,
    task: { type: 'arrive' },
    audioUrl: undefined,
    pointsReward: 150,
  },
];

// ─── Partners & Offers ────────────────────────────────────────────────────────

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'partner-karakoy-lokantasi',
    name: 'Karaköy Lokantası',
    category: 'Restaurant',
    location: { latitude: 41.0234, longitude: 28.9772 },
    address: 'Kemankeş Karamustafa Paşa Mah, Istanbul',
    description: 'Modern Turkish cuisine with traditional Anatolian recipes and local ingredients.',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    activeOffers: [
      {
        id: 'offer-kl-1',
        partnerId: 'partner-karakoy-lokantasi',
        title: '15% off your bill',
        description: 'Show your STaQ quest completion badge for 15% off your total bill.',
        type: 'discount',
        value: 15,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
      {
        id: 'offer-kl-2',
        partnerId: 'partner-karakoy-lokantasi',
        title: 'Free Turkish tea',
        description: 'Complimentary çay with any meal for STaQ explorers.',
        type: 'free_item',
        value: 0,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
    ],
  },
  {
    id: 'partner-hamdi-restaurant',
    name: 'Hamdi Restaurant',
    category: 'Restaurant',
    location: { latitude: 41.0178, longitude: 28.9712 },
    address: 'Tahmis Cd. No:17, Eminönü, Istanbul',
    description: 'Legendary kebab house near the Spice Bazaar with panoramic Bosphorus views.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    activeOffers: [
      {
        id: 'offer-hr-1',
        partnerId: 'partner-hamdi-restaurant',
        title: '10% off with 200 points',
        description: 'Redeem 200 STaQ points for 10% off your meal.',
        type: 'points_redemption',
        value: 200,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
      {
        id: 'offer-hr-2',
        partnerId: 'partner-hamdi-restaurant',
        title: 'Free baklava dessert',
        description: 'Complete any quest and claim a free baklava with your meal.',
        type: 'free_item',
        value: 0,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
    ],
  },
  {
    id: 'partner-mandabatmaz',
    name: 'Mandabatmaz',
    category: 'Café',
    location: { latitude: 41.0313, longitude: 28.9769 },
    address: 'Olivia Geçidi 1/A, Beyoğlu, Istanbul',
    description: "Istanbul's most famous tiny coffee shop, legendary for its thick, frothy Turkish coffee.",
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    activeOffers: [
      {
        id: 'offer-mb-1',
        partnerId: 'partner-mandabatmaz',
        title: 'Buy 1 get 1 Turkish coffee',
        description: 'Show your Beyoğlu quest progress for a free second coffee.',
        type: 'free_item',
        value: 0,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
      {
        id: 'offer-mb-2',
        partnerId: 'partner-mandabatmaz',
        title: '20% off with 150 points',
        description: 'Redeem 150 STaQ points for 20% off any order.',
        type: 'points_redemption',
        value: 150,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
    ],
  },
  {
    id: 'partner-arasta-bazaar',
    name: 'Arasta Bazaar',
    category: 'Souvenir Shop',
    location: { latitude: 41.0047, longitude: 28.9781 },
    address: 'Arasta Çarşısı, Sultanahmet, Istanbul',
    description: 'Curated Ottoman handicrafts: hand-painted ceramics, hand-woven textiles, and antique maps.',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    activeOffers: [
      {
        id: 'offer-ab-1',
        partnerId: 'partner-arasta-bazaar',
        title: '20% off ceramics',
        description: 'Complete the Old City Walk for 20% off any handmade ceramic item.',
        type: 'discount',
        value: 20,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
      {
        id: 'offer-ab-2',
        partnerId: 'partner-arasta-bazaar',
        title: 'Free gift wrapping',
        description: 'Any purchase comes with complimentary Ottoman-style gift wrapping.',
        type: 'free_item',
        value: 0,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
    ],
  },
  {
    id: 'partner-istanbul-modern',
    name: 'Istanbul Modern',
    category: 'Museum',
    location: { latitude: 41.0295, longitude: 28.9837 },
    address: 'Meclis-i Mebusan Cd., Karaköy, Istanbul',
    description: "Turkey's first modern art museum, with a stunning new building on the Bosphorus waterfront.",
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    activeOffers: [
      {
        id: 'offer-im-1',
        partnerId: 'partner-istanbul-modern',
        title: 'Free entry with 300 points',
        description: 'Redeem 300 STaQ points for free museum entry (regular ticket).',
        type: 'points_redemption',
        value: 300,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
      {
        id: 'offer-im-2',
        partnerId: 'partner-istanbul-modern',
        title: '25% off exhibition tickets',
        description: 'Show any completed STaQ quest for 25% off special exhibition tickets.',
        type: 'discount',
        value: 25,
        validUntil: '2026-12-31T23:59:59Z',
        isActive: true,
      },
    ],
  },
];

// Convenience lookup helpers
export const getMockQuestById = (id: string) =>
  MOCK_QUESTS.find((q) => q.id === id);

export const getMockStepsForQuest = (questId: string) =>
  MOCK_STEPS.filter((s) => s.questId === questId).sort((a, b) => a.order - b.order);

export const getMockQuestsForCity = (cityId: string) =>
  MOCK_QUESTS.filter((q) => q.cityId === cityId);
