import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("none"); // Added sort option state

  // Function to sort cards based on the selected option
  const sortCards = (cards) => {
    switch (sortOption) {
      case "priority":
        return cards.sort((a, b) => b.priority - a.priority); // Sort by priority (descending)
      case "title":
        return cards.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (ascending)
      default:
        return cards; // No sorting
    }
  };

  const sortedCards = sortCards([...props.board.cards]); // Create a sorted copy of the cards

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
        {/* Sorting Dropdown */}
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="none">Sort by: None</option>
          <option value="title">Sort by: Title</option>
          <option value="priority">Sort by: Priority</option>
        </select>
      </div>
      <div className="board_cards custom-scroll">
        {sortedCards.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
