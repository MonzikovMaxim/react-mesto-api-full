import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from "../utils/auth.js";
import api from "../utils/Api.js";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register.js";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          console.log(userInfo);
          setCards(cards);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      Auth.getContent(token)
        .then((userInfo) => {
          setLoggedIn(true);
          setCurrentUser(userInfo)
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/sign-in')
  }

  function onRegister({email, password}) {
    Auth.register(email, password)
    .then(() => {
        setIsRegister(true);
        handleToolTipOpen();
        history.push('/sign-in'); 
    })
    .catch((err) => {
      console.log(err)
      setIsRegister(false);
    })
    .finally(() => {
      handleToolTipOpen();
    })
  }

 function onLogin(userInfo) {
   Auth.authorize(userInfo).then((res) => {
       setLoggedIn(true);
       localStorage.setItem('jwt', res.token);
       history.push('/')
   })
   .catch(error => console.log(error))
 }

  function handleToolTipOpen() {
    setIsToolTipOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data.avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteCardPopupClick(card) {
    setSelectedCard(card);
    setDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsToolTipOpen(false)
  }

  return (
      <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={onSignOut} email={currentUser.email} />
          <Switch>
            <Route path="/sign-up">
              <Register 
                onRegister={onRegister}
                textButton="Зарегистрироваться" />
            </Route>
            <Route path="/sign-in">
              <Login 
                onLogin={onLogin}
                textButton="Войти" />
            </Route>
           
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onDeleteCard={handleDeleteCardPopupClick}
            onClickCard={handleCardClick}
            onCardLike={handleCardLike}
            isLoading={isLoading}
          />
          
          </Switch>
          { loggedIn && <Footer /> }
          
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />

          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />

          <DeleteCardPopup
            card={selectedCard}
            isOpen={isDeleteCardPopupOpen}
            onDeleteCard={handleCardDelete}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
          isOpen={isToolTipOpen}
          onClose={closeAllPopups}
          isRegister={isRegister}
           />
            
        </CurrentUserContext.Provider>
      </div> 
  );
}

export default App;
