import { FaSearch } from "react-icons/fa";
import { FaRankingStar, FaRepeat } from "react-icons/fa6";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { BiSolidPlaylist } from "react-icons/bi";
import { IconType } from "react-icons";
import { MdFiberNew } from "react-icons/md";
import { FaEquals, FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

interface homepageProp {
  title: string;
  description: string;
  icon: IconType;
}

export const homepageProps: homepageProp[] = [
  {
    title: "Your own ranking",
    description:
      "View your most listened tracks, artists and switch between 3 different time periods (4 weeks, 6 months and All time).",
    icon: FaRankingStar,
  },
  {
    title: "View changes",
    description: "View how your top tracks, artists have changed.",
    icon: CgArrowsExchangeAltV,
  },
  {
    title: "Search",
    description:
      "Search for tracks, albums or artists by name switching between 3 categories for search.",
    icon: FaSearch,
  },
  {
    title: "Create playlist",
    description:
      "Create a playlist from your personal charts and listen to them directly in your spotify app.",
    icon: BiSolidPlaylist,
  },
  {
    title: "Recently played tracks",
    description: "Check out your recently played tracks.",
    icon: FaRepeat,
  },
];

export const navLinks = [
  { name: "Profile", path: "/profile" },
  { name: "Search", path: "/search" },
  { name: "Top Tracks", path: "/top/tracks" },
  { name: "Top Artists", path: "/top/artists" },
  { name: "Recently Played", path: "/recently-played" },
];

export const colors = {
  primaryColor: "#10551e",
  secondaryColor: "#8abd81",
  tertiaryColor: "#bee5be",
  topLinkColor: "#179800",
  yellowishColor: "#cbe669",
  textColor: "#131A22",
  borderColor: "#ccc",
  bgColor: "#fff",
  errorColor: "#ff0000",
  blueColor: "#007bff",
};

export const topChanges = [
  {
    value: "new",
    icon: MdFiberNew,
    color: colors.blueColor,
  },
  {
    value: "equal",
    icon: FaEquals,
    color: colors.borderColor,
  },
  {
    value: "up",
    icon: FaAngleDoubleUp,
    color: colors.primaryColor,
  },
  {
    value: "down",
    icon: FaAngleDoubleDown,
    color: colors.errorColor,
  },
];
