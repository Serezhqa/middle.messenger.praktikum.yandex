const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM('<!DOCTYPE html><div class="app"></div>', {
  url: 'http://localhost:1234'
});
global.window = window;
global.document = window.document;
