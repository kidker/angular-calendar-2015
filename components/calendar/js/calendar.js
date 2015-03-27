"use strict";


var app = angular.module('simpleCalendar', []);

var language = {

    ms0: 'Январь',
    ms1: 'Февраль',
    ms2: 'Март',
    ms3: 'Апрель',
    ms4: 'Май',
    ms5: 'Июнь',
    ms6: 'Июль',
    ms7: 'Август',
    ms8: 'Сентябрь',
    ms9: 'Октябрь',
    ms10: 'Ноябрь',
    ms11: 'Декабрь',

    d0: 'ВС',
    d1: 'ПН',
    d2: 'ВТ',
    d3: 'СР',
    d4: 'ЧТ',
    d5: 'ПТ',
    d6: 'СБ',

    thisMonth: "This month",
    prevMonth: "Prev",
    nextMonth: "Next"

};

var weekNum = 0;

var localDayWeek = 0;

Date.prototype.getMonthFormatted = function() {
    var month = this.getMonth() + 1;
    return month < 10 ? '0' + month : month;
}


Date.prototype.getMonthNumber = function() {
    var month = this.getMonth() + 1;
    return parseInt(month);
}


app.directive('ngHtml', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHtml, function(value) {
            element[0].innerHTML = value;
        });
    }
});


