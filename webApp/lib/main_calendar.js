$(document).ready(function () {
        $('#external-events div.external-event').each(function () {
          var eventObject = {
            title: $.trim($(this).text())
          };
          $(this).data('eventObject', eventObject);
          $(this).draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0
          });
      
        });
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
      
        $('.calendar').fullCalendar({
          header: {
            right: 'month,agendaWeek,agendaDay prev,next',
            left: 'title'
          },
          editable: true,
          buttonText: {
            prev: '<i class="fa fa-chevron-left"></i>',
            next: '<i class="fa fa-chevron-right"></i>',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
          },
          droppable: true,
          drop: function (date, allDay) {
      
            var originalEventObject = $(this).data('eventObject');
      
            var copiedEventObject = $.extend({}, originalEventObject);
      
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
      
            $('.calendar').fullCalendar('renderEvent', copiedEventObject, true);
      
            if ($('#drop-remove').is(':checked')) {
              $(this).remove();
            }
      
          },
          events: [
          {
            title: 'All Day Event',
            start: new Date(y, m, 1),
            textColor: '#5db2ff',
            borderColor: '#5db2ff'
          },
          {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
            borderColor: '#a0d468'
          },
            {
              id: 999,
              title: 'Repeating Event',
              start: new Date(y, m, d - 3, 16, 0),
              allDay: false,
              borderColor: '#ffce55'
      
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: new Date(y, m, d + 4, 16, 0),
              allDay: false,
              borderColor: '#fb6e52'
            },
              {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                borderColor: '#e75b8d'
              }
          ,
          {
            title: 'Awesome Plan',
            start: new Date(y, m, d - 17, 2, 20),
            end: new Date(y, m, d - 14, 14, 0),
            allDay: false,
            borderColor: '#a0d468'
          },
            {
              title: 'Lunch',
              start: new Date(y, m, d, 12, 0),
              end: new Date(y, m, d, 14, 0),
              allDay: false,
              borderColor: '#2dc3e8'
            },
            {
              title: 'Birthday Party',
              start: new Date(y, m, d + 1, 19, 0),
              end: new Date(y, m, d + 1, 22, 30),
              allDay: false,
              borderColor: '#ed4e2a'
            },
              {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
              }
          ]
        });
      });
      $('.fc-button-content').each(function () {
      });
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.calendar').fullCalendar('render');
      })