import * as configs from './configs';
import merge from 'lodash/merge';

export default [
  merge(
    configs.base({
      babel: {
        targets: { node: true },
      },
    }),
    configs.server(),
  ),
  merge(
    configs.base({
      babel: {
        targets: { browsers: "last 2 versions" },
      },
    }),
    configs.client(),
  ),
];
