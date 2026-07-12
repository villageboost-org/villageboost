export type RewardTier = {
  name: string;
  amount: number;
  perks: string[];
};

export type Campaign = {
  slug: string;
  title: string;
  creator: string;
  initials: string;
  avatarColor: string;
  pledged: string;
  daysLeft: number;
  funded: number;
  category: string;
  imageUrl?: string;
  tagline?: string;
  goalAmount?: number;
  contributors?: number;
  deadlineDate?: string;
  description?: string[];
  gallery?: string[];
  updatesCount?: number;
  rewards?: RewardTier[];
};

export const campaigns: Campaign[] = [
  {
    slug: "hatukufi-bado-indie-stopmotion-film",
    title: "Hatukufi Bado Indie Stopmotion Film",
    creator: "Inkspace Bureau",
    initials: "IB",
    avatarColor: "var(--color-rust-red)",
    pledged: "100,000",
    daysLeft: 10,
    funded: 20,
    category: "Film",
    imageUrl: "/hatukufi-bado-poster.jpeg",
    tagline:
      "On a single day in Nairobi, two fiercely intelligent young women—Shinde and Joy—navigate the chaos of protest, art, and state repression as they fight for a better country with nothing but their wits, their voices, and each other",
    goalAmount: 800000,
    contributors: 100,
    deadlineDate: "2026-07-08",
    description: [
      "Hatukufi Bado follows Shinde, a defiant, politically aware young woman, and her quiet but resolute best friend Joy. They are on the way to their first protest when incidentally a teargas attack erupts on their bus, pulling them into the swelling protest.",
      "Fear gives way to courage and collective resistance. The uprising turns brutal when a violent police officer asserts himself as a looming threat, and in a surreal, devastating turn, Joy is shot dead before Shinde and the crowd. In the aftermath, reality fractures and Shinde, full of unwavering resolve, affirms the enduring truth of Hatukufi Bado — we are not dead yet.",
    ],
    gallery: ["/hatukufi-bado-1.jpg", "/hatukufi-bado-2.jpg"],
    updatesCount: 2,
    rewards: [
      {
        name: "Firestarter",
        amount: 1000,
        perks: [
          "Name listed on a public thank you wall",
          "Early supporter shout out on our Instagram/Social walls",
          "Access to one behind the scenes photo from production",
        ],
      },
      {
        name: "BTS Crew",
        amount: 2000,
        perks: [
          "Everything above +",
          "Access to monthly BTS updates (photos & short captions)",
          "Name in end credits under special thanks",
        ],
      },
      {
        name: "Let's Go Baby Crew",
        amount: 3500,
        perks: [
          "Everything above +",
          "Access to story and character development posts",
          "Early look at concept art/story boards",
          "Polls: Vote on merch designs and products",
        ],
      },
    ],
  },
  {
    slug: "echoes-of-the-rift-debut-album",
    title: "Echoes of the Rift — Debut Album",
    creator: "Amani Sound",
    initials: "AS",
    avatarColor: "var(--color-maroon)",
    pledged: "200,000",
    daysLeft: 14,
    funded: 50,
    category: "Music",
    imageUrl: "/echoes-poster.jpeg",
  },
  {
    slug: "nairobi-noir-a-comic-series",
    title: "Nairobi Noir — A Comic Series",
    creator: "Kelly Thompson",
    initials: "KT",
    avatarColor: "var(--color-mustard)",
    pledged: "100,000",
    daysLeft: 8,
    funded: 80,
    category: "Comics",
    imageUrl: "/nairobi-noir-poster.jpeg",
  },
  {
    slug: "threads-of-home-fashion-line",
    title: "Threads of Home — Fashion Line",
    creator: "Zawadi Studio",
    initials: "ZS",
    avatarColor: "var(--color-sky-blue)",
    pledged: "150,000",
    daysLeft: 21,
    funded: 35,
    category: "Fashion",
    imageUrl: "/threads-of-home-poster.jpeg",
  },
  {
    slug: "the-last-riot-a-stage-play",
    title: "The Last Riot — A Stage Play",
    creator: "Baraka Theatre",
    initials: "BT",
    avatarColor: "var(--color-rust-red)",
    pledged: "300,000",
    daysLeft: 5,
    funded: 65,
    category: "Theater",
    imageUrl: "/the-last-riot-poster.jpeg",
  },
  {
    slug: "pixel-savannah-indie-game",
    title: "Pixel Savannah — Indie Game",
    creator: "Sote Games",
    initials: "SG",
    avatarColor: "var(--color-maroon)",
    pledged: "250,000",
    daysLeft: 30,
    funded: 45,
    category: "Gaming",
    imageUrl: "/pixel-savannah-poster.jpeg",
  },
];
