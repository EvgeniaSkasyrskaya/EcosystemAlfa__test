export type TCard = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  isLiked: boolean;
  isCustom?: boolean;
};

export type TUser = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};
