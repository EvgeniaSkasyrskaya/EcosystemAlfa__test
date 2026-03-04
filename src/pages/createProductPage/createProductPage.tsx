import type { FC } from 'react';
import styles from './createProductPage.module.css';
import { CardFormUI } from '../../components/form';

export const CreateProductPage: FC = () => {
  return (
    <div className={styles.page__container}>
      <CardFormUI card={null} />
    </div>
  );
};
