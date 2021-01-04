import { memo, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {  
  
  const [inputValue, setInputValue] = useState({});
  
  useEffect(
    () => props.isOpen && setInputValue({ name: '', link: '' }),
    [props.isOpen]
  )

  function handleInputChange({ target }) {
    setInputValue(prevState => ({ ...prevState, [target.name]: target.value }));
    props.handleChange(target)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace(inputValue)
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-form'
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
          id="name"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          pattern="^[^\s]+(\s.*)?$"
          required
          value={inputValue.name || ''}
          onChange={handleInputChange}
        />
        <span className="popup__input-error">{props.errors.name}</span>
        <input
          type="url"
          className="popup__input"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          pattern="^[^\s]+(\s.*)?$"
          required
          value={inputValue.link || ''}
          onChange={handleInputChange}
        />
        <span className="popup__input-error">{props.errors.link}</span>
      </fieldset>
    </PopupWithForm>
  )

}

export default memo(AddPlacePopup)
