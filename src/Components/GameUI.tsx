import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

export const GameUI = (props: { solution: string }) => {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(
    props.solution
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, isCorrect, turn]);

  return (
    <div>
      <h1>WORDLE-GAME</h1>
      <div> Your guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    </div>
  );
};
