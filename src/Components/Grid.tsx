import Row from "./Row";

export default function Grid({
  currentGuess,
  guesses,
  turn,
}: {
  currentGuess: string;
  guesses: object[][];
  turn: number;
}) {
  return (
    <div>
      {guesses.map((g, i) => {
        return <Row key={i} />;
      })}
    </div>
  );
}
