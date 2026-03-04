import type { FC } from 'react';
import type { TCard } from '../../types';
import styles from './Card.module.css';
import { Heart, Edit, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../slices/store';
import { deleteCard, toggleLikeCard } from '../../slices/cardsSlice';

type CardUIProps = {
  card: TCard;
  className?: string;
};

export const CardUI: FC<CardUIProps> = ({ card, className }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(deleteCard(card));
  };
  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleLikeCard(card));
  };
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <article
      className={
        className
          ? `${className} ${styles.card__container}`
          : styles.card__container
      }
    >
      <img className={styles.card__image} src={card.imageUrl} />
      <button
        type="button"
        className={`${styles.card__button} ${styles.card__button_delete}`}
        onClick={handleDelete}
      >
        <Trash2
          className={`${styles.card__icon} ${styles.card__icon_delete}`}
        />
      </button>
      <div className={styles.card__wrapper}>
        <div className={styles.card__textInfo}>
          {card.title && <h3 className={styles.card__title}>{card.title}</h3>}
          {card.description && (
            <p className={styles.card__text}>{card.description}</p>
          )}
        </div>
        <div className={styles.card__icons}>
          <button
            type="button"
            className={styles.card__button}
            onClick={handleLike}
          >
            <Heart
              className={styles.card__icon}
              fill={card.isLiked ? 'black' : 'none'}
            />
          </button>
          <button
            type="button"
            className={styles.card__button}
            onClick={handleEdit}
          >
            <Edit className={styles.card__icon} />
          </button>
        </div>
      </div>
    </article>
  );
};
