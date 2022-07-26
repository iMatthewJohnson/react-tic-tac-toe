import React from "react";
import "./Board.css"
import Square from "./Square";
import Button from 'react-bootstrap/Button'

export default function Board(props) {

    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [isXNext, setIsXNext] = React.useState(true)
    const [gameHasStarted, setGameHasStarted] = React.useState(false)

    const winner = calculateWinner(squares)

    function handleSquareClick(i) {
        setGameHasStarted(true)
        // If there's no winner AND no value currently at this square,
        // then set to either x or o
        if (!winner && !squares[i]) {
            setSquares(prevSquares => {
                const newSquares = prevSquares.slice()
                newSquares[i] = isXNext ? "X" : "O"
                return newSquares
            })
            setIsXNext(prevIsXNext => !prevIsXNext)
        }
    }

    function resetGame() {
        setSquares(Array(9).fill(null))
        setGameHasStarted(false)
    }

    const squareComponents = squares.map((value, index) =>
        <Square
            key={index}
            index={index}
            value={value}
            onClick={handleSquareClick}
            disabled={winner || squares[index]}
        />)

    return (
        <div className="board">
            <span className="game-status">{winner ? `The winner is ${isXNext ? "O" : "X"}` : `The next player is ${isXNext ? "X" : "O"}`}</span>
            <div className="squares">
                {squareComponents}
            </div>
            <Button
                onClick={resetGame}
                className="button"
                variant="primary"
                size="lg"
                disabled={!gameHasStarted}>
                    Restart
            </Button>
        </div>
    )
}

function calculateWinner(squares) {
    // Each item in array is a possible "win" combination
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}