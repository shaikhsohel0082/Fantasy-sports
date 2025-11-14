import React from "react";
import styles from "./UpcomingMatches.module.scss";
import type { User } from "../../context/FantasyTypes";
import UserAvatar from "../../Components/UserAvatar";
export interface Sports {
  id: string;
  name: string;
  image: string;
}
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
  const sports = [
    {
      id: "cricket",
      name: "Cricket",
      logo: "",
    },
  ];
  return (
    <div className="d-flex w-100 ">
      <header className="w-100">
        {/* User details */}
        <div className={`${styles.userDetails} w-100 py-3 px-2`}>
          {/* Profile details */}
          <div className="d-flex align-items-center">
            <UserAvatar user={userData} size={50} />
            <h5 className="ps-3 fs-4 d-flex flex-wrap">{userData.name}</h5>
            <div></div>
          </div>
          {/* Account balance or credits */}
          <div className="d-flex">
            <div className={styles.balanceText}>
              <span className="fs-4">
                <strong>&#8377; {userData.balance}</strong>{" "}
              </span>
              <span className="align-self-end opacity-75">Balance</span>
            </div>
            <button
              className="btn btn-info ms-3 "
              onClick={() => {
                alert("The feature is not implemnted yet");
              }}
            >
              +
            </button>
          </div>
        </div>
      </header>
      {/* Game section either cricket, football */}
      <section></section>
    </div>
  );
};

export default UpcomingMatches;
