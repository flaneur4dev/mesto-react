import { useState, useEffect, useRef } from 'react';
import Loader from './Loader'
import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { setCustomErrorMessages, defaultValidationMessage, defaultSubmitButtons, defaultSubmitTitle } from '../utils/utils';

function App() {

  const [isAppLoading, setIsAppLoading] = useState(true);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ isOpen: false, currentCard: {} });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ]).then(([data, cards ]) => {
        setCurrentUser(data);
        setCards(cards)
      })
      .catch(err => alert(err))
      .finally(() => setIsAppLoading(false))
  }, [])

  const [saveButtonTitle, setSaveButtonTitle] = useState(defaultSubmitTitle.save);
  const [addButtonTitle, setAddButtonTitle] = useState(defaultSubmitTitle.add);
  const [confirmButtonTitle, setConfirmButtonTitle] = useState(defaultSubmitTitle.confirm );

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(defaultSubmitButtons);
  const [validationMessage, setValidationMessage] = useState(defaultValidationMessage);
  
  const inputsRef = useRef(new Set());

  function handleChange(input) {
    setCustomErrorMessages(input);

    inputsRef.current.add(input);

    const isDisabled = !input.form.checkValidity();

    setIsSubmitDisabled(prevState => ({ ...prevState, [input.form.id]: isDisabled }));
    setValidationMessage(prevState => ({ ...prevState, [input.id]: input.validationMessage }));
  }

  function handleUpdateUser(newUser) {
    setSaveButtonTitle('Сохранение <span class ="dot">.</span>')

    api.updateUserData(newUser)
      .then(data => setCurrentUser(data))
      .catch(err => alert(err))
      .finally(() => {
        setSaveButtonTitle(defaultSubmitTitle.save)
        closeAllPopups()
      })
  }

  function handleUpdateAvatar(newAvatar) {
    setSaveButtonTitle('Сохранение <span class ="dot">.</span>')

    api.updateAvatar(newAvatar)
      .then(data => setCurrentUser(prevState => ({ ...prevState, avatar: data.avatar })))
      .catch(err => alert(err))
      .finally(() => {
        setSaveButtonTitle(defaultSubmitTitle.save)
        closeAllPopups()
      })
  }

  function handleAddPlaceSubmit(newCard) {
    setAddButtonTitle('Добавление <span class ="dot">.</span>')

    api.addCard(newCard)
      .then(card => setCards([ card, ...cards ]))
      .catch(err => alert(err))
      .finally(() => {
        setAddButtonTitle(defaultSubmitTitle.add)
        closeAllPopups()
      })
  }

  const idRef = useRef();

  function handleCardDelete(event) {
    event.preventDefault();

    setConfirmButtonTitle('Удаление <span class ="dot">.</span>')

    api.deleteCard(idRef.current)
      .then(() => {
        const newCards = cards.filter(item => item._id !== idRef.current);
        setCards(newCards)
      })
      .catch(err => alert(err))
      .finally(() => {
        setConfirmButtonTitle(defaultSubmitTitle.confirm)
        closeAllPopups()
      })
  }

  function handleCardLike(cardId, isLiked) {
    if (isLiked) {
      api.deleteLike(cardId)
        .then(card => {
          if (card.likes.some(item => item._id !== currentUser._id) || !card.likes.length) {
            const newCards = cards.map(item => item._id === cardId ? card : item);
            setCards(newCards)
          }
        })
        .catch(err => alert(err))
    } else {
      api.addLike(cardId)
        .then(card => {
          if (card.likes.some(item => item._id === currentUser._id)) {
            const newCards = cards.map(item => item._id === cardId ? card : item);
            setCards(newCards)
          }
        })
        .catch(err => alert(err))
    }
  }

  function handleEscClose({ key }) {
    key === 'Escape' && closeAllPopups()
  }

  function addListener() {
    document.onkeydown = handleEscClose;
  }

  function handleAddPlaceClick() {
    addListener();
    setIsAddPlacePopupOpen(true)
  }

  function handleEditProfileClick() {
    addListener();
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    addListener();
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    addListener();
    setSelectedCard({ isOpen: true, currentCard: card })
  }
  
  function handleConfirmClick(cardId) {
    idRef.current = cardId;
    addListener();
    setIsConfirmPopupOpen(true)
  }
  
  function closeAllPopups() {
    document.onkeydown = '';

    setIsSubmitDisabled(defaultSubmitButtons);
    setValidationMessage(defaultValidationMessage);
    inputsRef.current.forEach(input => input.setCustomValidity(''));
    inputsRef.current.clear();

    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(prevState => ({ ...prevState, isOpen: false }));
    setIsConfirmPopupOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isAppLoading && <Loader />}
        <Header />
        <Main
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isDisabled={isSubmitDisabled['add-form']}
          submitButton={addButtonTitle}
          errors={validationMessage}
          onClose={closeAllPopups}
          handleChange={handleChange}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isDisabled={isSubmitDisabled['edit-form']}
          submitButton={saveButtonTitle}
          errors={validationMessage}
          onClose={closeAllPopups}
          handleChange={handleChange}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isDisabled={isSubmitDisabled['avatar-form']}
          submitButton={saveButtonTitle}
          errors={validationMessage}
          onClose={closeAllPopups}
          handleChange={handleChange}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title='Вы уверены'
          name='confirm-form'
          button={confirmButtonTitle}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
