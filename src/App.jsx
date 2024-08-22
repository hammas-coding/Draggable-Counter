import React, { useState } from "react";
import Draggable from "react-draggable";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [lastY, setLastY] = useState(null);
  const [animationClass, setAnimationClass] = useState("");
  const [dragged, setDragged] = useState(false);

  const handleDrag = (e, data) => {
    if (lastY === null) {
      setLastY(data.y);
      return;
    }

    const deltaY = data.y - lastY;

    if (!dragged) {
      if (deltaY < -10) {
        setCount((prevCount) => prevCount + 1);
        setAnimationClass("increment");
        setDragged(true);
      } else if (deltaY > 10) {
        setCount((prevCount) => Math.max(prevCount - 1, 0));
        setAnimationClass("decrement");
        setDragged(true);
      }
    }
  };

  const handleStop = () => {
    setLastY(null);
    setDragged(false);
    setTimeout(() => setAnimationClass(""), 300);
  };

  return (
    <div className="outer-div">
      <div className="main-div">
        <div className="text-div">
          <h1>Hunt Counter</h1>
          <p className="note-text">
            Drag up <span>Number</span> for <span>increment</span> and Drag down
            for <span>decrement</span>
          </p>
        </div>
        <Draggable
          axis="y"
          onDrag={handleDrag}
          onStop={handleStop}
          bounds="parent"
          position={{ x: 0, y: 0 }}
        >
          <div className={`counter-box ${animationClass}`}>
            <span className="counter-number">{count}</span>
          </div>
        </Draggable>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
};

export default App;
