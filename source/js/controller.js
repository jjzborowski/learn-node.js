var myApp = angular.module('myApp');

myApp.controller('MainController', ['$scope', '$http', '$location', '$routeParams', '$timeout', ($scope, $http, $location, $routeParams, $timeout)=>{
    $http.get('/api/artist')
        .success((response)=>{
        $scope.artists = response;        
        //            let select_color = new Scrollbar(document.querySelector('#select-color .cwc-select-dropdown'));
        //            select_color.init();
    });
    $http.get('/api/color')
        .success((response)=>{
        $scope.colors = response;
        //        $timeout(function () {
        //            let select_color = new Scrollbar(document.querySelector('#select-color .cwc-select-dropdown'));
        //            select_color.init();
        //        });
    });
    $http.get('/api/expansion')
        .success((response)=>{
        $scope.expansions = response;
    });
    $http.get('/api/rarity')
        .success((response)=>{
        $scope.rarities = response;
    });
    $http.get('/api/subtype')
        .success((response)=>{
        $scope.subtypes = response;
        //        $timeout(function () {
        //            let select_subtype = new Scrollbar(document.querySelector('#select-subtype .cwc-select-dropdown'));
        //            select_subtype.init();
        //        });
    });
    $http.get('/api/type')
        .success((response)=>{
        $scope.types = response;
        $timeout(() => {
            $scope.select_type = new Scrollbar(document.querySelector('#select-type'));
            $scope.select_type.init();
        });
    });

        console.log($scope.type);
    $scope.refresh = (length) => {
        console.log($scope.type);
        $timeout((length) => {
            $scope.select_type.refresh(length);
        });
    }
    
    $scope.console = console;
}]);





class Position{
    constructor(current = 0, min = 0, max = 0){
        this.min = min;
        this.max = max;
        this.current = current;
        this.scroll_ratio = max;
    }

    setCurrent(current){
        if(current < this.min){
            this.current = this.min;
        } else if(current > this.max){
            this.current = this.max;
        } else {
            this.current = current;
        }
    }
}

class Component{
    constructor(element){
        this.elem = element;
        this.params = this.elem.getBoundingClientRect();
        this.styles = this.elem.currentStyle || window.getComputedStyle(this.elem);
        this.position = new Position();
    }

    /*
    set(axis, current, min, max, is_content) - set basic attributes of component
    axis - defines the axis of motion
    current - defines current position of the element on indicated axis
    min - defines minumum position of the element on indicated axis
    max - defines maximum position of the element on indicated axis
    is_content - defines if element is a content (content moves in opposite direction)
    */
    set(current, min, max, scroll_ratio){
        this.position.current = current;
        this.position.min = min;
        this.position.max = max;
        this.position.scroll_ratio = scroll_ratio;
        this.move();
    }

    /*
    scrollMove(axis, delta) - change position of element on scroll event
    axis - defines the axis of motion
    delta - defines multiplier of motion
    */
    scrollMove(delta){
        this.position.setCurrent(this.position.current + delta * this.position.scroll_ratio);
        this.move();
    }

    /*
    mouseMove(axis, delta) - change position of element on mouse move event
    axis - defines the axis of motion
    delta - defines multiplier of motion
    */
    mouseMove(delta){
        this.position.setCurrent(delta);
        this.move();
    }

    /*
    move() - animate element on the view
    */
    move(){
        this.elem.style.transform = 'translate3d(0, ' + this.position.current +'px, 0)';
    }
}

class Scrollbar extends Component{
    constructor(element){
        super(element);
        this.mouse_hold = false;
    }

    init(){
        this.set();
        this.events();
    }

    set(options_length){
        this.label = new Component(this.elem.querySelector('.cwc-select-label'));
        this.dropdown = new Component(this.elem.querySelector('.cwc-select-dropdown'));
        this.dropdown.content = new Component(this.dropdown.elem.querySelector('.cwc-select-content'));
        this.dropdown.track = new Component(this.dropdown.elem.querySelector('.cwc-select-track'));
        this.dropdown.track.thumb = new Component(this.dropdown.track.elem.querySelector('.cwc-select-thumb'));
        
        let options = this.dropdown.content.elem.querySelectorAll('.cwc-select-option'),
            hidden_options = ((options_length === undefined) ? options.length : options_length) - 5;
        
        this.dropdown.content.set(
            0,
            this.dropdown.elem.clientHeight - this.dropdown.content.elem.offsetHeight,
            0,
            options[0].offsetHeight
        );
        this.dropdown.track.thumb.set(
            0,
            0,
            this.dropdown.track.elem.offsetHeight - this.dropdown.track.thumb.elem.offsetHeight,
            (this.dropdown.track.elem.offsetHeight - this.dropdown.track.thumb.elem.offsetHeight)/hidden_options
        );
    }
    
    refresh(options_length){
        this.set(options_length);
    }

    /*
    events(axis) - bind events to the elements
    axis - defines the axis of motion
    */
    events(){
        /*
        When mouse is over the content and user use mouse scroll. Basically content moves vertically. Holding CTRL button content moves horizontally.
        */
        this.dropdown.content.elem.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.mouseScroll(event);
        });
        /*
        When mouse is over certain track and user use mouse scroll.
        */
        this.dropdown.track.elem.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.mouseScroll(event);
        });
        /*
        When thumb of certain track is held.
        */
        this.dropdown.track.thumb.elem.addEventListener('mousedown', (event) => {
            event.preventDefault();
            window.addEventListener('mousemove', this.mouseMove(event));
        });
        /*
        When track is clicked.
        */
        this.dropdown.track.elem.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.mouseMove(event);
        });
        /*
        When mouse is moved. Work only if thumb of certain track is held.
        */
        //        window.addEventListener('mousemove', (event) => {
        //            event.preventDefault();
        //            if (this.mouse_hold) this.mouseMove(event);
        //        });
        /*
        When mouse button is released.
        */
        window.addEventListener('mouseup', (event) => {
            event.preventDefault();            
            window.removeEventListener('mousemove', this.mouseMove(event));
        });
    }

    mouseScroll(event){
        var delta = event.deltaY / 100;
        this.dropdown.content.scrollMove(-delta);
        this.dropdown.track.thumb.scrollMove(delta);
    }

    mouseMove(event){
        var thumb_delta = event['clientY'] - this.dropdown.track.params['top'] - this.dropdown.track.thumb.elem.offsetHeight/2,
            content_delta = this.dropdown.content.position.min * (this.dropdown.track.thumb.position.current/this.dropdown.track.thumb.position.max);
        
        this.dropdown.content.mouseMove(content_delta);
        this.dropdown.track.thumb.mouseMove(thumb_delta);
    }
}