var calendarLinkFunction = function (scope, element) {

    var contentObj = scope.content;        

    //Хранилище данных по годам
    scope.storageMonths = [];
    //Список SELECT
    scope.listYears = [
        {code: 2015, name: '2015'},
        {code: 2016, name: '2016'},
        {code: 2017, name: '2017'},
        {code: 2018, name: '2018'},
        {code: 2019, name: '2019'},
        {code: 2020, name: '2020'}

    ];
    scope.itemListYear =  scope.listYears[0];

    //scope.currentDate = new Date();
    //scope.daysCounter = 0;

    scope.today = new Date();
    scope.curYear = scope.today.getFullYear();

    scope.language = language;
    //scope.navigate = {};

    scope.toggleClickDay = function(obj){

        var self = scope.storageMonths[obj.year][obj.month-1][obj.localDayWeek-1][obj.day-1];

        if (!self.outmonth){
            scope.storageMonths[obj.year][obj.month-1][obj.localDayWeek-1][obj.day-1].status = !self.status;

            if (self.status){
            //Если статус был true (из нерабочих вычитаем, к рабочим добавляем)
                scope.storageMonths[obj.year]['daysWork'].notWorkDays -= 1;
                scope.storageMonths[obj.year]['daysWork'].workDays += 1;
            }else{
            //Если статус был false (из рабочих вычитаем, к нерабочим добавляем)
                scope.storageMonths[obj.year]['daysWork'].notWorkDays += 1;
                scope.storageMonths[obj.year]['daysWork'].workDays -= 1;
            }
        }

    };
    scope.workCalculation = function(a, b){
        alert("Из расчета 8 рабочих часов в день, тогда \nрабочих : "+a+", \nнерабочих : "+b+" !");
    };
    scope.calendarClear = function(obj, event){
        renderCalendar(scope.itemListYear.code);
    };
    scope.selectYear = function(obj, event){

    };
    scope.initYear = function(obj, event){

        refreshCalendar(scope.itemListYear.code);


    };

    scope.workDays = 0;
    scope.notWorkDays = -22;



    // month between 1 and 12
    var daysInMonth = function(month,year){
        return new Date(year, month, 0).getDate();
    }

    // month between 1 ~ 12
    var getDateContent = function(year,month,date){

        if(contentObj != null && contentObj[year] != null && 
            contentObj[year][month] != null && 
            contentObj[year][month][date] != null){
            return contentObj[year][month][date].join("<br/>");    
        }         
        return "";
    }

    // month between 1 ~ 12
    var monthGenegrator = function(month, year){
        //Обнуляем переменную для хранения дней недели 1~6
        localDayWeek = 1;

        var monthArray = [];
        var firstDay = new Date(year, month-1, 1, 0, 0, 0, 0);
        //  weekDay between 1 ~ 7 , 1 is Monday, 7 is Sunday
        var firstDayInFirstweek = (firstDay.getDay() > 0) ? firstDay.getDay() : 7; 
        var daysOfMonth = daysInMonth(month,year);
        //Считаем сумму всех дней
        scope.workDays+=daysOfMonth;

        var prevDaysOfMonth = daysInMonth(month-1,year);
        
        var recordDate = 0; //record which day obj already genegrate
        
        //first week row
        monthArray.push(weekGenegrator(year , month , recordDate-firstDayInFirstweek ,daysOfMonth , prevDaysOfMonth));

        recordDate = 7 - firstDayInFirstweek;
        //loop for following week row
        while(recordDate < daysOfMonth-1){
            monthArray.push(weekGenegrator(year , month , recordDate , daysOfMonth));
            recordDate += 7;
        }

        //set isToday
        if( (month-1) == scope.today.getMonth() &&
            year == scope.today.getFullYear() ){
            var atWeek = Math.ceil((scope.today.getDate()+firstDayInFirstweek-1) / 7) -1;
            var atDay = (scope.today.getDate()+firstDayInFirstweek-2) % 7;                
            monthArray[atWeek][atDay].isToday = true;
        }            

        return monthArray;
    }

    //month between 1~12
    var weekGenegrator = function(year , month , startDate , daysOfMonth , prevDaysOfMonth){
        var week = [];

        for(var i =  1 ; i <= 7 ; i++){
            var 
                realDate,
                outmonth = false,
                content = "";                 

            if(startDate + i < 0){
                realDate = prevDaysOfMonth+startDate+i+1;
                outmonth = true;                    
            }
            else if(startDate + i + 1 > daysOfMonth){
                realDate = startDate+i-daysOfMonth+1;
                outmonth = true;                    
            }
            else{
                realDate =  startDate+i+1;   
                content = getDateContent(year , month , realDate);                 
            }
            if (i == 6 || i == 7){scope.notWorkDays++;}//Считаем кол-во выходых
            week.push({
                "outmonth" : outmonth,                    
                "day": i,
                "content": content,           
                "date" : realDate,
                "status" : (i == 6 || i == 7),
                "year" : year,
                "month" : month,
                "weekNum" : weekNum,
                "localDayWeek" : localDayWeek,
                "weekend" : (i == 6 || i == 7)

            });
        }
        localDayWeek++;
        week.weekNum = weekNum++;


        return week;
    }

    var renderCalendar = function(year){

        var arr = [];

        scope.workDays = 0;
        scope.notWorkDays = -22;
        weekNum = 0;

        for(var i=1;i<13;i++){
            arr.push(monthGenegrator(i, year));
        }

        //Считаем остатки рабочих дней
        scope.workDays-=scope.notWorkDays;
        //Закидываем счетчики в хранящийся массив данных
        arr['daysWork'] = {
            'workDays' : scope.workDays,
            'notWorkDays' : scope.notWorkDays
        };
        //Помещаем в хранилище
        scope.storageMonths[year] = arr;
        //Изменяем оригинальную инстанцию на ссылку из хранилища
        scope.months = scope.storageMonths[year];


    }

    var refreshCalendar = function(year){

        if (scope.storageMonths[year] !== undefined){
            scope.months = scope.storageMonths[year];
        }else{
            renderCalendar(year);
        }
        scope.curYear = year;

    }

    refreshCalendar(scope.curYear);
}


app.directive("calendar", function(){
    return{
        restrict: "E",
        scope: { 
            content: '=calendarContent',
            assignedMonth: '=calendarMonth',
            assignedyear: '=calendarYear'
        },
        replace: true,
        link: calendarLinkFunction,
        templateUrl: 'components/calendar/view/calendar-template.html'
    }
});


