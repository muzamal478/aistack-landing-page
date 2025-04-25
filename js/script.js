$(document).ready(function () {
    // Loader
    $(window).on('load', function () {
        $('#loader').fadeOut(1000);
    });

    // Smooth Scroll
    $('a.nav-link, .hero .btn').on('click', function (e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });

    // Lazy Loading
    function lazyLoad() {
        $('.lazy').each(function () {
            const img = $(this);
            if (img.offset().top < $(window).scrollTop() + $(window).height() + 100) {
                img.attr('src', img.data('src')).addClass('loaded');
            }
        });
    }
    $(window).on('scroll', lazyLoad);
    lazyLoad();

    // Parallax Effect
    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();
        $('.hero').css('background-position-y', -(scroll * 0.3) + 'px');
    });

    // Stats Counter
    $('.counter').each(function () {
        const $this = $(this);
        const countTo = $this.attr('data-target');
        $({ countNum: $this.text() }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
            }
        });
    });

    // Review Slider
    const reviews = $('#review-slider .col-md-4');
    let current = 0;
    function showReview(index) {
        reviews.hide();
        reviews.eq(index).fadeIn();
        if (index + 1 < reviews.length) {
            reviews.eq(index + 1).fadeIn();
        }
        if (index + 2 < reviews.length) {
            reviews.eq(index + 2).fadeIn();
        }
    }
    showReview(current);
    setInterval(() => {
        current = (current + 3) % reviews.length;
        showReview(current);
    }, 5000);

    // Form Validation
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();
        if (name && email && message) {
            $(this).find('.btn-primary').text('Sending...').prop('disabled', true);
            setTimeout(() => {
                alert('Message sent successfully!');
                this.reset();
                $(this).find('.btn-primary').text('Send Message').prop('disabled', false);
            }, 1000);
        } else {
            alert('Please fill all fields.');
        }
    });

    // Pricing Card Hover
    $('.pricing-card').on('mouseenter', function () {
        $(this).animate({ marginTop: '-10px' }, 200);
    }).on('mouseleave', function () {
        $(this).animate({ marginTop: '0' }, 200);
    });
});