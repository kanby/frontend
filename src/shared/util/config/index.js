/* @flow */

export default function createConfig(validateAtRuntime: boolean = false) {
  const validators = new Map();
  const values = new Map();

  const conf = {
    validateAtRuntime,
    set: (key: string, value: any, validator: Function): void => {
      values.set(key, value);
      if (validator) validators.set(key, validator);
      conf.validate(key);
    },
    get: (key: string): any => {
      if (conf.validateAtRuntime) conf.validate(key);
      return values.get(key);
    },
    validate: (key: string): void => {
      if (!validators.has(key)) return;
      const val = values.get(key);
      // Flow cannot tell that validators.get(key) returns a function so it will always warn here.
      // $FlowIgnore
      const error = validators.get(key)(val);
      if (typeof error === 'string') conf.log(key, error.replace('[val]', val));
      if (typeof error === 'boolean' && !error) conf.log(key);
    },
    logger: console.log,
    log: (key: string, message: string | void): void => {
      if (message) {
        conf.logger(`config error at '${key}': ${message}`);
      } else {
        conf.logger(`config error at '${key}'`);
      }
    },
  };

  return conf;
}
