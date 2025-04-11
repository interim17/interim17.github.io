import { HashRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import LambRoast from "./pages/lambroast";

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* Top-level route => renders <Root> */}

                {/* index route => renders <Welcome> when path === "/" exactly */}
                <Route index element={<Welcome />} />
                {/* sub-route => "/lambroast" => renders <LambRoast> */}
                <Route path="lambroast" element={<LambRoast />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
