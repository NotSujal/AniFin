document.addEventListener('DOMContentLoaded', function () {
  loadComponent('navbar-container', '/src/components/navbar.html', initializeNavbar);
  loadComponent('header-container', '/src/components/header.html', initializeHeader);
  loadComponent('popular-container', '/src/components/popular.html', initializePopular);
  loadComponent('airing-container', '/src/components/airing.html', initializeAiring);
  loadComponent('discover-container', '/src/components/discover.html', initializeDiscover);
  loadComponent('footer-container', '/src/components/footer.html', initializeFooter);
});

function loadComponent(containerId, url, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      console.error(`Error loading ${containerId}:`, error);
      document.getElementById(containerId).innerHTML = `<p>Error loading component: ${url}</p>`;
    });
}

function initializeNavbar() {
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', function () {
      searchInput.focus();
    });
  }
}

function initializeHeader() {
}

function initializePopular() {
}

function initializeAiring() {
}

function initializeDiscover() {
}

function initializeFooter() {
}
