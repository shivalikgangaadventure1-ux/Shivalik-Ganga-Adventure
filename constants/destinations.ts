import { IMAGES } from "./images";

export interface RaftingSpot {
  name: string;
  image: string;
}

export const DESTINATIONS: RaftingSpot[] = [
  { name: "Shivpuri", image: IMAGES.destinations[0] },
  { name: "Brahmpuri", image: IMAGES.destinations[1] },
  { name: "Marine Drive", image: IMAGES.destinations[2] },
  { name: "Kaudiyala", image: IMAGES.destinations[3] },
  { name: "Byasi Rapids", image: IMAGES.destinations[4] },
  { name: "River Camp", image: IMAGES.destinations[5] },
];
