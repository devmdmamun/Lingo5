import React from "react";

export default function Modal({
  isCorrect,
  turn,
  solution,
}: {
  isCorrect: boolean;
  turn: number;
  solution: string;
}) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h2>You Win!</h2>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses (*_*)</p>
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h2>Never Mind</h2>
          <p className="solution">{solution}</p>
          <p>Better luck next time (*_*)</p>
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      )}
    </div>
  );
}
