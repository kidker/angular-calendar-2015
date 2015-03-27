Принцип работы приложения:

1.На главной странице index.html 

	- Подключаем  <html ng-app="calendarApp"> ng-app активирует модуль calendarApp для этой части страницы

	- Подключаем библиотеку Angular и наш компонент calendar.js по порядку

		1. <script src="components/calendar/js/libs/angular.min.js"></script>
	        2. <script src="components/calendar/js/calendar.js"></script>

	- <calendar></calendar> это тег, некая директива, где будет протекать наше приложение

	Директивы - это уникальная и мощная особенность, доступная только в Angular. 
	Директивы позволяют изобретать новый HTML синтаксис, специально под конкретное приложение.
	
	- Инициализация нашего приложения calendarApp с зависимостью simpleCalendar 

	<script>

	    var app = angular.module('calendarApp', ['simpleCalendar']);

	  </script>

2. В шаблоне calendar-template.html 
	
	- Использование переменные доступных из scope (scope.curYear)

	
	{{curYear}}

	- Любое изменение в логике приложения переменных scope, приведет и изменения нашего отображения на странице (т.е. нашей вьюхи)

	- Когда требуется пробежать элементы массива, делаем следующую вещь month in months, он говорит кладем months в month

	- $index идентификатор итераций цикла

	- ng-repeat для повторного отображения элементов при прохождении массива

	- ng-click событие клик, в значении метод (который находится в scope)
	
	- ng-class внутри прописав условия, можно получить необходимые классы для элемента

3. calendar.js ***************************************


1. 

Директива nhHtml, слушаем любое изменение в scope и тут же меняем отображение на странице

app.directive('ngHtml', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHtml, function(value) {
            element[0].innerHTML = value;
        });
    }
});

2.

Директива calendar привязываем логику нашего приложения 

Директива может использоваться как элемент и как атрибут. В общем случае варианты применения кодируются как 'EACM'. 
Можно создать директиву, которая может использоваться как элемент 'E', атрибут 'A', класс 'C', комментарий 'M'.

Линкуем, т.е. привзываем логику объекта calendarLinkFunction,  

templateUrl показываем какой шаблон для вывода мы будем использовать

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

3. Подойдём к логике ******************************************

1.
toggleClickDay, 
workCalculation,
calendarClear,
selectYear,
initYear

Это scope методы, которые мы прописываем в calendarLinkFunction, а используем их в шаблоне на события клик

2.monthGenegrator

Генерируем массив месяца, он использует weekGenegrator, который в свою очередь генерирует недели

Каждый элемент будет иметь такие поля

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

Которые необходимы, нам для прямого обращение в объекте scope, а при изменении он перерендеривается в шаблоне




3. Каждый раз когда мы ЗАДАЕМ год, то мы проверяем был ли он создан до этого, если был подставляем scope.month прямую ссылка на наше хранилище

scope.storageMonths['уже ранее отрисованный год'] (ссылка, в том смысле, что измения значени в storageMonth значения будут меняться и в scope.month)

Если не был то добавляем в scope.storageMonths['новый год']['месяц']['номер недели']['номер дня в неделе']

4. Что не нашёл как сделать ********************************************

1. Для API доступ из внешнего кода, подошёл к $inject (factory, service)

*.Вернуть текущий год
взять из текущего scope.curYear

*.Вернуть массив Date (нерабочих дней)
При отрисовке дни с ключом weekend : true добававлять в массив scope.notWordDaysArr, 
а потом добавлять или удалять от туда элементы, или возвращать и т.д.


5. Что можно улучшить ***************************************************

	1. Хранения записывать в БД, localstorage и т.д.(относительно ситуации)

	2. Уменьшить визуальный размер календарей на месяц
	
	3. Оптимизация css, js (сборка через Gulp)

	4. Responsive design для мобильных устройств

	5. Структура файлов подгонять под ситуацию и модель приложения MVC и т.д. (я сделал на своё усмотрение, поскольку компонент небольшой) 

	
6. Потраченное время ***************************************************

	8 часов чтение документации + 8 часов разработка + 2 часа составление инструкции = 18 часов

7. Использованные ссылки

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


