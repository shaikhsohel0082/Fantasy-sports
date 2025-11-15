import Sports from "../../Components/Sports/Sports";
import UserAvatar from "../../Components/UserAvatar";
import type { User } from "../../context/FantasyTypes";
import styles from "./UpcomingMatches.module.scss";
import bgVideo from "../../assets/bg.mp4";
import Match from "../../Components/Match/Match";

const UpcomingMatches = () => {
  {
    /* Keeping user as static data as there is no login functionality for now
        replace it with actual user when login functionality is added */
  }
  const userData: User = {
    id: "123456789",
    name: "Sohel Shaikh",
    balance: 1000,
  };

  return (
    <div className={styles.wrapper}>
      {/* Background Video */}
      <video autoPlay loop muted className={styles.bgVideo}>
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay Layer */}
      <div className={styles.overlay}></div>

      {/* All Your Content */}
      <div className={styles.content}>
        <header className="w-100">
          <div className={`${styles.userDetails} w-100 py-3 px-2`}>
            <div className="d-flex align-items-center">
              <UserAvatar user={userData} size={50} />
              <h5 className="ps-3 fs-4 d-flex flex-wrap">{userData.name}</h5>
            </div>

            <div className="d-flex">
              <div className={styles.balanceText}>
                <span className="fs-4">
                  <strong>&#8377; {userData.balance}</strong>
                </span>
                <span className="align-self-end opacity-75">Balance</span>
              </div>

              <button
                className="btn btn-info ms-3"
                onClick={() => alert("The feature is not implemented yet")}
              >
                +
              </button>
            </div>
          </div>
        </header>

        {/* sports section showing all sports icon here*/}

        <Sports />
        {/* Mtach section- showing all matches here */}

        <Match />
      </div>
    </div>
  );
};

export default UpcomingMatches;
