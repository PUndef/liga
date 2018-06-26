var createCalendarItemDom = function(data, month) {
    var template = $('#cal-slider__item')[0].content;
    var itemTemplate = $(template).clone();
    itemTemplate.find('.cal__container-body').html(data);
    itemTemplate.find('.cal-slider__item-title').html(month);
    var fragment = $(document.createDocumentFragment());
    fragment.append(itemTemplate);
    // $('#cal-slider').after(fragment);
    $(fragment).appendTo($('#cal-slider'));
}


var createCalendarItem = function(year) {
    var yearEvents = window.eventsObject.year[year];
    var monthEvents = yearEvents.month;
    for (var prop in monthEvents) {
        var html = '';
        var monthName = monthEvents[prop].name;
        var month = prop;
        var countEmptyElement = monthEvents[prop].firstDay;
        for(var i = 1; i < countEmptyElement; i++) {
            html += '<div class="cal__item inactive"></div>';
        }
        var dayEvents = monthEvents[prop].events;
        for (var prop in dayEvents) {
            html += '<div class="cal__item" data-date=' + year + '.' + month + '.' + prop +'>' +
                '<div class="hover"><span></span><span></span><span></span><span></span><span></span></div>' +
                '<span>' +
                    '<div class="cal__item-date">' +
                        prop + 
                    '</div>' +
                    '<div class="cal__item-date">' +
                        dayEvents[prop].text + 
                    '</div>' +
                '</span>' +
            '</div>';
        }
        createCalendarItemDom(html, monthName);
    }
}

createCalendarItem(2018);

$('.cal__item').on('click', function() {
    var date = $(this).data('date');
    if(date) {
        var dateArrs = date.split('.');
        var dayEvent = eventsObject.year[dateArrs[0]].month[dateArrs[1]].events[dateArrs[2]];
        if(dayEvent.description) {
            $('#modalEventInfo .modal-body').html(dayEvent.description);
            $('#modalEventInfo').modal({
                fadeDuration: 500,
                fadeDelay: 0.75
            });
        }
    }
})

$('#cal-slider').slick({
    dots: false,
    infinite: false,
    speed: 500
});
