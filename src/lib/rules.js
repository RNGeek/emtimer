import { between } from 'vuelidate/lib/validators';
import { withParams } from 'vuelidate/lib/validators/common';

export const nonBigNumber = between(0, 10000000000);
export const integer = withParams(
  { type: 'integer' },
  value => /^[+-]?[0-9]+$/.test(value),
);
