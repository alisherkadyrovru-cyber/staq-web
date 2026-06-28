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
      'Discover the heart of old Istanbul through photos, hidden details, local flavors, and small challenges. You do not need to enter any paid attraction to complete this quest.',
    category: 'historical',
    difficulty: 'easy',
    durationMinutes: 210,
    distanceKm: 5.5,
    isPremium: false,
    priceUsd: 0,
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    rating: 4.8,
    completionCount: 0,
    startLocation: { latitude: 41.0057, longitude: 28.9769 },
    route: [
      { latitude: 41.0057, longitude: 28.9769 }, // Stage 1: German Fountain
      { latitude: 41.0063, longitude: 28.9773 }, // Stage 2: Obelisk of Theodosius
      { latitude: 41.0063, longitude: 28.9775 }, // Stage 3: Serpent Column
      { latitude: 41.0054, longitude: 28.9768 }, // Stage 4: Blue Mosque
      { latitude: 41.0047, longitude: 28.9781 }, // Stage 5: Arasta Bazaar
      { latitude: 41.0043, longitude: 28.9778 }, // Stage 6: Mosaic Museum Sign
      { latitude: 41.0082, longitude: 28.9784 }, // Stage 7: Fountain Viewpoint
      { latitude: 41.0068, longitude: 28.9790 }, // Stage 8: Chestnut Master
      { latitude: 41.0086, longitude: 28.9802 }, // Stage 9: Hagia Sophia
      { latitude: 41.0072, longitude: 28.9764 }, // Stage 10: Basilica Cistern
      { latitude: 41.0113, longitude: 28.9840 }, // Stage 11: Archaeological Museums
      { latitude: 41.0119, longitude: 28.9825 }, // Stage 12: Gülhane Park
      { latitude: 41.0139, longitude: 28.9753 }, // Stage 13: Sirkeci Station
      { latitude: 41.0192, longitude: 28.9745 }, // Stage 14: Eminönü Ferry View
      { latitude: 41.0167, longitude: 28.9700 }, // Stage 15: Mısır Çarşısı
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

  // Istanbul Old City Quest (No Entrance Tickets Required) – 15 stages
  // Start: German Fountain (Sultanahmet) → Finish: Mısır Çarşısı (Spice Bazaar)
  {
    id: 'step-iocne-1',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 1,
    title: 'German Fountain',
    description:
      "Welcome to the Old City. Your first stop is the German Fountain — one of the most recognisable meeting points in Sultanahmet Square. This ornate domed pavilion was gifted by Germany to the Ottoman Empire in 1898 to mark Kaiser Wilhelm II's state visit. But what once occupied this very area of the square?",
    location: { latitude: 41.0057, longitude: 28.9769 },
    radius: 30,
    task: {
      type: 'quiz',
      question: 'What was once located in this area of Sultanahmet Square?',
      options: ['A large harbor', 'A hippodrome', 'A royal prison', 'A military arsenal'],
      correctAnswer: 'A hippodrome',
      hint: 'Think about where chariot races and public spectacles took place in ancient Constantinople.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-2',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 2,
    title: 'Obelisk of Theodosius',
    description:
      'Find the tall ancient obelisk with carved reliefs on all four sides. This 3,500-year-old granite column was originally quarried in Egypt under Pharaoh Thutmose III, then brought to Constantinople by Emperor Theodosius I in 390 AD. Take a photo where both the top and the base are visible.',
    location: { latitude: 41.0063, longitude: 28.9773 },
    radius: 30,
    task: {
      type: 'photo',
      question: 'Take a photo where both the top and the base of the obelisk are visible.',
      hint: 'Step back far enough to capture the full height. Including a person in the frame shows just how impressive the scale really is.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-3',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 3,
    title: 'Serpent Column',
    description:
      'This small twisted bronze column is easy to overlook, but it has survived over 2,500 years — first in Delphi, Greece, then moved here by the Byzantines. It was cast around 479 BC to celebrate a Greek victory over Persia and is one of the oldest monuments in Istanbul.',
    location: { latitude: 41.0063, longitude: 28.9775 },
    radius: 25,
    task: {
      type: 'quiz',
      question: 'Which creature is connected to the name of this column?',
      options: ['Lion', 'Eagle', 'Serpent', 'Horse'],
      correctAnswer: 'Serpent',
      hint: 'Look at the shape of the bronze itself — the column was originally formed by three of them intertwined.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-4',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 4,
    title: 'Blue Mosque',
    description:
      'Walk toward the Blue Mosque and find a good angle from the square. It is the only imperial mosque in Istanbul with six minarets — a detail that was considered controversial when it was first built. See how many minarets you can fit into a single photo.',
    location: { latitude: 41.0054, longitude: 28.9768 },
    radius: 50,
    task: {
      type: 'photo',
      question: 'Take a photo of the Blue Mosque where at least four minarets are visible.',
      hint: 'Step toward the centre of Sultanahmet Square for the widest view. The total is 6 — see if you can get them all in one frame.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-5',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 5,
    title: 'Arasta Bazaar',
    description:
      "Behind the Blue Mosque, a quieter bazaar street awaits — Arasta Bazaar. You will find carpets, ceramics, tiles, textiles, and souvenirs in a calmer atmosphere than the Grand Bazaar. Walk through and look for the most beautiful or colourful shop window you can find.",
    location: { latitude: 41.0047, longitude: 28.9781 },
    radius: 50,
    task: {
      type: 'photo',
      question: 'Find the most beautiful shop window in Arasta Bazaar and take a photo of it.',
      hint: 'Look for bright ceramics, stacked spices, hanging lamps, or colourful textile patterns. Try giving your photo a title in your head — for example "Colors of the Old City".',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-6',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 6,
    title: 'Mosaic Museum Sign',
    description:
      'Somewhere near Arasta Bazaar, there is a museum dedicated to the ancient mosaics of the Byzantine Great Palace — intricate floor panels that once decorated the floors beneath the feet of Byzantine emperors. You do not need to go inside. Just find the museum sign and type its name below.',
    location: { latitude: 41.0043, longitude: 28.9778 },
    radius: 40,
    task: {
      type: 'text_input',
      question: 'Find the museum sign near Arasta Bazaar and enter its name.',
      hint: 'The museum is about Byzantine palace mosaics. Look for a sign at street level along the bazaar. Turkish name: Büyük Saray Mozaikleri Müzesi.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-7',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 7,
    title: 'Fountain Viewpoint',
    description:
      'Head to the benches and open fountain area between the Blue Mosque and Hagia Sophia. This is one of the best free vantage points in Sultanahmet — the historic architecture on every side is extraordinary. Take a photo with the Blue Mosque visible behind you. Try a creative pose instead of a standard tourist shot.',
    location: { latitude: 41.0082, longitude: 28.9784 },
    radius: 40,
    task: {
      type: 'photo',
      question: 'Take a photo with yourself, the fountain or bench area, and the Blue Mosque in the background.',
      hint: 'Stand near the benches and angle the camera so the mosque is behind you. The more creative the pose, the better the memory.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-8',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 8,
    title: 'The Chestnut Master',
    description:
      "Find the small red street food cart selling roasted chestnuts and boiled corn near the Hop-on Hop-off bus area. You don't need to buy anything to complete this stage — just find the cart and take a photo with it, as if you're helping with the roasting.",
    location: { latitude: 41.0068, longitude: 28.9790 },
    radius: 100,
    task: {
      // TODO: upgrade to QR scan type once QR scanning is implemented (see (tabs)/layout.tsx QR tab)
      type: 'photo',
      question: 'Take a photo with the chestnut and corn cart.',
      hint: "Look for a small red cart with smoke near the main tourist bus area around Sultanahmet. Strike a pose as if you're helping with the roasting.",
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-9',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 9,
    title: 'Hagia Sophia',
    description:
      "Stand outside Hagia Sophia and look at one of the most important buildings in Istanbul's history. Its enormous dome was an engineering marvel when completed in 537 AD and remained the largest enclosed dome in the world for nearly a thousand years. Who ordered its construction?",
    location: { latitude: 41.0086, longitude: 28.9802 },
    radius: 50,
    task: {
      type: 'quiz',
      question: 'Who ordered the construction of the current Hagia Sophia building?',
      options: ['Constantine', 'Justinian', 'Suleiman', 'Ahmed I'],
      correctAnswer: 'Justinian',
      hint: 'He was a Byzantine emperor who ruled in the 6th century AD and is famous for his vast building programme across Constantinople.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-10',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 10,
    title: 'Basilica Cistern',
    description:
      "You do not need to enter the Basilica Cistern for this stage. Walk near the entrance or exit area and take in the exterior. The cistern was built in the 6th century to store water for the Byzantine palace district. Deep inside, two ancient stone column bases have a famous mythological face carved into them.",
    location: { latitude: 41.0072, longitude: 28.9764 },
    radius: 40,
    task: {
      type: 'quiz',
      question: 'Which famous mythological figure is connected with the Basilica Cistern?',
      options: ['Zeus', 'Medusa', 'Athena', 'Hercules'],
      correctAnswer: 'Medusa',
      hint: 'Two column bases with this figure were placed upside down and sideways — no one is entirely sure why.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-11',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 11,
    title: 'Archaeological Museums',
    description:
      "Walk toward the museum area near Gülhane Park and Topkapı Palace. The Istanbul Archaeological Museums complex holds one of the world's most impressive collections of ancient artefacts — but you only need to find the entrance sign and photograph it. No ticket required.",
    location: { latitude: 41.0113, longitude: 28.9840 },
    radius: 60,
    task: {
      type: 'photo',
      question: 'Find the entrance or sign of the Istanbul Archaeological Museums and take a photo.',
      hint: 'Look for the gate and sign between Gülhane Park and the outer walls of Topkapı Palace.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-12',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 12,
    title: 'Gülhane Park',
    description:
      "Enter Gülhane Park — free to all, open to everyone. This is one of the oldest green spaces in Istanbul and once formed the outer gardens of Topkapı Palace. Find a beautiful path, garden corner, fountain, or quiet spot and take a photo. Which palace was this park once connected to?",
    location: { latitude: 41.0119, longitude: 28.9825 },
    radius: 100,
    task: {
      type: 'photo',
      question: 'Take a photo of a beautiful path, garden area, fountain, or quiet corner inside Gülhane Park.',
      hint: 'Gülhane was the private garden of one of Istanbul\'s most famous palace complexes. The roses and tree-lined paths have been here for centuries.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-13',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 13,
    title: 'Sirkeci Station',
    description:
      "Walk to Sirkeci Station — one of the most atmospheric railway buildings in Istanbul. Built in 1890, its design blends Western and Ottoman styles into something entirely its own. For decades it was the final stop of one of Europe's most legendary and romanticised train journeys.",
    location: { latitude: 41.0139, longitude: 28.9753 },
    radius: 50,
    task: {
      type: 'quiz',
      question: 'Which famous train is strongly connected with Sirkeci Station?',
      options: ['Taurus Express', 'Orient Express', 'Balkan Express', 'Silk Road Express'],
      correctAnswer: 'Orient Express',
      hint: 'Agatha Christie made this train famous in one of her best-known novels.',
    },
    audioUrl: undefined,
    pointsReward: 75,
  },
  {
    id: 'step-iocne-14',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 14,
    title: 'Eminönü Ferry View',
    description:
      "Walk toward the Eminönü waterfront where ferries depart in every direction across the Bosphorus and the Golden Horn. The view here is one of Istanbul's most iconic — Galata Bridge, Galata Tower, seagulls, ferry horns, and the smell of the sea all come together. Capture as much of it as you can in a single photo.",
    location: { latitude: 41.0192, longitude: 28.9745 },
    radius: 100,
    task: {
      type: 'photo',
      question: 'Take a panoramic photo at the Eminönü waterfront. Try to include at least two of: ferries, the sea, Galata Bridge, or Galata Tower.',
      hint: 'Turn toward the water and Galata Bridge. The best angle is usually near the ferry ticket booths, looking north across the Golden Horn.',
    },
    audioUrl: undefined,
    pointsReward: 100,
  },
  {
    id: 'step-iocne-15',
    questId: 'quest-istanbul-old-city-no-entrance',
    order: 15,
    title: 'Mısır Çarşısı',
    description:
      "Welcome to the final stage. You've arrived at the Spice Bazaar — one of Istanbul's most atmospheric markets, filled with spices, Turkish delight, dried fruits, tea, and the sweet smell of lokum. Find a colourful stall and take a good look around. Now answer this to complete your quest.",
    location: { latitude: 41.0167, longitude: 28.9700 },
    radius: 60,
    task: {
      type: 'quiz',
      question: 'What does "Mısır Çarşısı" mean in English?',
      options: ['Golden Bazaar', 'Egyptian Bazaar', 'Fish Market', "Sultan's Bazaar"],
      correctAnswer: 'Egyptian Bazaar',
      hint: 'The bazaar was originally funded by the tax revenues of Egypt during the Ottoman period.',
    },
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
