// import { useEffect, useState } from 'react';
// import { Routes, Route,   useNavigate, useLocation } from 'react-router-dom';
// import { HomePage } from '../../pages/homePage';
// import { fetchCards } from '../../slices/cardsSlice';
// import '../../index.css';
// import styles from './App.module.css';
// import { useDispatch } from 'react-redux';
// import type { AppDispatch } from '../../slices/store';
// import { AppHeader } from '@components';
import { Routes, Route } from 'react-router-dom';
import { Heart } from 'react-feather';
import { CardUI } from '../card';

const mockCard = {
  id: 'card-1',
  title: 'Title',
  imageUrl: '',
  description: 'description',
};

export const App = () => {
  // const navigate = useNavigate();
  // // const location: Location<{ background: Location }> = useLocation();
  // // const background = location.state?.background;
  // const dispatch: AppDispatch = useDispatch();
  // // const onClose = () => navigate(-1);

  // useEffect(() => {
  //   dispatch(fetchCards());
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<CardUI {...mockCard} />} />
      <Route path="/products" element={<Heart />} />
      <Route path="/products/:id" element={<Heart />} />
      <Route path="/create-product" element={<Heart />} />
      <Route path="/favourites" element={<Heart />} />
      <Route path="*" element={<h1>404: Страница не найдена</h1>} />
    </Routes>
  );
};
