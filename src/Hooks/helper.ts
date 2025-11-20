import { toast } from "react-toastify";
import type { IPlayer } from "../Services/getAllPlayers";

const canSelectPlayer = (selected: IPlayer[], player: IPlayer) => {
  // RULE 1: max 11 players
  if (selected.length >= 11) {
    toast.error("Your Team is Complete please go to next step!");
    return false;
  }

  // RULE 2: max 7 players from one team
  const teamCount = selected.filter((p) => p.team_id === player.team_id).length;
  if (teamCount >= 7) {
    toast.error("You can select maxium 7 players from one team");
    return false;
  }

  // RULE 3: credit limit 100
  const totalCredits =
    selected.reduce((acc, p) => acc + p.event_player_credit, 0) +
    player.event_player_credit;

  if (totalCredits > 100) {
    toast.error("Insufficient credits!");
    return false;
  }

  // RULE 4: role restrictions
  const roleCount = {
    batsman: selected.filter((p) => p.role === "Batsman").length,
    bowler: selected.filter((p) => p.role === "Bowler").length,
    all_rounder: selected.filter((p) => p.role === "All-Rounder").length,
    wicket_keeper: selected.filter((p) => p.role === "Wicket-Keeper").length,
  };

  switch (player.role) {
    case "Batsman":
      if (roleCount.batsman >= 7) {
        toast.error("You can select Maximum 7 Batsman!");
        return false;
      }
      break;
    case "Bowler":
      if (roleCount.bowler >= 7) {
        toast.error("You can select Maximum 7 Bowler!");
        return false;
      }
      break;
    case "All-Rounder":
      if (roleCount.all_rounder >= 4) {
        toast.error("You can select Maximum 4 AR!");
        return false;
      }
      break;
    case "Wicket-Keeper":
      if (roleCount.wicket_keeper >= 5) {
        toast.error("You can select Maximum 5 WK!");
        return false;
      }
      break;
  }

  return true;
};
export { canSelectPlayer };
export const validatePlayers=(selected: IPlayer[])=>{
  if(selected.filter((player)=>player.role==="Wicket-Keeper").length===0){
     toast.error("Minimum 1 WK required!");
     return false;
  }
  
}
