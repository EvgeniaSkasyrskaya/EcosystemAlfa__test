import { useEffect } from 'react';
import { fetchCards } from '../../slices/cardsSlice';
import '../../index.css';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../slices/store';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/homePage';
import { ProductsGalleryPage } from '../../pages/productsGalleryPage';
import { CardDetailsPage } from '../../pages/cardDetailsPage';
import { CardEditPage } from '../../pages/cardEditPage';
import { CreateProductPage } from '../../pages/createProductPage';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <header className={styles.app__header}></header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsGalleryPage />} />
        <Route path="/products/:id" element={<CardDetailsPage />} />
        <Route path="/edit/:id" element={<CardEditPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="*" element={<h1>404: Страница не найдена</h1>} />
      </Routes>
      <footer className={styles.app__footer}></footer>
    </div>
  );
};
