import { Route, Routes } from "react-router-dom";
import UpcomingMatches from "./Pages/UpcomingMatches/UpcomingMatches";
import MyTeam from "./Pages/MyTeam/MyTeam";
import PickPlayer from "./Pages/PickPlayer/PickPlayer";
import SaveTeam from "./Pages/SaveTeam/SaveTeam";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UpcomingMatches />} />
      <Route path="/my-team/:id" element={<MyTeam />} />
       <Route path="/:matchId/pick-player/:teamId" element={<PickPlayer />} />
       <Route path="/:matchId/save-team/:teamId" element={<SaveTeam />} />
    </Routes>
  );
}

export default App;
