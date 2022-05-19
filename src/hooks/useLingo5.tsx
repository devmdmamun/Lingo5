import { useState } from "react";

const useLingo5 = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<object[][]>([...Array(5)]); // each guess is an array
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({});

  // format a guess into an array of letter objects
  // e.g. [{key: "a", color: "yellow"}]

  const formatGuess = () => {
    let solutionArray: string[] = [...solution];
    let formattedGuess: { key: string; color: string }[] = [
      ...currentGuess,
    ].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letter.
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = "";
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = "";
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the incorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: { key: string; color: string }[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prev) => {
      return [...prev, currentGuess];
    });
    setTurn((prev) => {
      return prev + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  // handle the keyup event & track current guess
  // if the user presses enter, add the new guess
  const handleKeyup = ({ key }: { key: string }) => {
    if (key === "Enter") {
      // only add guess if turn is less then five
      // if not submitted before (duplicate)
      // word must be five chars long
      if (turn > 4) {
        return;
      }
      if (history.includes(currentGuess)) {
        return;
      }
      if (currentGuess.length < 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key.toUpperCase();
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useLingo5;
