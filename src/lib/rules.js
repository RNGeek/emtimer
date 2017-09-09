import { between } from 'vuelidate/lib/validators';
import { withParams } from 'vuelidate/lib/validators/common';

// 0から10000000000の数値であることを保証するバリデーションルール
export const nonBigNumber = between(0, 10000000000);

// 整数であることを保証するバリデーションルール
export const integer = withParams(
  { type: 'integer' },
  value => /^[+-]?[0-9]+$/.test(value),
);
