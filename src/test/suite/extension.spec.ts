import * as vscode from 'vscode';
import { getFileSystemHandlerFixture } from '../utilities/fs-handler.fixture';
import { TEST_FILE_STRUCTURES, generateStructure } from '../utilities/prepare-testing-grounds';
import { SELECT_ENV_COMMAND_ID } from '../../utilities';

test(
  'Sample test',
  () => {
    const popup = asPromise(vscode.window.showInformationMessage('hello'));
    const timeOut = new Promise((resolve) => {
      setTimeout(resolve, 5 * 1000);
    });

    return Promise.race([popup, timeOut]).then(() => expect(1).toBe(1));
  },
  // this promise takes a while to resolve. documentation of
  // showInformationMessage says that it resolves when an item is selected...
  10 * 1000,
);

describe('VSCode Startup', () => {
  beforeAll(async () => {
    const testingGroundsPath = await generateStructure('basic');
    await vscode.commands.executeCommand(
      `workbench.action.files.openFolder`,
      vscode.Uri.file(testingGroundsPath),
    );
  });

  it('should startup', async () => {
    const extension = vscode.extensions.getExtension('EcksDy.env-switcher');
    const result = await vscode.commands.executeCommand(SELECT_ENV_COMMAND_ID);
    console.log(result);
    expect(result).toBeDefined();
    expect(1).toBe(2);
  });
  // describe.each(TEST_FILE_STRUCTURES)('"%s" file structure', (scenario) => {
  //   // let fsHandler: FileSystemHandler;
  //   let fsHandler: any;

  //   beforeAll(async () => {
  //     await generateStructure(scenario);
  //   });

  //   beforeEach(async () => {
  //     fsHandler = await getFileSystemHandlerFixture();
  //   });

  //   it('should find .env', async () => {
  //     const envFile = fsHandler.envFile;
  //     expect(envFile).toBeDefined();
  //   });
  // });
});

function asPromise<A>(t: Thenable<A>): Promise<A> {
  return new Promise((res, rej) => {
    return t.then(res, rej);
  });
}
