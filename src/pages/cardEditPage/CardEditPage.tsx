import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/loader';
import { getCards } from '../../slices/cardsSlice';
import styles from './CardEditPage.module.css';
import type { TCard } from './../../types';
import { CardFormUI } from '../../components/form';

export const CardEditPage: FC = () => {
  const cardId = String(useParams().id);
  const cardData =
    useSelector(getCards).find((card: TCard) => card.id === cardId) ?? null;
  if (!cardData) {
    return <Loader />;
  }
  return (
    <div className={styles.page__container}>
      <CardFormUI key={cardData.id} card={cardData} />
    </div>
  );
};
