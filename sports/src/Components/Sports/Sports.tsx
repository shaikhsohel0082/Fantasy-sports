import { useFantasy } from "../../context/FantasyContext";
import type { ISports } from "../../context/FantasyTypes";
import styles from "./Sports.module.scss";

const Sports = () => {
  const sports: ISports[] = [
    {
      id: "cricket",
      name: "Cricket",
      image: <i className="fa-solid fa-baseball-bat-ball"></i>,
    },
    {
      id: "football",
      name: "Football",
      image: <i className="fa-solid fa-futbol"></i>,
    },
    {
      id: "basketball",
      name: "Basketball",
      image: <i className="fa-solid fa-basketball"></i>,
    },
    {
      id: "rugby",
      name: "Rugby",
      image: <i className="fa-solid fa-football"></i>,
    },
    {
      id: "hockey",
      name: "hockey",
      image: <i className="fa-solid fa-hockey-puck"></i>,
    },
  ];
  const { currentSport, setCurrentSport } = useFantasy();
  return (
    <div className={styles.sportsection}>
      {sports.map((sport) => (
        <div
          key={sport.id}
          className={`d-flex flex-column align-items-center`}
          onClick={() => {
            if (currentSport !== sport.id) {
              setCurrentSport(sport.id);
            }
          }}
        >
          <div
            className={`${styles.logo}  ${
              currentSport === sport.id ? styles.selectedSport : ""
            }`}
          >
            {sport.image}
          </div>
          <span className="mt-3">{sport.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sports;
