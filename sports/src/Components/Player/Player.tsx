import React from "react";
import styles from "./Player.module.scss";
import { useGetAllPlayers } from "../../Hooks/useGetAllPlayers";
import type { IPlayer, PlayerRole } from "../../Services/getAllPlayers";
export interface Props {
  tab: PlayerRole;
}
const Player = ({ tab }: Props) => {
  const { tabData } = useGetAllPlayers({ tab });
  return (
    <div className={`${styles.player}`}>
      {tabData?.length === 0 ? (
        <div>No Player found</div>
      ) : (
        tabData.map((tab) => <PlayerCard player={tab} />)
      )}
    </div>
  );
};
const PlayerCard = ({ player }: { player: IPlayer }) => {
  return (
    <div className={`${styles.playercard}`}>
      <img src={player.team_logo} alt={player.team_short_name} />
      <div>
        <span>{player.name}</span>
        <span>
          {player.team_short_name}-{player.role?.slice(0, 4)}
        </span>
      </div>
      <div>{player.event_total_points}</div>
      <div>{player.event_player_credit}</div>
      <button className="btn btn-check"></button>
    </div>
  );
};
export default Player;
