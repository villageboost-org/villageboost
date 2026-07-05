export type Campaign = {
  title: string;
  creator: string;
  initials: string;
  avatarColor: string;
  pledged: string;
  daysLeft: number;
  funded: number;
  category: string;
  imageUrl?: string;
};

export const campaigns: Campaign[] = [
  {
    title: "Hatukufi Bado Indie Stopmotion Film",
    creator: "Inkspace Bureau",
    initials: "IB",
    avatarColor: "var(--color-rust-red)",
    pledged: "100,000",
    daysLeft: 10,
    funded: 20,
    category: "Film",
    imageUrl: "/hatukufi-bado-poster.jpeg",
  },
  {
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
