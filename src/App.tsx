import React, { useCallback, useState } from 'react';
import { Slider } from './components/Slider/Slider';
import { CreatePostModal } from './components/CreatePostModal';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const onAddPostButton = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCloseModalButton = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <NavBar onAddPostButton={onAddPostButton} />
      {showModal && (
        <CreatePostModal onCloseModalButton={onCloseModalButton} />
      )}
      <Slider />
      <Footer />
    </>
  );
};

export default App;
