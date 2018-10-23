/* global define, it, describe, beforeEach, document */
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = require('../server/server');

app.listen(8888);

const url = 'http://localhost:8888';


describe('express', function () {
  this.timeout(60000);
  beforeEach(() => {
    nightmare = new Nightmare({ show: true, pollInterval: 1000 });
  });

  it('returns the correct status code for home route', () => axios.get(url)
    .then(response => expect(response.status === 200)));

  it('returns the correct status code for detail route', () => axios.get(`${url}/#/movie/tt0391229`)
    .then(response => expect(response.status === 200)));

  it('should have the correct page title on home page', () =>
    nightmare
      .goto(url)
      .evaluate(() => document.querySelector('h1').innerText)
      .end()
      .then((text) => expect(text).to.equal('Movie Search'))
  );

  it('should have the correct page title on details page', () =>
    nightmare
      .goto(`${url}/#/movie/tt0391229`)
      .wait('#heading')
      .evaluate(() => document.querySelector('h1').innerText)
      .end()
      .then((text) => expect(text).to.equal('Movie Details'))
  );

  it('should have search results with correct title', () =>
    nightmare
      .goto(url)
      .type('#search-bar', 'Cheese')
      .click('#search-button')
      .wait('h3')
      .evaluate(() => document.querySelector('h3').innerText)
      .end()
      .then(text => {
        expect(text).to.equal('I Want Someone to Eat Cheese With');
      })
  );

  it('should have search results with correct year', () =>
    nightmare
      .goto(url)
      .type('#search-bar', 'Cheese')
      .click('#search-button')
      .wait('h4')
      .evaluate(() => document.querySelector('h4').innerText)
      .end()
      .then(text => {
        expect(text).to.equal('2006');
      })
  );

  it('should have "more information" button', () => 
    nightmare
      .goto(url)
      .type('#search-bar', 'Cheese')
      .click('#search-button')
      .wait('.more-information')
      .evaluate(() => document.querySelector('.more-information').innerText)
      .end()
      .then(text => {
        expect(text).to.equal('More Information');
      })
  );

  it('more information button should route to details page', () =>
    nightmare
      .goto(url)
      .type('#search-bar', 'Cheese')
      .click('#search-button')
      .wait('.more-information')
      .click('.more-information')
      .wait(1000)
      .evaluate(() => document.getElementById('movie-title').innerText)
      .end()
      .then(text => {
        expect(text).to.equal('I Want Someone to Eat Cheese With');
      })
  );

  it('more information button should route to details page and have a plot', () =>
    nightmare
      .goto(url)
      .type('#search-bar', 'Cheese')
      .click('#search-button')
      .wait('.more-information')
      .click('.more-information')
      .wait(1000)
      .evaluate(() => document.getElementById('plot').innerText)
      .end()
      .then(text => {
        expect(text).to.equal('About a man who has trouble with his job, trouble with women, and uses food to deal with it all.');
      })
  );

  it('back to search button should go back to home page', () =>
    nightmare
      .goto(`${url}/#/movie/tt0391229`)
      .wait('#heading')
      .click('.back-to-search')
      .wait(1000)
      .evaluate(() => document.querySelector('h1').innerText)
      .end()
      .then(text => {
        expect(text).to.equal('Movie Search');
      })
  );
});
