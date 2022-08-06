import React, { Component, useEffect, useState } from "react";
import "../styles/App.css";

const increment = (displacement) => {
  return displacement + 5;
}

const decrement = (displacement) => {
  return displacement - 5;
}

const actionXMapping = {
  ArrowLeft: decrement,
  ArrowRight: increment
}

const actionYMapping = {
  ArrowUp: decrement,
  ArrowDown: increment
}

const Board = ({ style }) => {
  return (
    <div className="board">
      <div className="ball" style={style}></div>
    </div>
  )
}

const App = () => {
  const [renderBall, setRenderBall] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ballPosition, setBallPosition] = useState({
    left: "0px",
    top: "0px",
  });
  const reset = () => {
    setRenderBall(false);
    setBallPosition({ left: '0px', right: '0px' });
    setX(0);
    setY(0);
  };

  const start = () => {
    setRenderBall(true);
  };

  const handleChange = (e) => {
    const keyPressed = e.key;
    const actionX = actionXMapping[keyPressed];
    const actionY = actionYMapping[keyPressed];
    actionX && setX(actionX);
    actionY && setY(actionY);
  }

  const renderChoice = () => {
    if (renderBall) {
      return (
        <Board
          onKeyPress={handleChange}
          style={ballPosition}
        />
      )
    } else {
      return (
        <button
          className="start"
          onClick={start}
        >
          Start
        </button>
      )
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleChange);
  }, [])

  useEffect(() => {
    setBallPosition({ left: `${x}px`, top: `${y}px` });
  }, [x, y])

  return (
    <div className="playground">
      <button onClick={reset} className="reset">
        Reset
      </button>
      {renderChoice()}
    </div>
  );
};

export default App;
