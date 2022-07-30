import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log(userId);
      setLoggedInUser(userId);
    }
  }, []);

  if (loggedInUser !== "") {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
