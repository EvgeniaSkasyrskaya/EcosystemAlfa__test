// import type { TUser } from './types';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const urlPexelsWithVPN =
  'https://api.pexels.com/v1/search?query=nature&per_page=15';

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

//  Функции для запроса с другого ресурса (но тоже с ВПН)

// const urlRandomUserWithoutVPN =
//   'https://randomuser.me/api/?results=20&inc=name,picture,location';

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
//   fetch(urlRandomUserWithoutVPN)
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
