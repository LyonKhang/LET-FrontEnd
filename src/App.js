import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Show } from "./components/pages/Show";

function App() {
    return (
        <>
            <Router>
                <NavBar />

                <div className="pages">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show" element={<Show />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
