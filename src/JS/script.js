document.addEventListener('DOMContentLoaded', function () {
  loadComponent('navbar-container', 'src/components/navbar.html', initializeNavbar);
  loadComponent('header-container', 'src/components/header.html', initializeHeader);
  loadComponent('popular-container', 'src/components/popular.html', initializePopular);
  loadComponent('airing-container', 'src/components/airing.html', initializeAiring);
  loadComponent('discover-container', 'src/components/discover.html', initializeDiscover); // Added for discover section
  loadComponent('footer-container', 'src/components/footer.html', initializeFooter); // Added for footer section
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
              callback(); // Invoke the callback function if provided
          }
      })
      .catch(error => console.error(`Error loading ${containerId}:`, error));
}

function initializeNavbar() {
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  searchButton.addEventListener('click', function () {
      searchInput.focus();
  });
}

function initializeHeader() {
  // Add functionality specific to the header if needed
}

function initializePopular() {

}

function initializeAiring() {

}

function initializeDiscover() {
  // Add functionality specific to the discover section if needed
}

function initializeFooter() {
  // Add functionality specific to the footer if needed
}
