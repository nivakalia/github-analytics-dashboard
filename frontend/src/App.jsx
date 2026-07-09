import {
  Routes,
  Route
} from "react-router-dom";

import SearchPage from "./pages/SearchPage2";
import DashboardPage from "./pages/DashboardPage";

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<SearchPage />}
      />
      <Route
        path="/dashboard/:owner/:repo"
        element={<DashboardPage />}
      />
    </Routes>
  );
}

export default App;