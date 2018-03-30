import { ChartsPage } from './app.po';

describe('charts App', () => {
  let page: ChartsPage;

  beforeEach(() => {
    page = new ChartsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
