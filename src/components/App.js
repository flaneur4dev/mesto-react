import { useState, useCallback } from 'react';
import Loader from './Loader'
import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import FieldSet from './FieldSet';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { addInputsData, editInputsData, avatarInputsData } from '../utils/constants';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ isOpen: false, currentCard: {} });

  const handleLoader = useCallback(
    () => setIsLoading(!isLoading),
    [isLoading]
  )

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, currentCard: card })
  }
  
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(prevState => ({ ...prevState, isOpen: false }))
  }

  return (
    <div className="page">
      {isLoading && <Loader />}
      <Header />
      <Main
        handleLoader={handleLoader}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title='Новое место'
        button='Добавить'
        name='add-form'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <FieldSet inputsData={addInputsData} />
      </PopupWithForm>

      <PopupWithForm
        title='Редактировать профиль'
        button='Сохранить'
        name='edit-form'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <FieldSet inputsData={editInputsData} />
      </PopupWithForm>

      <PopupWithForm
        title='Обновить аватар'
        button='Сохранить'
        name='avatar-form'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <FieldSet inputsData={avatarInputsData} />
      </PopupWithForm>

      <PopupWithForm
        title='Вы уверены'
        button='Да'
        name='confirm-form'
        // isOpen={}
        // onClose={}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  )
}

export default App
