import { useState, useEffect } from "react";

export default function TrafficLight({ trafficState }) {
  const [active, setActive] = useState("red");

  useEffect(() => {
    const { duration, next } = trafficState[active];

    const timmer = setTimeout(() => {
      setActive(next);
    }, duration);

    return () => clearTimeout(timmer);
  }, [active]);
  return (
    <main>
      <h1>Traffic Light</h1>
      <div className="light-container">
        {Object.keys(trafficState).map((current) => (
          <div
            className="light"
            style={{
              background:
                current === active ? trafficState[current].backgroundColor : "",
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
