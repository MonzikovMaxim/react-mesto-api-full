const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const UnauthorizedError = require('../errors/unauthorized');
const ForbiddenError = require('../errors/forbidden');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((error) => {
    if (error.name === 'ValidationError') {
      throw new BadRequest('Неверные данные');
    } else {
      next(error);
    }
  })
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new UnauthorizedError('Переданы некорректные данные при создании карточки.');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          Card.deleteOne({ card })
            .then(res.send({ message: 'Пост удалён' }));
        } else {
          throw new ForbiddenError('Чужие карточки удалять запрещено');
        }
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new UnauthorizedError('Невалидный id');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      res.status(200).send(card);
    } else {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      throw new UnauthorizedError('Переданы некорректные данные для постановки/снятии лайка.');
    } else {
      next(error);
    }
  })
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      res.status(200).send(card);
    } else {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      throw new UnauthorizedError('Переданы некорректные данные для постановки/снятии лайка.');
    } else {
      next(error);
    }
  })
  .catch(next);
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
