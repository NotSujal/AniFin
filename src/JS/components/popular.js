
        fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity')
            .then(response => response.json())
            .then(data => {
                const animeList = data.data;
                updatePopularSection(animeList);
            })
            .catch(error => console.error('Error fetching popular anime:', error));
    

    function updatePopularSection(animeList) {
        const carousel = document.querySelector('.popular-carousel');
        carousel.innerHTML = '';
        animeList.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.className = 'popular-item';
            animeItem.innerHTML = `
                <a href="/anime/${anime.mal_id}">
                    <div class="thumbnail">
                        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title_english || anime.title}">
                        <div class="hover-box"></div>
                        <div class="name">${anime.title_english || anime.title}</div>
                    </div>
                </a>
            `;
            carousel.appendChild(animeItem);
        });

        addCarouselArrows('.popular-carousel'); // Adjusted to target the correct element
    }

    function addCarouselArrows(selector) {
        const carousel = document.querySelector(selector);
        const leftArrow = document.querySelector('.popular-section .arrow.left');
        const rightArrow = document.querySelector('.popular-section .arrow.right');

        if (carousel && leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => scrollCarousel(carousel, 'left'));
            rightArrow.addEventListener('click', () => scrollCarousel(carousel, 'right'));
            updateArrows(carousel, leftArrow, rightArrow);
        }
    }

    function scrollCarousel(carousel, direction) {
        const scrollAmount = carousel.clientWidth;

        if (direction === 'left') {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (direction === 'right') {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }

        setTimeout(() => updateArrows(carousel, document.querySelector('.popular-section .arrow.left'), document.querySelector('.popular-section .arrow.right')), 500); // Ensure arrows update after scrolling
    }

    function updateArrows(carousel, leftArrow, rightArrow) {
        if (carousel.scrollLeft === 0) {
            leftArrow.disabled = true;
        } else {
            leftArrow.disabled = false;
        }

        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
            rightArrow.disabled = true;
        } else {
            rightArrow.disabled = false;
        }
    }

    document.addEventListener('scroll', () => updateArrows(document.querySelector('.popular-carousel'), document.querySelector('.popular-section .arrow.left'), document.querySelector('.popular-section .arrow.right')));
    window.addEventListener('resize', () => updateArrows(document.querySelector('.popular-carousel'), document.querySelector('.popular-section .arrow.left'), document.querySelector('.popular-section .arrow.right')));
    document.addEventListener('DOMContentLoaded', () => updateArrows(document.querySelector('.popular-carousel'), document.querySelector('.popular-section .arrow.left'), document.querySelector('.popular-section .arrow.right')));

