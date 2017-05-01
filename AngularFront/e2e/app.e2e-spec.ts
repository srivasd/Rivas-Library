import { PruebecillaPage } from './app.po';

describe('pruebecilla App', () => {
  let page: PruebecillaPage;

  beforeEach(() => {
    page = new PruebecillaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
