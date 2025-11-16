import styles from "./TeamPreviewModal.module.scss";
import type { IPlayer } from "../../Services/getAllPlayers";
import CaptonBtn from "../../Components/CaptonBtn";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedPlayers: IPlayer[];
  hideCredit?: boolean;
}

const TeamPreviewModal = ({
  open,
  onClose,
  selectedPlayers,
  hideCredit,
}: Props) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h5>Your Team Preview</h5>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.playerList}>
          {selectedPlayers.map((p) => (
            <div key={p.player_id} className={styles.playerCard}>
              <img
                src={p.team_logo}
                className={styles.teamLogo}
                alt={p.team_short_name}
              />

              <div className={styles.info}>
                <div className={styles.name}>{p.name}</div>
                <div className={styles.meta}>
                  <span>{p.team_short_name}</span> | <span>{p.role}</span>
                </div>
              </div>

              <div className={`${styles.credit} ${hideCredit ? "d-none" : ""}`}>
                {p.event_player_credit}
              </div>
              {hideCredit && p.selectedRole === "c" && (
                <CaptonBtn
                  label="C"
                  handleClick={() => {}}
                  isSelected={p.selectedRole === "c"}
                />
              )}
              {hideCredit && p.selectedRole === "wc" && (
                <CaptonBtn
                  label="WC"
                  handleClick={() => {}}
                  isSelected={p.selectedRole === "wc"}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPreviewModal;
