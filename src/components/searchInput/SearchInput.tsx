import styles from './SearchInput.module.css';
import type { AppDispatch } from '../../slices/store';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchQuery, setSearchQuery } from '../../slices/cardsSlice';

export const SearchInput: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const inputValue: string | undefined = useSelector(getSearchQuery);
  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Поиск..."
      value={inputValue}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};
