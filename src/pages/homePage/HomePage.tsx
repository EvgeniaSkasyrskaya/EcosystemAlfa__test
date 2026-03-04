import type { FC } from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const handleRedirect = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    navigate('/products');
  };
  return (
    <div className={styles.page__container}>
      <h1 className={styles.page__title}>Welcome to the</h1>
      <button
        className={styles.home__button}
        type="button"
        onClick={handleRedirect}
      >
        Gallery of Products!
      </button>
      <h3 className={styles.page__text}>
        VPN may be required to download content correctly.
      </h3>
    </div>
  );
};
