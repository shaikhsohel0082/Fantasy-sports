import { useNavigate, useParams } from "react-router-dom";
import { useAllMatches } from "../../Hooks/useGetAllMatches";
import { useFantasy } from "../../context/FantasyContext";
import { useMemo } from "react";
import styles from "./MyTeam.module.scss";
import Backbtn from "../../Components/Backbtn";
import FooterBtn from "../../Components/footerBtn";
const MyTeam = () => {
  const { currentSport } = useFantasy();
  const { id } = useParams();
  const { data, isLoading } = useAllMatches(currentSport);
  const requiredData = useMemo(() => {
    return data.find((item) => String(item.id) === String(id));
  }, [data, id]);
  const navigate = useNavigate();
  if (isLoading)
    return (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        Loading...
      </div>
    );
  return (
    <div className={styles.teamWrapper}>
      <header className={`${styles.header}`}>
        {/* Back button  */}
        <Backbtn
          label="Contest"
          handleRedirect={() => {
            navigate("/");
          }}
        />

        {/* Match details */}
        <div className={`${styles.matchDetails}`}>
          <div>
            <span className={`${styles.mathcLabel}`}>
              {requiredData?.t1_short_name}
            </span>
            <span className={`${styles.mathcLabel}`}> VS</span>{" "}
            <span className={`${styles.mathcLabel}`}>
              {requiredData?.t2_short_name}
            </span>
          </div>
          <div
            className={`${styles.startText} animate__animated animate__heartBeat animate__infinite`}
          >
            Starting soon
          </div>
        </div>
      </header>
      <main></main>
      <FooterBtn
        label1="Create Team"
        label2="Register Team with"
        handleleftBtn={() => {
          navigate("/pick-player");
        }}
        handlelRightBtn={() => {}}
      />
    </div>
  );
};

export default MyTeam;
