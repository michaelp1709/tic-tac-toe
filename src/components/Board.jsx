import { Square } from "./Square.jsx";
import { TURNS } from "../constants.js";
import { WinnerModal } from "./WinnerModal.jsx";
import { useState } from "react";
import confetti from "canvas-confetti";
import { checkWinnerFrom, checkEndGame } from "../logic/board.js";
// eslint-disable-next-line react/prop-types
export const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board]; //copia del tablero
    newBoard[index] = turn;
    setBoard(newBoard); //actualizar el tablero
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn); //actualizar el turno

    //verificar si existe un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Resetar partida</button>
      <section className="game">
        {/* eslint-disable-next-line react/prop-types */}
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
};
