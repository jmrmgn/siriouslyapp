import * as yup from 'yup';

export const randomResponseSchema = yup.object().shape({
  message: yup.string().required().label('Random response')
});
