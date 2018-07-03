var HOUR_IN_DAY = 24;
var MIN_IN_HOUR = 60;
var SEC_IN_MIN = 60;
var MS_IN_SEC = 1000;
var DAY_IN_MS = HOUR_IN_DAY * MIN_IN_HOUR * SEC_IN_MIN * MS_IN_SEC;

var eventsObject = events[0];

var createCalendarItemDom = function (data, month) {
	var template = $('#cal-slider__item')[0].content;
	var itemTemplate = $(template).clone();
	itemTemplate.find('.cal__container-body').html(data);
	itemTemplate.find('.cal-slider__item-title').html(month);
	var fragment = $(document.createDocumentFragment());
	fragment.append(itemTemplate);
	$(fragment).appendTo($('#cal-slider'));
}

var getCurrentDate = function () {
	var today = new Date();
	var todayInMs = today.getTime(); // current time in ms
	return todayInMs;
}
var todayInMs = getCurrentDate();

var checkDateIsPass = function (dateTime) {
	var dateForCheck = dateTime + DAY_IN_MS; // for correlation in 1 day
	if (dateForCheck < todayInMs) {
		return true;
	}
	return false;
}

var addDisabledClassForPassedDate = function (dateTime) {
	if (checkDateIsPass(dateTime) === true) {
		return "disabled";
	}
	return "";
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
            var hasEvent = false;
            if(dayEvents[prop].text !== '') {
                hasEvent = true;
            }
            var dateTime = new Date(year, month - 1, prop, 0, 0, 0, 0).getTime();
            html += 
            '<div class="cal__item ' + addDisabledClassForPassedDate(dateTime) +'" data-events=' + hasEvent +' data-date=' + year + '.' + month + '.' + prop +'>' +
                '<div class="cal__item-date">' +
                    prop + 
                '</div>' +
                '<div class="cal__item-text">' +
                    dayEvents[prop].text + 
                '</div>' +
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