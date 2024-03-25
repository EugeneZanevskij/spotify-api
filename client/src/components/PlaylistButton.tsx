import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TrackObjectFull } from "../types";
import SpotifyLink from "./SpotifyLink";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { colors } from "../constants";
import { addTracksToPlaylist, createPlaylist, fetchProfileId } from "../api";

const Button = styled.button`
  background-color: ${colors.blueColor};
  color: ${colors.bgColor};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const PlaylistButton: React.FC<{
  tracks: TrackObjectFull[];
  timeRange: string;
}> = ({ tracks, timeRange }) => {
  const [profileId, setProfileId] = useState<string>("");
  const [playlistLink, setPlaylistLink] = useState<string>("");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    fetchProfileId(accessToken).then((id) => setProfileId(id));
  }, [accessToken]);

  const date = () => {
    const date = new Date();
    const month = date.toLocaleString("en", { month: "short" });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  };

  const handleCreatePlaylist = async () => {
    const { playlistId, playlistUrl } = await createPlaylist(
      accessToken,
      profileId,
      timeRange,
      date(),
    );
    setPlaylistLink(playlistUrl);
    await addTracksToPlaylist(accessToken, playlistId, tracks);
  };

  return (
    <>
      <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
      {playlistLink && <SpotifyLink url={playlistLink} />}
    </>
  );
};

export default PlaylistButton;
