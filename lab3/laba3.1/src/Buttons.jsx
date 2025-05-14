import React from 'react';
import { useImmer } from 'use-immer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Buttons = ({ count = 3 }) => {
  const [state, updateState] = useImmer({
    counters: Array(count).fill(0),
    lastClickedIndex: null
  });

  const handleClick = (index) => {
    updateState(draft => {
      draft.counters[index] += 1;
      draft.lastClickedIndex = index;
    });
  };

  return (
    <div className="d-flex flex-row align-items-start">
      {state.counters.map((counter, index) => (
        <button
          key={index}
          className={`btn ${state.lastClickedIndex === index ? 'btn-warning' : 'btn-dark'} m-2`}
          onClick={() => handleClick(index)}
        >
          {counter}
        </button>
      ))}
    </div>
  );
};

export default Buttons;