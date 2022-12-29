import { CONTACT_THE_AUTHOR_ENDPOINT } from '@env';
import axios from 'axios';

export const contactTheAuthorInstance = axios.create({
  baseURL: CONTACT_THE_AUTHOR_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});
