// import type { TUser } from './types';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

// const urlRandomUserWithoutVPN =
//   'https://randomuser.me/api/?results=20&inc=name,picture,location';
// const urlPicsumWithVPN = 'https://picsum.photos/v2/list?page=1&limit=10';
const urlPexelsWithVPN =
  'https://api.pexels.com/v1/search?query=nature&per_page=15';

// async function fetch100PicsumCards() {
//   const cards = [];
//   for (let page = 1; page <= 5; page++) {
//     const response = await fetch(
//       `https://picsum.photos/v2/list?page=${page}&limit=20`
//     );
//     const data = await response.json();
//     cards.push(...data);
//   }
// Форматируем данные под карточки

// }

// export type TUserResponse = {
//   results: TUser[];
//   info: {
//     seed: string;
//     results: number;
//     page: number;
//     version: string;
//   };
// };

// export const getCardsApi = () =>
//   fetch(urlWithoutVPN)
//     .then((res) => checkResponse<TUserResponse>(res))
//     .then((data) => {
//       return data.results.map((card: TUser) => ({
//         id: crypto.randomUUID(),
//         imageUrl: card.picture.large,
//         title: `${card.name.first} ${card.name.last}`,
//         description: `Город: ${card.location.city}`,
//         isLiked: false,
//         isCustom: false,
//       }));
//     });

export type TCardItem = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type TPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

export type TPhotoResponse = {
  page: string;
  per_page: number;
  photos: TPhoto[];
  total_results: number;
  next_page: string;
};

// export const getCardsApi = () =>
//   fetch(urlRandomUserWithoutVPN)
//     .then((res) => checkResponse<TCardItem[]>(res))
//     .then((data) => {
//       return data.map((card: TCardItem) => ({
//         id: crypto.randomUUID(),
//         imageUrl: card.download_url,
//         title: `Фото от ${card.author}`,
//         description: `Размер: ${card.width}×${card.height}`,
//         isLiked: false,
//         isCustom: false,
//       }));
//     });

export const getCardsApi = () =>
  fetch(urlPexelsWithVPN)
    .then((res) => checkResponse<TPhotoResponse>(res))
    .then((data) => {
      return data.photos.map((card: TPhoto) => ({
        id: crypto.randomUUID(),
        imageUrl: card.src.medium,
        title: `Фото от ${card.photographer}`,
        description: `${card.alt}
        Размер: ${card.width}×${card.height} 
        Средняя светимость: ${card.avg_color}`,
        isLiked: false,
        isCustom: false,
      }));
    });
