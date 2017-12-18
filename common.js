// Define global variables
var profileLink;
var accountLink;
var signInLink;
var currentPath = window.location.href.split('/').slice(-2)[0];

// Determine API endpoint, domain and root URL based on window location
if (window.location.hostname == 'crystalprism.io') {
  var api = 'https://13.58.175.191/api';
  var domain = 'crystalprism.io';
  var root = 'https://' + domain;
} else {
  var api = 'http://localhost:5000/api';
  var domain = 'estherh5.github.io';
  var root = window.location.href
    .split('estherh5.github.io')[0] + domain;
}


// Create page header
function createPageHeader() {
  // Create header to contain homepage link and account menu
  var header = document.createElement('div');
  header.id = 'header';

  // Create link to homepage that has diamond icon
  var homepageLink = document.createElement('a');
  homepageLink.href = root + '/index.html';
  homepageLink.id = 'homepage-link';
  var homepageIcon = document.createElement('img');
  homepageIcon.id = 'homepage-icon';
  homepageIcon.src = root + '/images/homepage.png';

  /* Create account menu with links to profile, create account page, and sign
  in page */
  var accountMenu = document.createElement('div');
  accountMenu.id = 'account-menu';
  profileLink = document.createElement('a');
  profileLink.id = 'profile-link';
  accountLink = document.createElement('a');
  accountLink.id = 'account-link';
  accountLink.href = root + '/user/create-account/index.html';
  signInLink = document.createElement('a');
  signInLink.id = 'sign-in-link';
  signInLink.href = root + '/user/sign-in/index.html';
  header.appendChild(homepageLink);
  homepageLink.appendChild(homepageIcon);
  header.appendChild(accountMenu);
  accountMenu.appendChild(profileLink);
  accountMenu.appendChild(accountLink);
  accountMenu.appendChild(signInLink);

  // Insert header before first element in body
  document.body.insertAdjacentElement('afterbegin', header);

  return;
}


// Create page footer
function createPageFooter() {
  // Create copyright display
  var copyright = document.createElement('div');
  copyright.innerHTML = '&copy; 2017 Crystal Prism';

  // Create contact information display
  var contact = document.createElement('div');
  contact.innerHTML = 'Find any bugs? Email <a href="administrator@crystalprism.io">administrator@crystalprism.io</a> with details.';

  // Create footer to contain copyright and contact information
  var footer = document.createElement('div');
  footer.id = 'footer';
  footer.appendChild(copyright);
  footer.appendChild(contact);

  // Insert footer at end of body element
  document.body.insertAdjacentElement('beforeend', footer);

  return;
}


// Check if user is logged in
function checkIfLoggedIn() {
  // If user does not have a token stored locally, set account menu to default
  if (localStorage.getItem('token') == null) {
    accountLink.innerHTML = 'Create Account';
    signInLink.innerHTML = 'Sign In';

    /* Store current window for user to return to after logging in, if current
    window is not homepage, Create Account, or Sign In pages */
    if (currentPath != domain && currentPath != 'create-account'
      && currentPath != 'sign-in') {
        signInLink.onclick = function() {
          sessionStorage.setItem('previous-window', window.location.href);
          return;
        }
      }

    return;
  }

  /* Otherwise, check if the user is logged in by sending their token to the
  server */
  return fetch(api + '/user/verify', {
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    method: 'GET',
  })

  // Set account menu to default if server is down
    .catch(function(error) {
      accountLink.innerHTML = 'Create Account';
      signInLink.innerHTML = 'Sign In';
      /* Store current window for user to return to after logging in, if
      current window is not homepage, Create Account, or Sign In pages */
      if (currentPath != domain && currentPath != 'create-account'
        && currentPath != 'sign-in') {
          signInLink.onclick = function() {
            sessionStorage.setItem('previous-window', window.location.href);
            return;
          }
        }
      return false;
    })

    .then(function(response) {
      /* If server verifies token is correct, display link to profile, My
      Account page, and Sign In page (with "Sign Out" title) */
      if (response.ok) {
        profileLink.innerHTML = localStorage.getItem('username');
        profileLink.href = root + '/user/index.html?username=' + localStorage
          .getItem('username');
        accountLink.innerHTML = 'My Account';
        accountLink.href = root + '/user/my-account/index.html';
        signInLink.innerHTML = 'Sign Out';

        /* Send request to log user out when Sign In page link ("Sign Out"
        title) is clicked */
        signInLink.onclick = function() {
          sessionStorage.setItem('account-request', 'logout');
          return;
        }

        return true;
      }

      /* Otherwise, set account menu to default and remove username and token
      from localStorage */
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      accountLink.innerHTML = 'Create Account';
      signInLink.innerHTML = 'Sign In';

      /* Store current window for user to return to after logging in, if
      current window is not homepage, Create Account, or Sign In pages */
      if (currentPath != domain && currentPath != 'create-account'
        && currentPath != 'sign-in') {
          signInLink.onclick = function() {
            sessionStorage.setItem('previous-window', window.location.href);
            return;
          }
        }
      }

      return false;
    });
}
