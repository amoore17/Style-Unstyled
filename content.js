function main() {
  let styleFound = false;
  let all = document.getElementsByTagName('*');

  for (let i = 0; i < all.length; ++i) {
    if (all[i].hasAttribute('style')) {
      styleFound = true;
      console.log('Inline style found');
      break;
    } else if (all[i].tagName === 'STYLE') {
      styleFound = true;
      console.log('Style tag found');
      break;
    } else if (all[i].tagName === 'LINK') {
      if (all[i].rel === 'stylesheet') {
        styleFound = true;
        console.log('Stylesheet found');
        break;
      }
    }
  }

  if (styleFound === false) {
    console.log('No styling found');
    console.log('Inserting new styling');

    let body = document.getElementsByTagName('body')[0];
    body.style.maxWidth = '960px';
    body.style.marginLeft = 'auto';
    body.style.marginRight = 'auto';
  }
}

if (document.readyState !== 'loading')
  main();
else
  document.addEventListener('DOMContentLoaded', main);
