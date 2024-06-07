import React from "react";

function Log({ logs }) {
  return (
    <ol id="log">
      {logs.map((log, index) => (
        <li key={index}>
          {log.player} selected {log.square.row},{log.square.col}
        </li>
      ))}
    </ol>
  );
}

export default Log;
