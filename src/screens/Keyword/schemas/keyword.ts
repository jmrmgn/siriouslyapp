import * as yup from 'yup';

export const keywordSchema = () => {
  return yup.object().shape({
    name: yup.string().required().label('Name'),
    response: yup.string().required().label('Response') // Min & Max of 1 for now since it only supports 1 response
  });
};
