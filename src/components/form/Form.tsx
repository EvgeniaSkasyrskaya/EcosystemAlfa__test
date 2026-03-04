import { useState, type SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css';
import type { TCard } from '../../types';
import {
  addCard,
  updateCard,
  getCardToEdit,
  setCardToEdit,
} from '../../slices/cardsSlice';
import { useNavigate } from 'react-router-dom';

type CardFormUIProps = {
  card: null | TCard;
};

export const CardFormUI: React.FC<CardFormUIProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardToEdit = useSelector(getCardToEdit);

  const [values, setValues] = useState(
    cardToEdit
      ? {
          title: cardToEdit.title,
          imageUrl: cardToEdit.imageUrl,
          description: cardToEdit.description,
        }
      : { title: '', imageUrl: '', description: '' },
  );
  const [errors, setErrors] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });

  // useEffect(() => {
  //   if (cardToEdit) {
  //     setValues({
  //       title: cardToEdit.title,
  //       imageUrl: cardToEdit.imageUrl,
  //       description: cardToEdit.description || '',
  //     });
  //   }
  // }, [cardToEdit]);

  const validate = () => {
    const newErrors = { title: '', imageUrl: '', description: '' };
    if (values.title.length < 3)
      newErrors.title = 'Минимум 3 символа для имени автора';
    if (values.description.length < 3)
      newErrors.description = 'Минимум 3 символа для описания изображения';
    if (!values.imageUrl.startsWith('http'))
      newErrors.imageUrl = 'Нужна ссылка на фото, начинающаяся с http';

    setErrors(newErrors);
    return !newErrors.title && !newErrors.imageUrl && !newErrors.description;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!validate()) return;

    if (cardToEdit) {
      dispatch(updateCard({ ...cardToEdit, ...values }));
    } else {
      dispatch(
        addCard({
          ...values,
          id: crypto.randomUUID(),
          isLiked: false,
          isCustom: true,
        }),
      );
    }
    handleReset();
  };

  const handleReset = () => {
    navigate(-1);
    setValues({ title: '', imageUrl: '', description: '' });
    dispatch(setCardToEdit(null));
  };

  return (
    <form
      className={styles.cardForm__container}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.cardForm__inputsWrapper}>
        <label className={styles.cardForm__input}>
          <span className={styles.cardForm__input_label}>Имя автора:</span>
          <input
            className={styles.cardForm__input_title}
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Имя автора"
            name="title"
            required
          />
          {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </label>

        <label className={styles.cardForm__input}>
          <span className={styles.cardForm__input_label}>
            Описание изображения:
          </span>
          <input
            className={styles.cardForm__input_description}
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            placeholder="Описание"
            name="description"
            required
          />
          {errors.description && (
            <span style={{ color: 'red' }}>{errors.description}</span>
          )}
        </label>

        <label className={styles.cardForm__input}>
          <span className={styles.cardForm__input_label}>
            Ссылка на изображение:
          </span>
          <input
            className={styles.cardForm__input_imageUrl}
            value={values.imageUrl}
            onChange={(e) => setValues({ ...values, imageUrl: e.target.value })}
            placeholder="Ссылка на изображение"
            name="imageUrl"
            required
          />
          {errors.imageUrl && (
            <span style={{ color: 'red' }}>{errors.imageUrl}</span>
          )}
        </label>

        <img className={styles.cardForm__image} src={values.imageUrl} />
      </div>
      <div className={styles.cardForm__buttonsWrapper}>
        <button className={styles.cardForm__button} type="submit">
          {cardToEdit ? 'Сохранить' : 'Создать'}
        </button>
        {cardToEdit && (
          <button
            className={styles.cardForm__button}
            type="button"
            onClick={handleReset}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};
