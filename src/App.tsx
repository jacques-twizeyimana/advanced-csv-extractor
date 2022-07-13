import "./App.css";
import Import from "./components/molecules/Import";
import Popup from "./components/molecules/Popup";

function App() {
  return (
    <div className="h-screen bg-gray-50">
      <Popup open title={"Survey import wizard"} hasBorder={false}>
        <div className="w-[700px] max-w-3xl">
          <Import />
        </div>
      </Popup>
    </div>
  );
}

export default App;
