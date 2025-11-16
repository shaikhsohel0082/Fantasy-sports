import axios from "axios";
import type { SportsName } from "../context/FantasyTypes";
export interface IMatch {
  id: number;
  short_name: string;
  match_name: string;
  event_id: number;
  team_a_id: number;
  team_b_id: number;
  event_name: string;
  sport_id: number;
  sport_type: string;
  announcement: string | null;
  toss_details: string | null;
  match_status: string;
  match_result: string;
  match_type: string;
  match_date: string;
  playing_xi_added: number;
  match_completed_at: string | null;
  t1_name: string;
  t2_name: string;
  t1_short_name: string;
  t2_short_name: string;
  t1_image: string;
  t2_image: string;
  leagues_joined: number;
  in_review: number;
}
export interface IMatchRes {
  matches: {
    [key in SportsName]?: IMatch[];
  };
}

export const getAllMatches = async () => {
  try {
    const URL = import.meta.env.VITE_BASE_URL;
    const res = await axios.get(`${URL}/Get_All_upcoming_Matches.json`);
    return res.data as IMatchRes;
  } catch (err) {
    console.log(err);
    throw new Error("Error loading content!");
  }
};
