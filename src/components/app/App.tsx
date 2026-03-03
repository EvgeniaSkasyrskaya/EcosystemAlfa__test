import { Routes, Route } from 'react-router-dom';
import { Heart } from 'react-feather';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Heart />} />
      <Route path="/products" element={<Heart />} />
      <Route path="/products/:id" element={<Heart />} />
      <Route path="/create-product" element={<Heart />} />
      <Route path="/favourites" element={<Heart />} />
      <Route path="*" element={<h1>404: Страница не найдена</h1>} />
    </Routes>
  );
};
