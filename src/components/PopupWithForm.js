import { memo, useEffect } from "react";

function PopupWithForm(props) {
  useEffect(() => {
    if (!props.isOpen) return;
    
    const handleEscapeClose = event => event.key === "Escape" && props.onClose();
    document.addEventListener("keydown", handleEscapeClose);

    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, [props.isOpen])
  
  function handleOverlayClose({ target, currentTarget }) {
    target === currentTarget && props.onClose()
  }
  
  return (
    <section
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      onMouseDown={handleOverlayClose}
    >
      <form className="popup__container" id={props.name} name={props.name} onSubmit={props.onSubmit} noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button
          className="popup__button popup__button_type_submit-button"
          type="submit"
          disabled={props.isDisabled}
          dangerouslySetInnerHTML={{__html: props.button}}
        />
        <button
          className="popup__button popup__button_type_close-button"
          type="button"
          name="close-button"
          onClick={props.onClose}
        />
      </form>
    </section>
  )
}

export default memo(PopupWithForm)
