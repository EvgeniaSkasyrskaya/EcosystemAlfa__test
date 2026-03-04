import type { FC } from 'react';
import type { TCard } from '../../types';
import styles from './cardDetails.module.css';
import { Heart, Edit, XSquare } from 'react-feather';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../slices/store';
import { toggleLikeCard, setCardToEdit } from '../../slices/cardsSlice';
import { useNavigate } from 'react-router-dom';

type CardDetailsUIProps = {
  card: TCard;
  className?: string;
};

export const CardDetailsUI: FC<CardDetailsUIProps> = ({ card, className }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);
  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(toggleLikeCard(card));
  };
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(setCardToEdit(card));
    navigate(`/edit/${card.id}`);
  };

  return (
    <article
      className={
        className
          ? `${className} ${styles.cardDetails__container}`
          : styles.cardDetails__container
      }
    >
      <div className={styles.cardDetails__iconWrapper}>
        <button
          type="button"
          className={styles.cardDetails__button}
          onClick={handleLike}
        >
          <Heart
            className={styles.cardDetails__icon}
            fill={card.isLiked ? 'black' : 'none'}
          />
        </button>
        <button
          type="button"
          className={styles.cardDetails__button}
          onClick={handleEdit}
        >
          <Edit className={styles.cardDetails__icon} />
        </button>
        <button
          type="button"
          className={styles.cardDetails__button}
          onClick={onClose}
        >
          {/* <span className={styles.cardDetails__buttonText}>Назад</span> */}
          <XSquare className={styles.cardDetails__icon} />
        </button>
      </div>
      <img className={styles.cardDetails__image} src={card.imageUrl} />
      <div className={styles.cardDetails__wrapper}>
        <div className={styles.cardDetails__textInfo}>
          {card.title && (
            <h3 className={styles.cardDetails__title}>{card.title}</h3>
          )}
          {card.description && (
            <p className={styles.cardDetails__text}>{card.description}</p>
          )}
        </div>
        <div className={styles.cardDetails__icons}></div>
      </div>
    </article>
  );
};
