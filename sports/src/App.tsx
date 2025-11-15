import { Route, Routes } from "react-router-dom";
import UpcomingMatches from "./Pages/UpcomingMatches/UpcomingMatches";
import MyTeam from "./Pages/MyTeam/MyTeam";
import PickPlayer from "./Pages/PickPlayer/PickPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UpcomingMatches />} />
      <Route path="/my-team/:id" element={<MyTeam />} />
       <Route path="/pick-player" element={<PickPlayer />} />
    </Routes>
  );
}

export default App;
