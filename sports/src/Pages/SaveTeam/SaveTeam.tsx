import React, { useId, useMemo, useState } from "react";
import styles from "./SaveTeam.module.scss";
import Backbtn from "../../Components/Backbtn";
import { useNavigate, useParams } from "react-router-dom";
import TeamSummary from "../../Components/TeamSummary/TeamSummary";
import { useFantasy } from "../../context/FantasyContext";
import Player from "../../Components/Player/Player";
import TeamPreviewModal from "../TeamPreview/TeamPreviewModal";
import FooterBtn from "../../Components/footerBtn";
import type { FantasyTeam } from "../../context/FantasyTypes";
import { toast } from "react-toastify";
const SaveTeam = () => {
  const navigate = useNavigate();
  const { selectedPlayers, saveTeam ,clearPlayers} = useFantasy();
  const [openPreview, setOpenPreview] = useState(false);
  const params = useParams();
  
 
  const fantasyTeam: FantasyTeam = useMemo(
    () => ({
      id:params?.teamId+"",
      matchId: params?.matchId+"",
      players: selectedPlayers,
      captainId: selectedPlayers.find((player) => player.selectedRole === "c")
        ?.player_id+"",
      viceCaptainId: selectedPlayers.find(
        (player) => player.selectedRole === "wc"
      )?.player_id+"",
    }),
    [params?.matchId, params?.teamId, selectedPlayers]
  );

  return (
    <div className={`${styles.wrapper}`}>
      <header className={`${styles.header}`}>
        <Backbtn
          label="Select Captain and Vice Captain"
          handleRedirect={() => {
            navigate(-1);
          }}
        />
      </header>
      <main className={`${styles.main}`}>
        <TeamSummary
          selectedPlayers={selectedPlayers}
          context={"captain"}
          totalCredits={100}
          creditsLeft={0}
        />
        <div className={`${styles.player}`}>
          <Player tabData={selectedPlayers} context="captain" />
        </div>
      </main>
      <TeamPreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        selectedPlayers={selectedPlayers}
        hideCredit={true}
      />
      <FooterBtn
        label1="Team Preview"
        label2="Save Team"
        handleleftBtn={() => {
          setOpenPreview(true);
        }}
        handlelRightBtn={() => {
          if (
            selectedPlayers.some((player) => player.selectedRole === "c") &&
            selectedPlayers.some((player) => player.selectedRole === "wc")
          ) {
            saveTeam(fantasyTeam);
            navigate(`/my-team/${params.id}`);
            clearPlayers();
          } else {
            toast.error("Select Captain and vice captain to continue!");
          }
        }}
      />
    </div>
  );
};

export default SaveTeam;
