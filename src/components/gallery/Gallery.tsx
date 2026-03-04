import type { FC } from 'react';
import type { TCard } from '../../types';
import styles from './Gallery.module.css';
import { CardUI } from '../card';
import { Link } from 'react-router-dom';

type GalleryUIProps = {
  className?: string;
  title?: string;
  items: TCard[];
};

export const GalleryUI: FC<GalleryUIProps> = ({ className, title, items }) => {
  return (
    <section
      className={
        className
          ? `${className} ${styles.gallery__container}`
          : styles.gallery__container
      }
    >
      {title && <h2 className={styles.gallery__title}>{title}</h2>}
      <ul className={styles.gallery__list}>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.id} relative="path">
              <CardUI card={item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
