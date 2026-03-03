import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getCardsApi } from '../api';
import type { TCard } from '../types';

export const fetchCards = createAsyncThunk('cards/fetchCards', async () =>
  getCardsApi(),
);

export interface CardsState {
  cardsList: TCard[];
  isCardsLoading: boolean;
}

export const initialState: CardsState = {
  cardsList: [],
  isCardsLoading: true,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<TCard>) {
      const newCard: TCard = action.payload;
      state.cardsList.unshift(newCard);
    },
    deleteCard(state, action: PayloadAction<TCard>) {
      state.cardsList = state.cardsList.filter(
        (card) => card.id !== action.payload.id,
      );
    },
  },
  selectors: {
    getCards: (state) => state.cardsList,
    getIsCardsLoading: (state) => state.isCardsLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isCardsLoading = true;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.isCardsLoading = false;
      })
      .addCase(
        fetchCards.fulfilled,
        (state, action: PayloadAction<TCard[]>) => {
          state.isCardsLoading = false;
          state.cardsList = [...state.cardsList, ...action.payload];
        },
      );
  },
});

export const { getCards, getIsCardsLoading } = cardsSlice.selectors;

export default cardsSlice.reducer;

// export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async () => {
//   const response = await fetch('https://api.thedogapi.com');
//   const data = await response.json();
//   return data.map(dog => ({
//     id: dog.id,
//     url: dog.url,
//     name: dog.breeds[0]?.name || 'Случайная собака',
//     info: dog.breeds[0]?.temperament || 'Очень дружелюбный пес',
//     isCustom: false // пометка, что это данные из API
//   }));
// });

// const dogsSlice = createSlice({
//   name: 'dogs',
//   initialState: {
//     items: [],
//     status: 'idle',
//   },
//   reducers: {
//     // Редюсер для добавления карточки пользователем
//     addDog: (state, action) => {
//       state.items.unshift({
//         ...action.payload,
//         id: Date.now(),
//         isCustom: true // пометка для пользовательской карточки
//       });
//     },
//     // Редюсер для удаления
//     removeDog: (state, action) => {
//       state.items = state.items.filter(dog => dog.id !== action.payload);
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDogs.pending, (state) => { state.status = 'loading'; })
//       .addCase(fetchDogs.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.items = [...state.items, ...action.payload];
//       });
//   },
// });

// export const { addDog, removeDog } = dogsSlice.actions;
// export default dogsSlice.reducer;
