import React from "react";
import "./Board.css"
import Square from "./Square";
import Button from 'react-bootstrap/Button'

export default function Board(props) {

    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [isXNext, setIsXNext] = React.useState(true)
    const [hasGameStarted, setHasGameStarted] = React.useState(false)

    const winner = calculateWinner(squares)

    function handleClick(i) {
        if (!winner && squares[i] == null) {
            setSquares(prevSquares => {
                const newSquares = prevSquares.slice()
                newSquares[i] = isXNext ? "X" : "O"
                return newSquares
            })
            setIsXNext(prevState => !prevState)
        }
    }

    function resetGame() {
        setSquares(Array(9).fill(null))
    }

    function handleClickButton() {
        setHasGameStarted(prevState => {
            if (prevState) resetGame()
            return !prevState
        })
    }

    const squareComponents = squares.map((value, index) =>
        <Square
            key={index}
            index={index}
            value={value}
            onClick={handleClick}
        />)

    return (
        <div className="board">
            <div className={"squares " + (hasGameStarted && !winner ? "" : "disabled")}>
                {squareComponents}
            </div>
            <Button
                onClick={handleClickButton}
                className="button"
                variant={hasGameStarted ? "secondary" : "success"}
                size="lg">
                {hasGameStarted ? "Restart" : "Start"}
            </Button>
        </div>
    )
}

function calculateWinner(squares) {
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