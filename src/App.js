import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

// import Filters from "./components/users/Filters";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Compare from "./components/Compare";
import Login from "./components/Login";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="filters" element={<Filters />}></Route>
          <Route path="compare" element={<Compare />}></Route>
        </Route> */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="filters" element={<Filters />}></Route>
        <Route path="compare" element={<Compare />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
