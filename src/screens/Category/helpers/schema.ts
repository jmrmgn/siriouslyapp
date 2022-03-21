import * as yup from 'yup';

const validateName = (
  categoryNames: string[],
  value: string | undefined
): boolean => {
  if (!value) return true;
  if (categoryNames.includes(value.toLowerCase())) return false;
  return true;
};

const validateKeywords = (
  keywords: string[],
  values: string[] | undefined,
  {
    createError
  }: {
    createError: (params?: yup.CreateErrorOptions) => yup.ValidationError;
  }
) => {
  if (!values) return true;
  const matchedKey: string[] = [];

  values.map(value => {
    if (keywords.includes(value)) {
      matchedKey.push(value);
    }
  });

  if (matchedKey.length > 0)
    return createError({
      message: `(${matchedKey.join(', ')}) keyword(s) already exists.`
    });
  return true;
};

export { validateName, validateKeywords };
