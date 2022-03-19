import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  keywords: yup
    .array()
    .required()
    .min(1, 'Minimum of 1 keyword')
    .max(10, 'Maximum of 10 keywords')
    .label('Keywords'),
  responses: yup.string().required().label('Response') // Min & Max of 1 for now since it only supports 1 response
});
