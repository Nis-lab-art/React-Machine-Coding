import "./App.css";
import TrafficLight from "./TrafficLight";

const trafficState = {
  red: { backgroundColor: "red", duration: "2000", next: "yellow" },
  yellow: { backgroundColor: "yellow", duration: "2000", next: "green" },
  green: { backgroundColor: "green", duration: "3000", next: "red" },
};

function App() {
  return <TrafficLight trafficState={trafficState} />;
}

export default App;
