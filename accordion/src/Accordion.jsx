import { useState } from "react";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(new Set());

  const handleOpen = (index) => {
    setOpen((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="container">
      <h1>Accordion</h1>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        return (
          <div
            className={`accordion${isOpen ? " active" : ""}`}
            key={item.title}
            onClick={() => handleOpen(index)}
          >
            <label>
              {item.title}
              <span className="accordion-icon" />
            </label>
            <div className="accordion-content">
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
