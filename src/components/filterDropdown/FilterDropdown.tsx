import styles from './FilterDropdown.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterMode,
  setFilterMode,
  type TFilterMode,
} from '../../slices/cardsSlice';

export const FilterDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(getFilterMode);

  return (
    <div className={styles.filter__container}>
      <select
        className={styles.filter__select}
        value={currentMode}
        onChange={(e) => dispatch(setFilterMode(e.target.value as TFilterMode))}
      >
        <option className={styles.filter__option} value="all">
          Все карточки
        </option>
        <option className={styles.filter__option} value="liked">
          Только избранные
        </option>
        <option className={styles.filter__option} value="custom">
          Созданные мной
        </option>
      </select>
    </div>
  );
};
