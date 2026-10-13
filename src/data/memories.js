/**
 * Central Memory Sections Configuration
 * 
 * Contains exactly 5 Memory sections containing all 9 personal photographs.
 * Photo filenames: memory-01.jpg through memory-09.jpg stored in public/images/
 * 
 * Note on Decorative Themes:
 * - Memory 2 features a throwball-inspired ornamental frame accent (lines and small ball ornament).
 * - Memory 4 features a badminton-inspired ornamental frame accent (delicate shuttlecock ornament and strings pattern).
 * Both are purely decorative vector embellishments integrated into the champagne-gold frames.
 */

export const memoriesData = [
  {
    id: 1,
    indexLabel: "Memory 1 of 5",
    title: "Miles Apart, Always Close",
    subtitle: "From our first days to all the ones ahead",
    caption: "Even with miles between us, our friendship still feels close. I carry these early memories with me and look forward to the day we make more.",
    layout: "royal-duo",
    decorativeTheme: "royal-flourish",
    photos: [
      {
        id: "photo-1",
        src: "/images/memory-01.jpg",
        fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
        alt: "Two friends on a day out",
        captionLabel: ""
      },
      {
        id: "photo-2",
        src: "/images/memory-02.jpg",
        fallback: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80",
        alt: "Friends taking a mirror selfie",
        captionLabel: ""
      }
    ]
  },
  {
    id: 2,
    indexLabel: "Memory 2 of 5",
    title: "Laughter Travels Any Distance",
    subtitle: "The laughter I carry across every mile",
    caption: "No matter how far apart we are, you still know how to make me laugh. I am grateful that distance has never taken that joy from us.",
    layout: "layered-editorial",
    decorativeTheme: "throwball-accent", // Decorative frame embellishment only
    photos: [
      {
        id: "photo-3",
        src: "/images/memory-03.jpg",
        fallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
        alt: "Friends sharing a close-up selfie",
        captionLabel: ""
      },
      {
        id: "photo-4",
        src: "/images/memory-04.jpg",
        fallback: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
        alt: "A second candid selfie together",
        captionLabel: ""
      }
    ]
  },
  {
    id: 3,
    indexLabel: "Memory 3 of 5",
    title: "Proud of You, Always",
    subtitle: "Always cheering you on from here",
    caption: "I wish I could be there for every milestone, but I celebrate every win from wherever I am. I will always be cheering you on.",
    layout: "featured-solo", // Distinctive larger featured single-photo composition
    decorativeTheme: "ornate-centerpiece",
    photos: [
      {
        id: "photo-5",
        src: "/images/memory-05.jpg",
        fallback: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
        alt: "A proud school award moment",
        captionLabel: ""
      }
    ]
  },
  {
    id: 4,
    indexLabel: "Memory 4 of 5",
    title: "Near in Every Memory",
    subtitle: "Close in my heart, even from far away",
    caption: "Whenever we are together, every moment becomes something I want to hold onto. Until we meet again, these memories keep you close.",
    layout: "blended-collage",
    decorativeTheme: "badminton-accent", // Decorative frame embellishment only
    photos: [
      {
        id: "photo-6",
        src: "/images/memory-06.jpg",
        fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        alt: "Two women posing together indoors",
        captionLabel: ""
      },
      {
        id: "photo-7",
        src: "/images/memory-07.jpg",
        fallback: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
        alt: "Two friends in a colorful selfie",
        captionLabel: ""
      }
    ]
  },
  {
    id: 5,
    indexLabel: "Memory 5 of 5",
    title: "Little Things I Miss",
    subtitle: "Missing the little moments most",
    caption: "It is often the ordinary moments I miss most. I cannot wait until we can share them again, without having to say goodbye so soon.",
    layout: "royal-duo-warm",
    decorativeTheme: "golden-celebration",
    photos: [
      {
        id: "photo-8",
        src: "/images/memory-08.jpg",
        fallback: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
        alt: "A friend in a blue sari at an event",
        captionLabel: ""
      },
      {
        id: "photo-9",
        src: "/images/memory-09.jpg",
        fallback: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
        alt: "Friends making art together",
        captionLabel: ""
      }
    ]
  }
];

