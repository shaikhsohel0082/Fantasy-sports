import { useState } from "react";
import styles from "./Match.module.scss";
import { useAllMatches } from "../../Hooks/useGetAllMatches";
import { useFantasy } from "../../context/FantasyContext";
const Match = () => {
  const tabs = [
    {
      id: "upcoming",
      value: "Upcoming",
    },
    {
      id: "completed",
      value: "Completed",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  return (
    <div
      className={`${styles.matchWrapper} w-100 h-50 d-flex justify-content-center flex-column`}
    >
      {/* match tabs */}
      <div
        className={`d-flex w-100 justify-content-between align-items-center ${styles.tabWrapper}`}
      >
        {tabs.map((tab) => (
          <div
            className={`${styles.tab} w-50 ${
              tab.id === activeTab ? styles.activeTab : ""
            }`}
            key={tab.id}
            onClick={() => {
              if (activeTab !== tab.id) {
                setActiveTab(tab.id);
              }
            }}
          >
            {tab.value}
          </div>
        ))}
      </div>
      {/* match details */}
      <MatchCard />
    </div>
  );
};

const MatchCard = () => {
  const { currentSport } = useFantasy();
  const { data, isLoading, isError } = useAllMatches(currentSport);

  return (
    <div className={styles.matchCardWrapper}>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error Loading content...</div>
      ) : data?.length === 0 ? (
        <div>No Matches found</div>
      ) : (
        <>
          {data.map((match) => (
            <div key={match.id} className={styles.card}>
              <img
                src={match.t1_image}
                alt={match.t1_name}
                className={styles.logo}
              />
              
              <div className="">
                <div className={styles.event}>{match.event_name}</div>
                <span className={styles.teamName}>{match.t1_short_name} </span>
                <span className={`${styles.vs}`}>VS </span>
                <span className={styles.teamName}>{match.t2_short_name}</span>
              </div>
              <img
                src={match.t2_image}
                alt={match.t2_name}
                className={styles.logo}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Match;
