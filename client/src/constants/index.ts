import { FaSearch } from "react-icons/fa";
import { FaRankingStar, FaRepeat } from "react-icons/fa6";
import { BiSolidPlaylist } from "react-icons/bi";
import { IconType } from "react-icons";

interface homepageProp {
  title: string;
  description: string;
  icon: IconType;
}

export const homepageProps: homepageProp[] = [
  {
    title: "Search",
    description: "Search for tracks, albums or artists by name switching between 3 categories for search.",
    icon: FaSearch
  },
  {
    title: "Your own ranking",
    description: "View your most listened tracks, artists and switch between 3 different time periods (4 weeks, 6 months and All time).",
    icon: FaRankingStar
  },
  {
    title: "Create playlist",
    description: "Create a playlist from your personal charts and listen to them directly in your spotify app.",
    icon: BiSolidPlaylist
  },
  {
    title: "Recently played tracks",
    description: "Check out your recently played tracks.",
    icon: FaRepeat
  }
];

export const navLinks = [
  { name: 'Profile', path: '/profile' },
  { name: 'Search', path: '/search' },
  { name: 'Top Tracks', path: '/top/tracks' },
  { name: 'Top Artists', path: '/top/artists' },
  { name: 'Recently Played', path: '/recently-played' }
];