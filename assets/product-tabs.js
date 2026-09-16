document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabs
  const tabNav = document.querySelectorAll('.tabs_button_wrapper li');
  const tabContents = document.querySelectorAll('.tab_data_content');
  
  tabNav.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabNav.forEach(function(t) {
        t.classList.remove('active');
      });
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab contents
      tabContents.forEach(function(content) {
        content.style.display = 'none';
      });
      
      // Show selected tab content
      const selectedContent = document.getElementById(tabId);
      if (selectedContent) {
        selectedContent.style.display = 'flex';
      }
      
      // Reinitialize swiper for the newly visible tab
      initSwiperForTab(selectedContent);
    });
  });
  
  // Initialize swiper for each tab
  tabContents.forEach(function(content) {
    initSwiperForTab(content);
  });
  
  function initSwiperForTab(container) {
    if (!container) return;
    
    const swiperWrapper = container.querySelector('.tab_slider_wrapper');
    if (!swiperWrapper) return;
    
    // Destroy existing swiper if any
    if (swiperWrapper.swiper) {
      swiperWrapper.swiper.destroy(true, true);
    }
    
    // Initialize new swiper
    new Swiper(swiperWrapper, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
      },
    });
  }
  
  // Quick Add functionality
  document.querySelectorAll('.quick-add__button').forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const form = this.closest('form');
      if (!form) return;
      
      const formData = new FormData(form);
      const buttonEl = this;
      
      buttonEl.classList.add('is-added');
      
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setTimeout(function() {
          buttonEl.classList.remove('is-added');
        }, 2000);
        
        // Update cart count if needed
        document.dispatchEvent(new CustomEvent('cart:updated', { detail: data }));
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        buttonEl.classList.remove('is-added');
      });
    });
  });
});