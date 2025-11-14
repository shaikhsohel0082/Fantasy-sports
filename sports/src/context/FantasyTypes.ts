export interface Player {
  id: string;
  name: string;
  role: "BAT" | "WK" | "AR" | "BOWL";
  credit: number;
  team: string;
}

export interface FantasyTeam {
  id: string;
  matchId: string;
  players: Player[];
  captainId: string;
  viceCaptainId: string;
}

export interface FantasyContextType {
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string) => void;

  selectedPlayers: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  clearPlayers: () => void;

  saveTeam: (team: FantasyTeam) => void;
  allTeams: FantasyTeam[];
}
export interface User{
  id:string;
  name:string;
  image?:string;
  balance:number
}