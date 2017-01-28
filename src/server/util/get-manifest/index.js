import config from 'server/config';
import { readFile } from 'mz/fs';

let cachedManifest;

const getRawManifest = () => {
  if (!cachedManifest) {
    return readFile(config.get('assets/manifest'), 'utf8');
  }

  return null;
};

const parse = (rawManifest) => {
  if (cachedManifest) {
    return cachedManifest;
  }

  cachedManifest = JSON.parse(rawManifest);
  return cachedManifest;
};

const getManifest = async () => {
  const raw = await getRawManifest();
  return parse(raw);
};

export default getManifest;
