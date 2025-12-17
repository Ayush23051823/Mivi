import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import Moviepage from "./Pages/Moviepage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import {Toaster} from "react-hot-toast"
import { useEffect } from "react";
import AIRecommendations from "./pages/AIRecommendations";

const App = () => {
  
  return (
    <div>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movie/:id"} element={<Moviepage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/ai-recommendations"} element={<AIRecommendations />} />
      </Routes>
    </div>
  );
};

export default App;