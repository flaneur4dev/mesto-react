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
  // console.log('App');

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
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, currentCard: card })
  }
  
  function closePopup() {
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
        onClose={handleAddPlaceClick}
      >
        <FieldSet inputsData={addInputsData} />
      </PopupWithForm>

      <PopupWithForm
        title='Редактировать профиль'
        button='Сохранить'
        name='edit-form'
        isOpen={isEditProfilePopupOpen}
        onClose={handleEditProfileClick}
      >
        <FieldSet inputsData={editInputsData} />
      </PopupWithForm>

      <PopupWithForm
        title='Обновить аватар'
        button='Сохранить'
        name='avatar-form'
        isOpen={isEditAvatarPopupOpen}
        onClose={handleEditAvatarClick}
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

      <ImagePopup card={selectedCard} onClose={closePopup} />
    </div>
  )
}

export default App
