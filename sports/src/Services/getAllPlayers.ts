import axios from "axios";
export type PlayerRole = "Bowler" | "All-Rounder" | "Batsman" | "Wicket-Keeper";
export interface IPlayer {
  player_id: number;
  name: string;
  role: PlayerRole;
  country?: string;
  short_name?: string;
  team_name?: string;
  team_logo?: string;
  team_short_name?: string;
  event_total_points: number;
  event_player_credit: number;
  team_id: number;
  selectedRole?:"c"|"wc"
}

export const getAllPlayers = async () => {
  try {
    const URL = import.meta.env.VITE_BASE_URL;
    const res = await axios.get(`${URL}/Get_All_Players_of_match.json`);
    return res.data as IPlayer[];
  } catch (err) {
    console.log(err);
    throw new Error("Error loading content!");
  }
};
