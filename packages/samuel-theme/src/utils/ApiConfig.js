import {baseUrl} from './Constants';

export const apiConfig = route => {
  return baseUrl + '/samuel/v1/' + route;
};

export const jwtConfig = route => {
  return baseUrl + '/jwt-auth/v1/' + route;
};
