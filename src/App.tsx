import "./App.css";
import Import from "./components/molecules/Import";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Page from "./stories/Page";

function App() {
  return (
    <div className="h-screen bg-gray-50 py-10 px-20">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Import />} />
          <Route path="/components" element={<Page />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
