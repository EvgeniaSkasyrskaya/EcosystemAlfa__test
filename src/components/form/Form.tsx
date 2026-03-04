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
  const [errors, setErrors] = useState({ title: '', imageUrl: '' });

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
    const newErrors = { title: '', imageUrl: '' };
    if (values.title.length < 3) newErrors.title = 'Минимум 3 символа';
    if (!values.imageUrl.startsWith('http'))
      newErrors.imageUrl = 'Нужна ссылка на фото';

    setErrors(newErrors);
    return !newErrors.title && !newErrors.imageUrl;
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
    // navigate(-1);
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
        <input
          className={styles.cardForm__input_title}
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          placeholder="Название"
        />
        {errors.title && (
          <span className={styles.cardForm__error} style={{ color: 'red' }}>
            {errors.title}
          </span>
        )}

        <input
          className={styles.cardForm__input_imageUrl}
          value={values.imageUrl}
          onChange={(e) => setValues({ ...values, imageUrl: e.target.value })}
          placeholder="Ссылка на картинку"
        />
        {errors.imageUrl && (
          <span className={styles.cardForm__error} style={{ color: 'red' }}>
            {errors.imageUrl}
          </span>
        )}

        <img className={styles.cardForm__image} src={values.imageUrl} />
      </div>
      <div className={styles.cardForm__buttonsWrapper}>
        <button type="submit">{cardToEdit ? 'Сохранить' : 'Создать'}</button>
        {cardToEdit && (
          <button type="button" onClick={handleReset}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};
