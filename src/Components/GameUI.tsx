import { useEffect, useState } from "react";
import useLingo5 from "../hooks/useLingo5";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import Nav from "./Nav";

export const GameUI = (props: { solution: string }) => {
  const { currentGuess, guesses, isCorrect, turn, usedKeys, handleKeyup } =
    useLingo5(props.solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 4) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <>
      <Nav />
      <div className="gameBoard">
        <div className="gameGrid">
          <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        </div>
        <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
        {showModal && (
          <Modal isCorrect={isCorrect} turn={turn} solution={props.solution} />
        )}
      </div>
    </>
  );
};
