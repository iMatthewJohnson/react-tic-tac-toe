import React from "react";
import "./Square.css"

export default function Square (props) {

    const [isHovered, setIsHovered] = React.useState(false)

    const styles = {
        backgroundColor: determineBackgroundColor(),
        transform: (isHovered ? "scale(1.1)" : "scale(1)"),
        transitionProperty: "transform",
        transitionDuration: "250ms",
        cursor: "pointer"
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



    return (
        <div
            className="square"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={styles}
            onClick={() => props.onClick(props.index)}>
            {props.value}
        </div>
    )
}


