import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type {
  FantasyContextType,
  FantasyTeam,
  SportsName,
} from "./FantasyTypes";
import type { IPlayer } from "../Services/getAllPlayers";

const FantasyContext = createContext<FantasyContextType | undefined>(undefined);

export const FantasyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>(() => {
    const saved = localStorage.getItem("selectedPlayers");
    return saved ? JSON.parse(saved) : [];
  });

  const [allTeams, setAllTeams] = useState<FantasyTeam[]>(() => {
    const saved = localStorage.getItem("fantasyTeams");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSport, setCurrentSport] = useState<SportsName>("cricket");

  const saveTeam = (team: FantasyTeam) => {
  // check if team already exists
  const exists = allTeams.some((t) => t.id === team.id);

  let updatedTeams;

  if (exists) {
    // update existing team
    updatedTeams = allTeams.map((t) =>
      t.id === team.id ? team : t
    );
  } else {
    // create new team
    updatedTeams = [...allTeams, team];
  }

  // update state + localStorage
  setAllTeams(updatedTeams);
  localStorage.setItem("fantasyTeams", JSON.stringify(updatedTeams));
};


  const clearPlayers = () => setSelectedPlayers([]);

  return (
    <FantasyContext.Provider
      value={{
        selectedPlayers,
        clearPlayers,
        saveTeam,
        allTeams,
        currentSport,
        setCurrentSport,
        setSelectedPlayers,
      }}
    >
      {children}
    </FantasyContext.Provider>
  );
};

export const useFantasy = () => {
  const context = useContext(FantasyContext);
  if (!context)
    throw new Error("useFantasy must be used inside FantasyProvider");
  return context;
};
