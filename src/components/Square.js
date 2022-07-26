import React from "react";
import "./Square.css"

export default function Square (props) {

    const [isHovered, setIsHovered] = React.useState(false)
    const [isMouseDown, setIsMouseDown] = React.useState(false)

    const styles = {
        backgroundColor: determineBackgroundColor(),
        transform: determineTransform(),
        pointerEvents: props.disabled ? "none" : "all",
        transitionProperty: "transform",
        transitionDuration: "250ms",
        cursor: "pointer"
    }

    function determineTransform() {
        if (isMouseDown) return "scale(0.9)"
        if (isHovered) return "scale(1.1)"
        return "scale(1.0)"
    }

    function determineBackgroundColor() {
        if (props.value === null) return "#c4bba1"
        if (props.value === 'X') return "#bcf7ee"
        if (props.value === 'O') return "#f7aafa"
    }

    function handleMouseEnter() {
        setIsHovered(true)
    }

    function handleMouseLeave() {
        setIsHovered(false)
    }

    function handleMouseDown() {
        console.log("clicked down")
        setIsMouseDown(true)
    }

    function handleMouseUp() {
        setIsMouseDown(false)
    }



    return (
        <div
            className="square"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={styles}
            onClick={() => props.onClick(props.index)}>
            {props.value}
        </div>
    )
}


