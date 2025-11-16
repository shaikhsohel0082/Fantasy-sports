import { useId, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Backbtn from "../../Components/Backbtn";
import FooterBtn from "../../Components/footerBtn";
import Player from "../../Components/Player/Player";
import TeamSummary from "../../Components/TeamSummary/TeamSummary";
import { useFantasy } from "../../context/FantasyContext";
import { useGetAllPlayers } from "../../Hooks/useGetAllPlayers";
import type { PlayerRole } from "../../Services/getAllPlayers";
import TeamPreviewModal from "../TeamPreview/TeamPreviewModal";
import styles from "./PickPlayer.module.scss";
import { toast } from "react-toastify";
const tabs: Array<{
  id: PlayerRole;
  value: string;
}> = [
  {
    id: "All-Rounder",
    value: "AR",
  },
  {
    id: "Batsman",
    value: "Batsman",
  },
  {
    id: "Wicket-Keeper",
    value: "WK",
  },
  {
    id: "Bowler",
    value: "Bowler",
  },
];
const PickPlayer = () => {
  const navigate = useNavigate();
  const { selectedPlayers } = useFantasy();
  const params = useParams();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [openPreview, setOpenPreview] = useState(false);

  const creditsLeft = useMemo(() => {
    return (
      100 - selectedPlayers.reduce((sum, p) => sum + p.event_player_credit, 0)
    );
  }, [selectedPlayers]);

  const { tabData } = useGetAllPlayers({ tab: activeTab });
  return (
    <div className={`${styles.wrapper}`}>
      <header className={`${styles.header}`}>
        <Backbtn
          label="Select Players"
          handleRedirect={() => {
            navigate(-1);
          }}
        />
      </header>
      <main className={`${styles.main}`}>
        <TeamSummary
          selectedPlayers={selectedPlayers}
          totalCredits={100}
          creditsLeft={creditsLeft}
          context="player"
        />
        <div className={`${styles.tabWrapper}`}>
          {tabs.map((tab) => (
            <div
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`${activeTab === tab.id ? styles.activeTab : ""} ${
                styles.tab
              }`}
              key={tab.id}
            >
              {tab.value}
            </div>
          ))}
        </div>
        <div className={`${styles.player}`}>
          <div className={`${styles.playerTitle}`}>
            <span></span>
            <p>Player</p>
            <p>Points</p>
            <p>Credits</p>
          </div>
          <Player tabData={tabData} context="player" />
        </div>
      </main>
      <TeamPreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        selectedPlayers={selectedPlayers}
      />
      <FooterBtn
        label1="Team Preview"
        label2="Save Team"
        handleleftBtn={() => {
          if (selectedPlayers.length === 0) {
            toast.error("Select atleat one player to preview!");
          } else {
            setOpenPreview(true);
          }
        }}
        handlelRightBtn={() => {
          if (selectedPlayers.length === 11) {
            navigate(`/${params?.matchId}/save-team/${params.teamId}`);
          } else {
            toast.error("Team size must be of 11 players!");
          }
        }}
      />
    </div>
  );
};

export default PickPlayer;
