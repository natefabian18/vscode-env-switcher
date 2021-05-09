import * as nodePath from 'path';
import fsHelper from '../../../utilities/fsHelper';
import { Preset } from '../../../interfaces';

const ENV_EXTENSION = '.env';

function capitalize(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export async function makePreset(rootDir: string, path: string): Promise<Preset> {
  const content = await fsHelper.readFile(path);
  return {
    id: nodePath.basename(path),
    title: capitalize(nodePath.basename(path, ENV_EXTENSION)),
    description: nodePath.relative(rootDir, path),
    path,
    content,
  };
}

export async function makePresets(rootDir: string, paths: string[]): Promise<Preset[]> {
  const presets = await Promise.all(
    paths.map((path): Promise<Preset> => makePreset(rootDir, path)),
  );
  presets.sort((a, b) => (a.title < b.title ? -1 : 1));
  return presets;
}