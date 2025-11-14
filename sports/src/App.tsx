import { Route, Routes } from "react-router-dom";
import UpcomingMatches from "./Pages/UpcomingMatches/UpcomingMatches";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UpcomingMatches />} />
    </Routes>
  );
}

export default App;
