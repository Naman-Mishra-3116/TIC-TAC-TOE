import React from "react";
import { useState } from "react";

function Player({ name, symbol, isActive, playerChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function onClickEdit() {
    setIsEditing((editing) => !editing); // in each case the editing will get the  latest value which will not  happen in the case of setIsEditing(!isEditing)
    if (isEditing) {
      playerChange(symbol, playerName);
    }
  }

  function onNameChange(event) {
    console.log(event.target.value);
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            defaultValue={playerName}
            onChange={onNameChange}
          ></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
