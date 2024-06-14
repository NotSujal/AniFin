
        fetch('https://api.jikan.moe/v4/top/anime?filter=airing')
            .then(response => response.json())
            .then(data => {
                const animeList = data.data;
                updateAiringSection(animeList);
            })
            .catch(error => console.error('Error fetching airing anime:', error));
    

    function updateAiringSection(animeList) {
        const carousel = document.querySelector('.airing-carousel');
        carousel.innerHTML = '';
        animeList.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.className = 'airing-item';
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

        addCarouselArrows('.airing-carousel');
    }

    function addCarouselArrows(selector) {
        const carousel = document.querySelector(selector);
        const leftArrow = document.querySelector('.airing-section .arrow.left');
        const rightArrow = document.querySelector('.airing-section .arrow.right');

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

        setTimeout(() => updateArrows(carousel, document.querySelector('.airing-section .arrow.left'), document.querySelector('.airing-section .arrow.right')), 500); // Ensure arrows update after scrolling
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

    document.addEventListener('scroll', () => updateArrows(document.querySelector('.airing-carousel'), document.querySelector('.airing-section .arrow.left'), document.querySelector('.airing-section .arrow.right')));
    window.addEventListener('resize', () => updateArrows(document.querySelector('.airing-carousel'), document.querySelector('.airing-section .arrow.left'), document.querySelector('.airing-section .arrow.right')));
    document.addEventListener('DOMContentLoaded', () => updateArrows(document.querySelector('.airing-carousel'), document.querySelector('.airing-section .arrow.left'), document.querySelector('.airing-section .arrow.right')));
