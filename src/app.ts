import { ResponseError } from 'umi-request';
export const request = {
  prefix: '/api',
  errorHandler: (error: ResponseError) => {
    console.log(error);
  },
};
