$(document).ready(function() {
    $('h1, h2').each(function() {
        if ($(this).text()[0] == '《' ||
            $(this).text()[0] == '〈') {
            $(this).addClass('hang');
        };
    })
});
