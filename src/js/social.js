var toggleSocialMenu = function() {
    $('.social').toggleClass('open');
    $("body").toggleClass('open');
}
$('.social').on('click', function() {
    toggleSocialMenu();
});
$('.overlay').on('click', function() {
    toggleSocialMenu();
});