import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cacheResult, setCacheResult] = useState({});
  const [highLighted, setHighLighted] = useState(-1);

  const listboxId = "autocomplete-listbox";
  const generateOptionId = (idx) => `autocomplete-option-${idx}`;

  const fetchData = async () => {
    if (cacheResult[searchInput]) {
      console.log("Getting the resutl from CACHE");
      setResult(cacheResult[searchInput]);
      return;
    }
    console.log("API Called for: ", searchInput);

    const response = await fetch(
      "https://dummyjson.com/products/search?q=" + searchInput
    );
    const jsonResponse = await response.json();
    setResult(jsonResponse?.products);
    setCacheResult((prev) => ({
      ...prev,
      [searchInput]: jsonResponse?.products,
    }));
  };

  useEffect(() => {
    if (!searchInput) {
      setResult([]);
      return;
    }
    const timer = setTimeout(fetchData, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleKeyDown = (e) => {
    if (!showResult) return;
    console.log("Event triggered: ", e.key);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighLighted((i) => (i < result.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighLighted((i) => (i <= 0 ? result.length - 1 : i - 1));
        break;
    }
  };

  return (
    <div className="wrapper">
      <h1>Autocomplete</h1>
      <input
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        className="search-input"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
        onKeyDown={handleKeyDown}
      />
      {showResult && result.length > 0 && (
        <ul className="search-result-container" role="listbox" id={listboxId}>
          {result?.map((item, idx) => (
            <li
              className={`search-result ${
                highLighted === idx ? "highlighted" : ""
              }`}
              key={item.id}
              role="option"
              id={generateOptionId(item.id)}
              onMouseDown={() => {
                setSearchInput(item.title);
                setShowResult(false);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
