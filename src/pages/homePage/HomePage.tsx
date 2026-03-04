import { useSelector } from 'react-redux';
import { getCards, getIsCardsLoading } from '../../slices/cardsSlice';
import styles from './HomePage.module.css';
import { Loader } from '../../components/loader';
import { GalleryUI } from '../../components/gallery/Gallery';
import type { FC } from 'react';
import type { TCard } from '../../types';

export const HomePage: FC = () => {
  const isCardsLoading = useSelector(getIsCardsLoading);
  const cards: TCard[] = useSelector(getCards);
  return (
    <>
      {isCardsLoading ? (
        <Loader />
      ) : (
        <main className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.title}>Welcome to gallery!</h1>
            <GalleryUI items={cards} />
          </div>
        </main>
      )}
    </>
  );
};
