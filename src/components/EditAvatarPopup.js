import { memo, useEffect, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditAvatarPopup(props) {
  
  const inputRef = useRef();
  
  const currentUser = useContext(CurrentUserContext);
  useEffect(
    () => props.isOpen && (inputRef.current.value = currentUser.avatar),
    [props.isOpen]
  )

  function handleInputChange({ target }) {
    props.handleChange(target)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({ avatar: inputRef.current.value })
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar-form'
      button={props.submitButton}
      isDisabled={props.isDisabled}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__wrapper">
        <input
          ref={inputRef}
          type="url"
          className="popup__input"
          id="avatar-link"
          name="avatar"
          placeholder="Ссылка на аватар"
          pattern="^[^\s]+(\s.*)?$"
          required
          onChange={handleInputChange}
        />
        <span className="popup__input-error">{props.errors['avatar-link']}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default memo(EditAvatarPopup)
