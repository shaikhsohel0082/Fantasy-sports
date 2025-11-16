import type { JSX } from "react";
import type { IPlayer } from "../Services/getAllPlayers";


export interface FantasyTeam {
  id: string;
  matchId: string;
  players: IPlayer[];
  captainId: string;
  viceCaptainId: string;
}

export interface FantasyContextType {
  selectedPlayers: IPlayer[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
  clearPlayers: () => void;

  saveTeam: (team: FantasyTeam) => void;
  allTeams: FantasyTeam[];
  currentSport: SportsName;
  setCurrentSport: React.Dispatch<React.SetStateAction<SportsName>>
}
export interface User{
  id:string;
  name:string;
  image?:string;
  balance:number
}
export type SportsName="cricket"|"football"|"hockey"|"basketball"|"rugby"
export interface ISports {
  id: SportsName;
  name: string;
  image: JSX.Element;
}