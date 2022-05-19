import React from "react";
import { ReactComponent as Delete } from "../assets/delete-left-solid.svg";

export default function Keypad({
  usedKeys,
  handleKeyup,
}: {
  usedKeys: { [key: string]: string };
  handleKeyup: ({ key }: { key: string }) => void;
}) {
  const keyLineArray = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "<="],
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickedElement = e.target as HTMLElement;
    const clickedLetter = clickedElement.getAttribute("data-key");

    if (clickedLetter === "ENTER") {
      handleKeyup({ key: "Enter" });
      return;
    }
    if (clickedLetter === null) {
      handleKeyup({ key: "Backspace" });
      return;
    }
    handleKeyup({ key: clickedLetter });
  };

  return (
    <div className="keypad">
      {keyLineArray.map((keyLine) => {
        let lineIndex = keyLineArray.indexOf(keyLine);

        return (
          <div key={lineIndex}>
            {keyLine.map((keys) => {
              const color = usedKeys[keys];

              if (lineIndex === 2 && keys === "<=") {
                return (
                  <button onClick={handleClick} key={keys}>
                    <Delete className={"deleteIcon"} />
                  </button>
                );
              }
              return (
                <button
                  data-key={keys}
                  onClick={handleClick}
                  key={keys}
                  className={color}
                >
                  {keys}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
