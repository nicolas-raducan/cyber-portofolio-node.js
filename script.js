const magneticBtn = document.querySelector('#scroll-to-contact');

if(magneticBtn) {
    magneticBtn.addEventListener('mousemove', function(e) {
        const position = magneticBtn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    magneticBtn.addEventListener('mouseout', function() {
        magneticBtn.style.transform = 'translate(0px, 0px)';
    });
}

// JQUERY: Interactivity and Smooth Scrolling
$(document).ready(function() {
    
    // Smooth Scroll to Contact Section
    $('#scroll-to-contact').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#contact').offset().top 
        }, 800); 
    });

    // Project Details Toggle 
    $('.details-btn').on('click', function() {
        let detailsDiv = $(this).next('.project-details');
        
        detailsDiv.slideToggle(400, function() {
            if (detailsDiv.is(':visible')) {
                $(this).prev('.details-btn').text('Hide Details');
            } else {
                $(this).prev('.details-btn').text('View Details');
            }
        });
    });

    // Interactive Project Slider
    let currentSlide = 0;
    const $track = $('.carousel-track');
    const totalSlides = $('.cyber-card').length;

    $('#next-project').on('click', function() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0; 
        }
        $track.css('transform', `translateX(-${currentSlide * 100}%)`);
    });

    $('#prev-project').on('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1; 
        }
        $track.css('transform', `translateX(-${currentSlide * 100}%)`);
    });

    // Dynamic Footer Note
    $('<footer>').append('<p id="dynamic-note" style="display:none; color: var(--accent-color); text-align: center;">System Secured // Powered by JS & jQuery</p>');
    $('#dynamic-note').fadeIn(2000);
});