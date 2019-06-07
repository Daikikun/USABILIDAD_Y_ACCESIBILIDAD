$(document).ready(() => {
    $('#activity-cont').attr('tabindex', '0');
    $('#title-page').attr('tabindex', '1');
    $('h1').attr('tabindex', '0');
    $('h2').attr('tabindex', '0');
    $('h3').attr('tabindex', '0');
    $('h4').attr('tabindex', '0');
    $('h5').attr('tabindex', '0');
   
    $('#activity-quote').attr('tabindex', '0');
    $('#desc').attr('tabindex', '0');
    $('.icon').attr('tabindex', '0');
    $('.circles').attr('tabindex', '0');
    $('.info-who').attr('tabindex', '0');
    $('.author').attr('tabindex', '0');
    
    $('#submit').attr('aria-label', 'Aceptar');
    
    $('.notification-header').attr('tabindex', '0');
    
    
    $(".dropdown-content").attr('aria-expanded', 'false');
    $(".dropdown-trigger").click(() => {
        if($(".dropdown-content").attr('aria-expanded') == 'false')
        {
            $(".dropdown-content").attr('aria-expanded', 'true');
        } else {
            $(".dropdown-content").attr('aria-expanded', 'false');
        }
        
    });
    
    $("#expand_navbar").click(() => {
        $('#nav2_expanded').css('height', '100%');
    });
    
    $("#close_navbar").click(() => {
        $('#nav2_expanded').css('height', '0%');
    });
    
    $('.nf').attr('tabindex', '-1');
    
    $(".input_login").on('keyup', function (e) {
        if (e.keyCode == 13) $('#login_success').click();
    });
    
    $("#login_input").on('keyup', function (e) {
        if (e.keyCode == 13) $('#login_success').click();
    });
    
});


