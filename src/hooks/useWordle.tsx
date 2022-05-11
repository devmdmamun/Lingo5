import { useState } from "react";

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<object[][]>([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // format a guess into an array of letter objects
  // e.g. [{key: "a", color: "yellow"}]
  const formatGuess = () => {
    let solutionArray: (string | null)[] = [...solution];
    let formattedGuess: { key: string | null; color: string }[] = [
      ...currentGuess,
    ].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letter.
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the incorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: object[]) => {
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
    setCurrentGuess("");
  };

  // handle the keyup event & track current guess
  // if the user presses enter, add the new guess
  const handleKeyup = ({ key }: { key: string }) => {
    if (key === "Enter") {
      // only add guess if turn is less then five
      // if not submitted before (duplicate)
      // word must be five chars long
      if (turn > 5) {
        console.log("You don't have any guess left");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("You already tried this word");
        return;
      }
      if (currentGuess.length < 5) {
        console.log("words must be 5 chars long");
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
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
