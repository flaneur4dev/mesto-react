import { memo, useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {
  
  const [inputValue, setInputValue] = useState({});
  
  const currentUser = useContext(CurrentUserContext);
  useEffect(
    () => props.isOpen && setInputValue({ name: currentUser.name, about: currentUser.about }),
    [props.isOpen]
  )

  function handleInputChange({ target }) {
    setInputValue(prevState => ({ ...prevState, [target.name]: target.value }));
    props.handleChange(target)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(inputValue)
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-form'
      button={props.submitButton}
      isDisabled={props.isDisabled}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__wrapper">
        <input
          type="text"
          className="popup__input"
          id="person"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          pattern="^[^\s]+(\s.*)?$"
          required
          value={inputValue.name || ''}
          onChange={handleInputChange}
        />
        <span className="popup__input-error">{props.errors.person}</span>
        <input
          type="text"
          className="popup__input"
          id="about"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          pattern="^[^\s]+(\s.*)?$"
          required
          value={inputValue.about || ''}
          onChange={handleInputChange}
        />
        <span className="popup__input-error">{props.errors.about}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default memo(EditProfilePopup)
