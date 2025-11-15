import { useNavigate } from "react-router-dom";
import Backbtn from "../../Components/Backbtn";
import FooterBtn from "../../Components/footerBtn";
import styles from "./PickPlayer.module.scss";
import type { PlayerRole } from "../../Services/getAllPlayers";
import { useState } from "react";
import Player from "../../Components/Player/Player";
const PickPlayer = () => {
  const navigate = useNavigate();
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
  const [activeTab, setActiveTab] = useState(tabs[0].id);
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
        <div className={`${styles.tabWrapper}`}>
          {tabs.map((tab) => (
            <div
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`${activeTab === tab.id ? styles.activeTab : ""} ${
                styles.tab
              }`}
            >
              {tab.value}
            </div>
          ))}
        </div>
        <Player tab={activeTab} />
      </main>
      <FooterBtn
        label1="Team Preview"
        label2="Save Team"
        handleleftBtn={() => {}}
        handlelRightBtn={() => {}}
      />
    </div>
  );
};

export default PickPlayer;
