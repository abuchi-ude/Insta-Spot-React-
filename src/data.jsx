import img1 from "./assets/pexels-kassandre-pedro-8639743-1-(1).png";
import img2 from "./assets/pexels-kassandre-pedro-8639743-1-(1).svg";
import img3 from "./assets/pexels-kassandre-pedro-8639743-1-(2).svg";
import img4 from "./assets/pexels-kassandre-pedro-8639743-1-(3).svg";
import img5 from "./assets/pexels-kassandre-pedro-8639743-1-(4).svg";
import img6 from "./assets/pexels-kassandre-pedro-8639743-1-(5).svg";
import profilepic from "./assets/image 2.svg";
export const cards = [
  {
    id: 1,
    image: img1,
    title: "Val Thorens",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
    liked: false,
  },
  {
    id: 2,
    image: img2,
    title: "Restaurant terrace",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
    liked: false,
  },
  {
    id: 3,
    image: img3,
    title: "An outdoor cafe",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
    liked: false,
  },
  {
    id: 4,
    image: img4,
    title: "A very long bridge, over the forest...",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
    liked: false,
  },
  {
    id: 5,
    image: img5,
    title: "Tunnel with morning light",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
    liked: false,
  },
  {
    id: 6,
    image: img6,
    title: "Mountain house",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
    liked: false,
  },
];

export const ProfileData = {
  name: 'Bessie Coleman',
  bio: 'Civil Aviator. Bessie Coleman was the first African American.',
  job: 'Civil Aviator',
  image: profilepic,
};

export function loadProfile() {
  const storedProfile = localStorage.getItem('profile');
  try {
    return storedProfile ? JSON.parse(storedProfile) : ProfileData;
  } catch (e) {
    console.error("Error parsing profile from localStorage, using default.", e);
    return ProfileData;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem('profile', JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving profile to localStorage.", e);
  }
}

export function loadCards() {
  const storedCards = localStorage.getItem('cards');
  try {
    return storedCards ? JSON.parse(storedCards) : cards;
  } catch (e) {
    console.error("Error parsing cards from localStorage, using default.", e);
    return cards;
  }
}


export function saveCards(cards) {
  try {
    localStorage.setItem('cards', JSON.stringify(cards));
  } catch (e) {
    console.error("Error saving cards to localStorage.", e);
  }
}