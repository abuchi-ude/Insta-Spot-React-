//import { cards } from "./data";
//import { useState } from "react";

function DisplayCards({ cards, openModal, handleLoveIcon }) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return (
      <div className="text-center p-6 text-gray-600">No cards to display.</div>
    );
  }

  return (
    <div className="w-full">
      <div className="gallery grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-6 p-6 w-full max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            className="grid-one-item p-4 rounded-lg shadow-md flex flex-col items-center transform transition-transform duration-300 justify-between"
            key={card.id || card.title || index}
          >
            <img
              className="image-one-section w-full h-100 object-cover rounded-md mb-4 border border-gray-200 cursor-pointer"
              src={card.image}
              alt={card.title}
              title={card.title}
              onClick={() => openModal(card)}
            />
            <div className="caption flex items-center justify-end gap-x-2 w-full px-2">
              <div className="text-xl font-semibold text-gray-800 flex">
                {card.title}
              </div>
              {/* Icon for the card - now with inline SVG for fill control */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer
                                  ${
                                    card.liked
                                      ? "text-red-500"
                                      : "text-gray-500 hover:text-gray-700"
                                  }`}
                onClick={() => handleLoveIcon(card.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayCards;