import type { TUser } from './types';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const urlWithoutVPN =
  'https://randomuser.me/api/?results=20&inc=name,picture,location';
// const urlWithVPN = '';

export type TUserResponse = {
  results: TUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

export const getCardsApi = () =>
  fetch(urlWithoutVPN)
    .then((res) => checkResponse<TUserResponse>(res))
    .then((data) => {
      return data.results.map((card: TUser, index: number) => ({
        id: `card-${index}`,
        imageUrl: card.picture.large,
        title: `${card.name.first} ${card.name.last}`,
        description: `Город: ${card.location.city}`,
      }));
    });
