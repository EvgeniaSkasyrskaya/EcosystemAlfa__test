import styles from './SearchInput.module.css';
import type { AppDispatch } from '../../slices/store';
import { useDispatch, useSelector } from 'react-redux';
import { XSquare } from 'react-feather';
import { getSearchQuery, setSearchQuery } from '../../slices/cardsSlice';

export const SearchInput: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const inputValue: string | undefined = useSelector(getSearchQuery);
  const handleClear = () => {
    dispatch(setSearchQuery(''));
  };
  return (
    <div className={styles.searchInput__container}>
      <input
        className={styles.searchInput__input}
        type="text"
        placeholder="Поиск..."
        value={inputValue}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <button
        type="button"
        className={styles.searchInput__button}
        onClick={handleClear}
      >
        <XSquare className={styles.searchInput__icon} stroke="#555" />
      </button>
    </div>
  );
};
