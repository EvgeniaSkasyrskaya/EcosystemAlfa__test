import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectVisibleCards,
  getIsCardsLoading,
  getSearchQuery,
} from '../../slices/cardsSlice';
import styles from './HomePage.module.css';
import { Loader } from '../../components/loader';
import { PlusCircle } from 'react-feather';
import { GalleryUI } from '../../components/gallery/Gallery';
import { FilterDropdown } from '../../components/filterDropdown';
import { SearchInput } from '../../components/searchInput';
import type { FC } from 'react';
import type { TCard } from '../../types';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const isCardsLoading = useSelector(getIsCardsLoading);
  const searchQuery: string | undefined = useSelector(getSearchQuery);
  const cards: TCard[] = useSelector(selectVisibleCards);
  const filteredCards: TCard[] = !searchQuery
    ? cards
    : cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );

  return (
    <>
      {isCardsLoading ? (
        <Loader />
      ) : (
        <main className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.title}>Welcome to gallery!</h1>
            <button
              type="button"
              className={styles.button}
              onClick={() => navigate('/create-product')}
            >
              <PlusCircle size={40} />
            </button>
            <FilterDropdown />
            <SearchInput />
            <GalleryUI items={filteredCards} />
          </div>
        </main>
      )}
    </>
  );
};
