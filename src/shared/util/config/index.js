export default function createConfig() {
  const validators = new Map();
  const values = new Map();

  const conf = {
    validateAtRuntime: false,
    set: (key, value, validator) => {
      values.set(key, value);
      if (validator) validators.set(key, validator);
      conf.validate(key);
    },
    get: (key) => {
      if (conf.validateAtRuntime) conf.validate(key);
      return values.get(key);
    },
    validate: (key) => {
      if (!validators.has(key)) return;
      const error = validators.get(key)(values.get(key));
      if (typeof error === 'string') conf.log(key, error);
      if (typeof error === 'boolean' && !error) conf.log(key);
    },
    logger: console.log, // eslint-disable-line no-console
    log: (key, message) => conf.logger(`config error at '${key}'${(message ? `: ${message}` : '')}`),
  };

  return conf;
}
