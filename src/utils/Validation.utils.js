import { omit, keys } from 'lodash';
export default {
  getInvalidProps(_object) {
    return keys(omit(_object, value => !value));
  },
};
