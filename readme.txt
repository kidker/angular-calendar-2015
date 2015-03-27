������� ������ ����������:

1.�� ������� �������� index.html 

	- ����������  <html ng-app="calendarApp"> ng-app ���������� ������ calendarApp ��� ���� ����� ��������

	- ���������� ���������� Angular � ��� ��������� calendar.js �� �������

		1. <script src="components/calendar/js/libs/angular.min.js"></script>
	        2. <script src="components/calendar/js/calendar.js"></script>

	- <calendar></calendar> ��� ���, ����� ���������, ��� ����� ��������� ���� ����������

	��������� - ��� ���������� � ������ �����������, ��������� ������ � Angular. 
	��������� ��������� ���������� ����� HTML ���������, ���������� ��� ���������� ����������.
	
	- ������������� ������ ���������� calendarApp � ������������ simpleCalendar 

	<script>

	    var app = angular.module('calendarApp', ['simpleCalendar']);

	  </script>

2. � ������� calendar-template.html 
	
	- ������������� ���������� ��������� �� scope (scope.curYear)

	
	{{curYear}}

	- ����� ��������� � ������ ���������� ���������� scope, �������� � ��������� ������ ����������� �� �������� (�.�. ����� �����)

	- ����� ��������� ��������� �������� �������, ������ ��������� ���� month in months, �� ������� ������ months � month

	- $index ������������� �������� �����

	- ng-repeat ��� ���������� ����������� ��������� ��� ����������� �������

	- ng-click ������� ����, � �������� ����� (������� ��������� � scope)
	
	- ng-class ������ �������� �������, ����� �������� ����������� ������ ��� ��������

3. calendar.js ***************************************


1. 

��������� nhHtml, ������� ����� ��������� � scope � ��� �� ������ ����������� �� ��������

app.directive('ngHtml', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHtml, function(value) {
            element[0].innerHTML = value;
        });
    }
});

2.

��������� calendar ����������� ������ ������ ���������� 

��������� ����� �������������� ��� ������� � ��� �������. � ����� ������ �������� ���������� ���������� ��� 'EACM'. 
����� ������� ���������, ������� ����� �������������� ��� ������� 'E', ������� 'A', ����� 'C', ����������� 'M'.

�������, �.�. ���������� ������ ������� calendarLinkFunction,  

templateUrl ���������� ����� ������ ��� ������ �� ����� ������������

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

3. ������� � ������ ******************************************

1.
toggleClickDay, 
workCalculation,
calendarClear,
selectYear,
initYear

��� scope ������, ������� �� ����������� � calendarLinkFunction, � ���������� �� � ������� �� ������� ����

2.monthGenegrator

���������� ������ ������, �� ���������� weekGenegrator, ������� � ���� ������� ���������� ������

������ ������� ����� ����� ����� ����

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

������� ����������, ��� ��� ������� ��������� � ������� scope, � ��� ��������� �� ����������������� � �������




3. ������ ��� ����� �� ������ ���, �� �� ��������� ��� �� �� ������ �� �����, ���� ��� ����������� scope.month ������ ������ �� ���� ���������

scope.storageMonths['��� ����� ������������ ���'] (������, � ��� ������, ��� ������� ������� � storageMonth �������� ����� �������� � � scope.month)

���� �� ��� �� ��������� � scope.storageMonths['����� ���']['�����']['����� ������']['����� ��� � ������']

4. ��� �� ����� ��� ������� ********************************************

1. ��� API ������ �� �������� ����, ������� � $inject (factory, service)

*.������� ������� ���
����� �� �������� scope.curYear

*.������� ������ Date (��������� ����)
��� ��������� ��� � ������ weekend : true ����������� � ������ scope.notWordDaysArr, 
� ����� ��������� ��� ������� �� ���� ��������, ��� ���������� � �.�.


5. ��� ����� �������� ***************************************************

	1. �������� ���������� � ��, localstorage � �.�.(������������ ��������)

	2. ��������� ���������� ������ ���������� �� �����
	
	3. ����������� css, js (������ ����� Gulp)

	4. Responsive design ��� ��������� ���������

	5. ��������� ������ ��������� ��� �������� � ������ ���������� MVC � �.�. (� ������ �� ��� ����������, ��������� ��������� ���������) 

	
6. ����������� ����� ***************************************************

	8 ����� ������ ������������ + 8 ����� ���������� + 2 ���� ����������� ���������� = 18 �����

7. �������������� ������

http://habrahabr.ru/post/244925/
https://docs.angularjs.org/api/ng/directive
https://docs.angularjs.org/api/ng/filter
https://github.com/johnpapa/angular-styleguide#single-responsibility ***** https://github.com/johnpapa/angular-styleguide/blob/master/i18n/ru-RU.md
https://docs.angularjs.org/api/ng/service
http://habrahabr.ru/post/217515/
https://twitter.com/wardbell
https://github.com/johnpapa/ng-demos/tree/master/modular/src/client
http://www.tutorialspoint.com/angularjs/angularjs_html_dom.htm
http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
https://docs.angularjs.org/api/ng/service/$q
http://angular.ru/
http://jsfiddle.net/Lnm256qc/26/light/


