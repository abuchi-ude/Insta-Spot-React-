import { useState } from 'react';
import Header from './header.jsx';
import Profile from './profile.jsx';
import DisplayCards from './gallery.jsx';
import Footer from './footer.jsx';
import { loadCards, saveCards } from './data';

function App() {
  const [cards, setCards] = useState(loadCards());

  // Handler for adding a new card
  const handleAddCard = (newCard) => {
    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);
    saveCards(updatedCards);
  };

  return (
    <>
      <Header />
      <Profile onAddCard={handleAddCard} />
      <DisplayCards cards={cards} />
      <Footer />
    </>
  );
}

export default App;