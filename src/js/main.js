import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

console.log('main.js loaded');
function hideNewsletter(event) {
  console.log('hideNewsletter')
  event.preventDefault();
  const newsletter = document.getElementById('newsletter');
  newsletter.style.scale = 0;
  setTimeout(() => {
    newsletter.style.display = 'none';
    const newsLetterResponse = document.getElementById('newsletter-response');
    newsLetterResponse.style.display = 'block';
    setTimeout(() => {
      
    newsLetterResponse.style.scale = 1;
    },50);
    setTimeout(() => {
      newsLetterResponse.style.scale = 0;
    }, 1000);
    setTimeout(() => {
      newsLetterResponse.style.display = 'none';
    }, 1500);
  }, 500);
}

const newsletterForm = document.getElementById('newsletter-form');
console.log(newsletterForm);
newsletterForm.addEventListener('submit', hideNewsletter);
