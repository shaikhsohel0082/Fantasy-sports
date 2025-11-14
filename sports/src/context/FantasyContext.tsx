import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { FantasyContextType, FantasyTeam, Player } from "./FantasyTypes";

const FantasyContext = createContext<FantasyContextType | undefined>(undefined);

export const FantasyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const [allTeams, setAllTeams] = useState<FantasyTeam[]>(() => {
    const saved = localStorage.getItem("fantasyTeams");
    return saved ? JSON.parse(saved) : [];
  });

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
        selectedMatchId,
        setSelectedMatchId,
        selectedPlayers,
        addPlayer,
        removePlayer,
        clearPlayers,
        saveTeam,
        allTeams,
      }}
    >
      {children}
    </FantasyContext.Provider>
  );
};

export const useFantasy = () => {
  const context = useContext(FantasyContext);
  if (!context) throw new Error("useFantasy must be used inside FantasyProvider");
  return context;
};
