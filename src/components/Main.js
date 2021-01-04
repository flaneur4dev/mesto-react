import { memo, useState, useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  const [tipStyle, setTipStyle] = useState({ display: 'none', top: '', left: '' });
  const [tipContent, setTipContent] = useState('');

  function handleTipOpen({ clientX, clientY, target: { scrollWidth, clientWidth, textContent } }) {
    if (scrollWidth > clientWidth) {
      setTipStyle({
        display: 'block',
        top: `${clientY + window.pageYOffset + 10}px`,
        left: `${clientX + window.pageXOffset + 10}px`,
      })
      setTipContent(textContent)
    }
  }

  function handleTipClose() {
    setTipStyle(prevState => ({ ...prevState, display: 'none' }))
  }

  return (
    <main className="page__section">
      <section className="profile">
        <div className="profile__container">
          <img
            src={currentUser.avatar}
            className="profile__image"
            name="avatar-button"
            alt="Аватар"
            onClick={props.onEditAvatar}
          />
        </div>

        <div className="profile__wrapper">
          <h1 className="profile__title" onMouseMove={handleTipOpen} onMouseLeave={handleTipClose}>
            {currentUser.name}
          </h1>
          <button
            className="profile__button profile__button_type_edit-button"
            type="button"
            name="edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__subtitle" onMouseMove={handleTipOpen} onMouseLeave={handleTipClose}>
            {currentUser.about}
          </p>
        </div>

        <button
          className="profile__button profile__button_type_add-button"
          type="button"
          name="add-button"
          onClick={props.onAddPlace}
        />
      </section>

      {props.cards.length
          ? (
            <section className="elements">
              {props.cards.map(card => (
                <Card
                  key={card._id}
                  card={card}
                  userId={currentUser._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  handleTipOpen={handleTipOpen}
                  handleTipClose={handleTipClose}
                />
              ))}
            </section>
            )
          : <div style={{ textAlign: 'center', fontSize: '20px' }}>Список пуст</div>
      }

      <span className="tip" style={tipStyle}>{tipContent}</span>
    </main>
  )
}

export default memo(Main)
