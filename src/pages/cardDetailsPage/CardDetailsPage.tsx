import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/loader';
import { CardDetailsUI } from '../../components/cardDetails';
import { getCards } from '../../slices/cardsSlice';
import styles from './CardDetailsPage.module.css';
import type { TCard } from './../../types';

export const CardDetailsPage: FC = () => {
  const cardId = String(useParams().id);
  const cardData =
    useSelector(getCards).find((card: TCard) => card.id === cardId) ?? null;
  console.log('cardData', cardData);
  if (!cardData) {
    return <Loader />;
  }
  return (
    <div className={styles.page__container}>
      <CardDetailsUI card={cardData} />
    </div>
  );
};
