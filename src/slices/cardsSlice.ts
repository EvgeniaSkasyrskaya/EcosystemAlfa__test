import {
  createSlice,
  createSelector,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getCardsApi } from '../api';
import type { TCard } from '../types';

export const fetchCards = createAsyncThunk('cards/fetchCards', async () =>
  getCardsApi(),
);

export type TFilterMode = 'all' | 'liked' | 'custom';

export interface CardsState {
  cardsList: TCard[];
  isCardsLoading: boolean;
  filterMode: TFilterMode;
  cardToEdit: TCard | null;
  searchQuery: string | undefined;
  searchResults: TCard[];
}

export const initialState: CardsState = {
  cardsList: [],
  isCardsLoading: true,
  filterMode: 'all',
  cardToEdit: null,
  searchQuery: undefined,
  searchResults: [],
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
    toggleLikeCard(state, action: PayloadAction<TCard>) {
      const card = state.cardsList.find((card) => card.id == action.payload.id);
      if (card) card.isLiked = !card.isLiked;
    },
    setFilterMode(state, action: PayloadAction<TFilterMode>) {
      state.filterMode = action.payload;
    },
    setCardToEdit(state, action: PayloadAction<TCard | null>) {
      state.cardToEdit = action.payload;
    },
    updateCard(state, action: PayloadAction<TCard>) {
      const indexCardToEdit = state.cardsList.findIndex(
        (card) => card.id === action.payload.id,
      );
      if (indexCardToEdit !== -1) {
        state.cardsList[indexCardToEdit] = action.payload;
      }
      state.cardToEdit = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    // setSearchResults: (state, action: PayloadAction<string>) => {
    //   state.cardsList.filter((card) =>
    //     card.title
    //       .trim()
    //       .toLowerCase()
    //       .includes(action.payload.toLowerCase()) === true,
    //   );
    // },
    // clearSearchQuery: (state) => {
    //   state.searchQuery = '';
    // },
  },
  selectors: {
    getCards: (state) => state.cardsList,
    getIsCardsLoading: (state) => state.isCardsLoading,
    getFilterMode: (state) => state.filterMode,
    getCardToEdit: (state) => state.cardToEdit,
    getSearchQuery: (state) => state.searchQuery,
    // getSearchResults: (state) => state.searchResults,
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

export const {
  getCards,
  getIsCardsLoading,
  getFilterMode,
  getCardToEdit,
  getSearchQuery,
  // getSearchResults,
} = cardsSlice.selectors;
export const {
  addCard,
  deleteCard,
  toggleLikeCard,
  setFilterMode,
  setCardToEdit,
  updateCard,
  setSearchQuery,
  // clearSearchQuery,
} = cardsSlice.actions;

export const selectVisibleCards = createSelector(
  [getCards, getFilterMode],
  (cards, mode) => {
    switch (mode) {
      case 'liked':
        return cards.filter((card: TCard) => card.isLiked);
      case 'custom':
        return cards.filter((card: TCard) => card.isCustom);
      default:
        return cards;
    }
  },
);

export default cardsSlice.reducer;
