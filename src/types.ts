export type CoffeeId = "java" | "rugbano" | "salvador";

export type Location = "porto1" | "porto2" | "porto3" | "lisbon";

export type CoffeeModal = {
  type: "coffee";
  coffeeId: CoffeeId;
};

export type Modal = CoffeeModal | null;

export type App = {
  selectedCoffee: CoffeeId | null;
  hoveredCoffee: CoffeeId | null;
  hoveredLocation: Location | null;
  locale: "en" | "pt";
  modal: Modal;
};

export type Coffee = {
  id: CoffeeId;
  title: string;
  subtitle: string;
  description: TranslationKey;
  origin: string;
  process: TranslationKey;
  altitude: string;
  src: string;
};

export type TranslationDict = {
  homeH4_1: string;
  homeLink: string;
  homeSpan: string;
  aboutH3_1: string;
  aboutH3_2: string;
  aboutParagraph: string;
  aboutLink: string;
  shopParagraph: string;
  shopLink: string;
  coffeLink: string;
  merchH3_1: string;
  merchH3_2: string;
  merchSpan: string;
  merchParagraph: string;
  merchLink: string;
  instagramSpan: string;
  instagramLink: string;
  spotH3_1: string;
  spotH3_2: string;
  spotParagraph: string;
  spotLink: string;
  footerContactParagraph: string;
  footerServicesParagraph: string;
  footerAboutLink: string;
  footerBackButton: string;
  coffeeProcessWashed: string;
  coffeeProcessNatural: string;
  javaDescription: string;
  rugbanoDescription: string;
  salvadorDescription: string;
  modalLink: string;
  modalOrigin: string;
  modalProcess: string;
};

export type TranslationKey = keyof TranslationDict;
