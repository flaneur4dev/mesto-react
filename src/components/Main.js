import { memo, useState, useEffect } from 'react';
import Card from './Card';
import { api } from '../utils/api';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ]).then(([{ name, about, avatar }, cards ]) => {
        setUserName(name);
        setUserDescription(about)
        setUserAvatar(avatar);
        setCards(cards)
    }).catch(err => alert(err))
      .finally(() => props.handleLoader())
  }, [])

  return (
    <main className="page__section">
      <section className="profile">
        <div className="profile__container">
          <img
            src={userAvatar}
            className="profile__image"
            name="avatar-button"
            alt="Аватар"
            onClick={props.onEditAvatar}
          />
        </div>

        <div className="profile__wrapper">
          <h1 className="profile__title" data-title>{userName}</h1>
          <button
            className="profile__button profile__button_type_edit-button"
            type="button"
            name="edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__subtitle">{userDescription}</p>
        </div>

        <button
          className="profile__button profile__button_type_add-button"
          type="button"
          name="add-button"
          onClick={props.onAddPlace}
        />
      </section>

      {cards.length
          ? (
            <section className="elements">
              {cards.map(card => <Card key={card._id} card={card} onCardClick={props.onCardClick} />)}
            </section>
            )
          : <div style={{ textAlign: 'center', fontSize: '20px' }}>Список пуст</div>
      }
    </main>
  )
}

export default memo(Main)
