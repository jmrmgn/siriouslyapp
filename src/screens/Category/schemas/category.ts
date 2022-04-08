import * as yup from 'yup';

import { validateKeywords, validateName } from '../helpers/schema';

export const categorySchema = () => {
  return yup.object().shape({
    name: yup.string().required().label('Name')
    // .test(
    //   'unique-name-validation',
    //   'Name already exists',
    //   (value: string | undefined) => validateName(categoryNames ?? [], value)
    // ),
    // keywords: yup
    //   .array()
    //   .required()
    //   .min(1, 'Minimum of 1 keyword')
    //   .max(10, 'Maximum of 10 keywords')
    //   .label('Keywords')
    //   .test(
    //     'unique-keyword-validation',
    //     (values: string[] | undefined, options) =>
    //       validateKeywords(keywords ?? [], values, options)
    //   ),
    // responses: yup.string().required().label('Response') // Min & Max of 1 for now since it only supports 1 response
  });
};
