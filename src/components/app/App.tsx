import { useEffect } from 'react';
import { fetchCards } from '../../slices/cardsSlice';
import '../../index.css';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../slices/store';
import { Routes, Route } from 'react-router-dom';
import { Heart } from 'react-feather';
import { HomePage } from '../../pages/homePage';
import { CardDetailsPage } from '../../pages/cardDetailsPage';

export const App = () => {
  // const navigate = useNavigate();
  // const location: Location<{ background: Location }> = useLocation();
  // const background = location.state?.background;
  const dispatch: AppDispatch = useDispatch();
  // const onClose = () => navigate(-1);

  useEffect(() => {
    dispatch(fetchCards());
  }, []);
  return (
    <div className={styles.app}>
      <header className={styles.app__header}></header>
      <Routes>
        <Route path="/" element={<Heart />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/products/:id" element={<CardDetailsPage />} />
        <Route path="/create-product" element={<Heart />} />
        <Route path="/favourites" element={<Heart />} />
        <Route path="*" element={<h1>404: Страница не найдена</h1>} />
      </Routes>
      <footer className={styles.app__footer}></footer>
    </div>
  );
};
