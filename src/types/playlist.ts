import { Timestamp } from "firebase/firestore";
import { Song } from "./song";

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  cover?: string;
  userId: string;
  username: string;
  createdAt?: Timestamp;
  songs: Array<Song>;
  filePath?: string;
}
