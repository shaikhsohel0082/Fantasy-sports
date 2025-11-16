import { useFantasy } from "../../context/FantasyContext";
import { canSelectPlayer } from "../../Hooks/helper";
import type { IPlayer } from "../../Services/getAllPlayers";
import CaptonBtn from "../CaptonBtn";
import styles from "./Player.module.scss";
export interface Props {
  tabData: IPlayer[];
  context: "player" | "captain";
}
const Player = ({ tabData, context }: Props) => {
  const { selectedPlayers, setSelectedPlayers } = useFantasy();

  const handleSelect = (player: IPlayer) => {
    setSelectedPlayers((prev) => {
      const already = prev.some((p) => p.player_id === player.player_id);

      let updatedList: IPlayer[];

      // remove player
      if (already) {
        updatedList = prev.filter((p) => p.player_id !== player.player_id);
      } else {
        // ADD with rules check
        if (!canSelectPlayer(prev, player)) {
          return prev;
        }
        updatedList = [...prev, player];
      }

      //  Save to localStorage
      localStorage.setItem("selectedPlayers", JSON.stringify(updatedList));

      return updatedList;
    });
  };

  const handleCaptainSelect = (player_id: number, role: "c" | "wc") => {
    setSelectedPlayers((prev) => {
      return prev.map((p) => {
        // Step 1: Remove this role from all other players
        if (p.selectedRole === role) {
          return { ...p, selectedRole: undefined };
        }

        // Step 2: Assign the role to the selected player
        if (p.player_id === player_id) {
          return { ...p, selectedRole: role };
        }

        return p;
      });
    });
  };
  return (
    <>
      {tabData?.length === 0 ? (
        <div>No Player found</div>
      ) : (
        tabData.map((p) => (
          <PlayerCard
            player={p}
            key={p.player_id}
            selected={selectedPlayers.some(
              (sp) => sp.player_id === p.player_id
            )}
            onSelect={handleSelect}
            context={context}
            handleCaptainSelect={handleCaptainSelect}
          />
        ))
      )}
    </>
  );
};


const PlayerCard = ({
  player,
  selected,
  onSelect,
  context,
  handleCaptainSelect,
}: {
  player: IPlayer;
  selected: boolean;
  onSelect: (p: IPlayer) => void;
  context: "player" | "captain";
  handleCaptainSelect: (player_id: number, role: "c" | "wc") => void;
}) => {
  return (
    <div className={`${styles.playercard} mb-2`}>
      <img
        src={player.team_logo}
        alt={player.team_short_name}
        className={styles.playerLogo}
      />

      <div>
        <span>{player.name}</span>
        <span className={styles.playerInfo}>
          <span>{player.team_short_name} </span>
          <span>({player.role})</span>
        </span>
      </div>
      {context === "player" && <div>{player.event_total_points}</div>}
      {context === "player" && <div>{player.event_player_credit}</div>}
      {context === "player" && (
        <input
          type="checkbox"
          className={styles.check}
          checked={selected}
          onChange={() => onSelect(player)}
        />
      )}
      {context === "captain" && (
        <CaptonBtn
          handleClick={() => {
            handleCaptainSelect(player.player_id, "c");
          }}
          isSelected={player.selectedRole === "c"}
          label="C"
        />
      )}
      {context === "captain" && (
        <CaptonBtn
          handleClick={() => {
            handleCaptainSelect(player.player_id, "wc");
          }}
          isSelected={player.selectedRole === "wc"}
          label="WC"
        />
      )}
    </div>
  );
};

export default Player;
