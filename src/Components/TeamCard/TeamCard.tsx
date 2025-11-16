import { useState } from "react";
import type { FantasyTeam } from "../../context/FantasyTypes";
import TeamPreviewModal from "../../Pages/TeamPreview/TeamPreviewModal";
import styles from "./TeamCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useFantasy } from "../../context/FantasyContext";

interface Props {
  team: FantasyTeam;
  index: number;
  handleSelect: () => void;
  isSelected?: boolean;
}

const TeamCard = ({ team, index, handleSelect, isSelected }: Props) => {
  const { setSelectedPlayers } = useFantasy();
  const captain = team.players.find(
    (p) => String(p.player_id) === team.captainId
  );
  const viceCaptain = team.players.find(
    (p) => String(p.player_id) === team.viceCaptainId
  );

  const roleCounts = {
    WK: team.players.filter((p) => p.role === "Wicket-Keeper").length,
    BAT: team.players.filter((p) => p.role === "Batsman").length,
    AR: team.players.filter((p) => p.role === "All-Rounder").length,
    BOWL: team.players.filter((p) => p.role === "Bowler").length,
  };
  const captainImage = team.players.find(
    (p) => p.selectedRole === "c"
  )?.team_logo;
  const viceCaptainImage = team.players.find(
    (p) => p.selectedRole === "wc"
  )?.team_logo;
  const [openPreview, setOpenPreview] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.card} ${isSelected ? styles.selectedTeam : ""}`}
        onClick={handleSelect}
      >
        <div className={styles.headerRow}>
          <span className={styles.teamName}>Team {index + 1}</span>
          <div className={styles.icons}>
            <i className="ri-share-forward-line"></i>
            <i className="ri-edit-line"></i>
            <i className="ri-delete-bin-line"></i>
          </div>
        </div>

        <div className={styles.captains}>
          <div className={styles.player}>
            <img
              src={captainImage}
              alt={"captainImage"}
              className={styles.avatar}
            />
            <div className={styles.nameBox}>
              <span className={styles.name}>{captain?.name}</span>
              <span className={styles.captainTag}>Captain</span>
            </div>
          </div>

          <div className={styles.player}>
            <img
              src={viceCaptainImage}
              alt="viceCaptainImage"
              className={styles.avatar}
            />
            <div className={styles.nameBox}>
              <span className={styles.name}>{viceCaptain?.name}</span>
              <span className={styles.vcTag}>Vice Captain</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.roleBox}>
            WK <span>{roleCounts.WK}</span>
          </div>
          <div className={styles.roleBox}>
            BAT <span>{roleCounts.BAT}</span>
          </div>
          <div className={styles.roleBox}>
            AR <span>{roleCounts.AR}</span>
          </div>
          <div className={styles.roleBox}>
            BOWL <span>{roleCounts.BOWL}</span>
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/${team.matchId}/pick-player/${team.id}`);
              setSelectedPlayers(team.players);
            }}
          >
            Edit Team
          </button>
          <button
            className={`btn btn-outline-light`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenPreview(true);
            }}
          >
            Team Preview
          </button>
        </div>
      </div>
      <TeamPreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        selectedPlayers={team.players}
        hideCredit={true}
      />
    </>
  );
};

export default TeamCard;
