import type { IPlayer } from "../../Services/getAllPlayers";
import styles from "./TeamSummary.module.scss";

interface Props {
  selectedPlayers: IPlayer[];
  totalCredits: number;
  creditsLeft: number;
  context: "captain" | "player";
}

const getTeamCount = (players: IPlayer[]) => {
  const obj: Record<number, { logo: string; short: string; count: number }> =
    {};

  players.forEach((p) => {
    if (!obj[p.team_id]) {
      obj[p.team_id] = {
        logo: p.team_logo ?? "",
        short: p.team_short_name ?? "",
        count: 1,
      };
    } else {
      obj[p.team_id].count += 1;
    }
  });

  return obj;
};

const TeamSummary = ({
  selectedPlayers,
  totalCredits,
  creditsLeft,
  context,
}: Props) => {
  const teamCount = getTeamCount(selectedPlayers);
  const totalSelected = selectedPlayers.length;

  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.teamRow}>
        {Object.values(teamCount).map((t, i) => (
          <div className={styles.teamBox} key={i}>
            <img src={t.logo} alt={t.short} className={styles.teamLogo} />
            <span className={styles.teamBadge}>{t.count}</span>
            <div className={styles.teamName}>{t.short}</div>
          </div>
        ))}
      </div>

      <div
        className={`${styles.infoRow} ${context === "captain" ? "d-none" : ""}`}
      >
        <div>
          <div className={styles.smallLabel}>Max 7 players from a team</div>
          <div className={styles.bigText}>
            {totalSelected}/11 <span>Players</span>
          </div>
        </div>

        {context === "player" && (
          <div style={{ textAlign: "right" }}>
            <div className={styles.smallLabel}>Credits Left</div>
            <div className={styles.bigText}>{creditsLeft}</div>
          </div>
        )}
      </div>

      <div
        className={`${styles.progressRow}  ${
          context === "captain" ? "d-none" : ""
        }`}
      >
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className={`${styles.circle} ${
              i < totalSelected ? styles.filled : ""
            }`}
          >
            {i + 1 === totalSelected ? totalSelected : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSummary;
