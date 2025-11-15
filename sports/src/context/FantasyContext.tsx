import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { FantasyContextType, FantasyTeam, Player, SportsName } from "./FantasyTypes";


const FantasyContext = createContext<FantasyContextType | undefined>(undefined);

export const FantasyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const [allTeams, setAllTeams] = useState<FantasyTeam[]>(() => {
    const saved = localStorage.getItem("fantasyTeams");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSport, setCurrentSport] = useState<SportsName>("cricket");

  const saveTeam = (team: FantasyTeam) => {
    const updated = [...allTeams, team];
    setAllTeams(updated);
    localStorage.setItem("fantasyTeams", JSON.stringify(updated));
  };

  const addPlayer = (player: Player) => {
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const removePlayer = (id: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const clearPlayers = () => setSelectedPlayers([]);

  return (
    <FantasyContext.Provider
      value={{
        selectedPlayers,
        addPlayer,
        removePlayer,
        clearPlayers,
        saveTeam,
        allTeams,
        currentSport,
        setCurrentSport,
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
