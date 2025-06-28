import { useState } from "react";

export default function FileList({ data, level }) {
  const [expanded, setExpanded] = useState({});
  data.sort((a, b) => a.name.localeCompare(b.name));

  const handleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {data.map((listItem) => (
        <li key={listItem.id} style={{ paddingLeft: (level - 1) * 16 }}>
          <div className="list-content">
            {listItem.children && (
              <span onClick={() => handleExpand(listItem.id)}>
                {expanded[listItem.id] ? "📂" : "📁"}
              </span>
            )}
            <span>{listItem.name}</span>
          </div>

          {expanded[listItem.id] && listItem.children && (
            <ul>
              <FileList data={listItem.children} level={level + 1} />
            </ul>
          )}
        </li>
      ))}
    </>
  );
}
