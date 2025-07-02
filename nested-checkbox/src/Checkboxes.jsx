import { useState } from "react";

const Checkbox = ({
  checkboxesData,
  checkedObj,
  setCheckedObj,
  defaultData,
}) => {
  const handleChange = (isChecked, node) => {
    setCheckedObj((prev) => {
      const newState = { ...prev, [node.id]: isChecked || false };

      const updateCheckedObj = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked || false;
          child.children && updateCheckedObj(child);
        });
      };
      updateCheckedObj(node);

      const verifyChildren = (data) => {
        if (!data.children) return newState[data.id] || false;
        newState[data.id] = data.children.every((child) =>
          verifyChildren(child)
        );
        return newState[data.id];
      };
      defaultData.forEach((data) => verifyChildren(data));

      return newState;
    });
  };
  return (
    <ul>
      {checkboxesData.map((node) => (
        <li key={node.id}>
          <label>
            <input
              type="checkbox"
              checked={checkedObj[node.id] || false}
              onChange={(e) => handleChange(e.target.checked, node)}
            />
            {node.name}
          </label>
          {node.children && (
            <Checkbox
              checkboxesData={node.children}
              checkedObj={checkedObj}
              setCheckedObj={setCheckedObj}
              defaultData={defaultData}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Checkboxes({ checkboxesData }) {
  const [checkedObj, setCheckedObj] = useState({});
  return (
    <div>
      <Checkbox
        checkboxesData={checkboxesData}
        checkedObj={checkedObj}
        setCheckedObj={setCheckedObj}
        defaultData={checkboxesData}
      />
    </div>
  );
}
