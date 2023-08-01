import { Uri, WorkspaceFolder } from 'vscode';
// import { FsPresetManager } from '../../managers/fs-preset-manager';
import path from 'path';

// const config;

export async function getFileSystemHandlerFixture() {
  const rootFolderUri = Uri.file(path.join(__dirname, '..', '..', '..', 'testing-grounds'));

  console.log(rootFolderUri.toString());

  const rootFolder: WorkspaceFolder = {
    uri: rootFolderUri,
    name: 'root',
    index: 0,
  };

  // const fsPresetManager = await FsPresetManager.build({});

  // return fsPresetManager;
}
