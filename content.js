'use strict';

/*
 * Function:    main
 * Description: If there is no CSS on the page, apply a default styling
 * Parameters:  void
 * Returns:     void
 */
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

let scriptCheckCount = 0;
const maxScriptChecks = 10;

/*
 * Function:         scriptCheck
 * Description:      Checks if the last script on the page has finished loading. If it has not, this function polls
 *                   before timing out and calling main()
 * Parameters:       void
 * Global Variables: scriptCheckCount (int), maxScriptChecks (int)
 * Notes:            scriptCheckCount - The amount of times the script has been checked for loading
 *                   maxScriptChecks  - The maximum amount of times to check if the last script has been loaded
 * Returns:     void
 */
function scriptCheck() {
  let scripts = document.querySelectorAll('script');

  if (scripts.length > 0) {
    if (scripts[scripts.length - 1].readyState !== 'complete' && scriptCheckCount < maxScriptChecks) {
      ++scriptCheckCount;
      setTimeout(scriptCheck, 1000);
    } else if (scriptCheckCount >= maxScriptChecks) {
      console.log('One script failed to complete within timeout period. Testing for CSS now.');
      console.log(scripts[scripts.length - 1]);
      main();
    }
  } else {
    main();
  }
}

if (document.readyState !== 'loading') {
  scriptCheck();
} else {
  document.addEventListener('DOMContentLoaded', scriptCheck);
}
