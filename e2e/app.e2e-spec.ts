import { Anuglar2TestPage } from './app.po';

describe('anuglar2-test App', () => {
  let page: Anuglar2TestPage;

  beforeEach(() => {
    page = new Anuglar2TestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
