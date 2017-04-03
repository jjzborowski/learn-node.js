function addClass(elements, className){
    if(elements.nodeType === 1){
        elements.classList ? elements.classList.add(className) : elements.className += ' ' + className;
    } else {
        for(let i = 0; i < elements.length; i += 1) {
            elements[i].classList ? elements[i].classList.add(className) : elements[i].className += ' ' + className;
        }
    }
};

function removeClass(elements, className){
    if(elements.nodeType === 1){
        elements.className = elements.className.replace(className, '');
        elements.className = elements.className.replace('  ', ' ');
    } else {
        for(let i = 0; i < elements.length; i += 1) {
            elements[i].className = elements[i].className.replace(className, '');
            elements[i].className = elements[i].className.replace('  ', ' ');
        }
    }
};

function hasClass(element, className){
    if(element.nodeType === 1){
        return element.classList.contains(className);
    }
};

function getSiblings(element){
    let siblings = [],
        elements = element.parentElement.children;

    for(let i = 0; i < elements.length; i += 1){
        if(elements[i].nodeType === 1 && elements[i] !== element) {
            siblings.push(elements[i]);
        }
    }
    return siblings;
}

function loadScripts(array, callback){
    let loader = function(src, handler){
        let script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = () => {
            script.onreadystatechange = script.onload = null;
            handler();
        }
        document.body.appendChild(script);
    };
    (function run(){
        if(array.length!=0){
            loader(array.shift(), run);
        }else{
            callback && callback();
        }
    })();
}

function addMultipleEventListeners(elements, events, handler){
    let events_amount = events.length;

    if(elements.nodeType === 1){
        for(let i = 0; i < events_amount; i += 1){
            elements.addEventListener(events[i], handler);
        }
    } else {
        for(let i = 0, l = elements.length; i < l; i += 1) {
            for(let j = 0; j < events_amount; j += 1){
                elements[i].addEventListener(events[j], handler);
            }
        }
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function compareElements(base, target, depth_search = false){
    if(base === target){
        return true;
    } else if(base.children.length && depth_search){
        for(let i = 0; i < base.children.length; i += 1){
            if(compareElements(base.children[i], target, depth_search))
                return true;
        }
        return false;
    } else {
        return false;
    }
}


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
        this.styles = this.elem.currentStyle || window.getComputedStyle(this.elem);
        this.position = new Position();
    }

    /*
    set(axis, current, min, max, is_content) - set basic attributes of component
    current - defines current position of the element
    min - defines minumum position of the element
    max - defines maximum position of the element
    scroll_ratio - defines progress of element movement
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
    delta - defines multiplier of motion
    */
    scrollMove(delta){
        this.position.setCurrent(this.position.current + delta * this.position.scroll_ratio);
        this.move();
    }

    /*
    mouseMove(axis, delta) - change position of element on mouse move event
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
        this.dropdown.content.options = [];
        let options = this.dropdown.content.elem.querySelectorAll('.cwc-select-option');
        for(let i = 0; i < options.length; i += 1){
            this.dropdown.content.options.push(new Component(options[i]));
        }

        let hidden_options = ((options_length === undefined) ? this.dropdown.content.options.length : options_length) - 5;

        if(options_length !== 0){
            this.dropdown.content.set(
                0,
                this.dropdown.elem.clientHeight - this.dropdown.content.elem.offsetHeight,
                0,
                this.dropdown.content.options[0].elem.offsetHeight
            );
            if(hidden_options !== 0) {
                this.dropdown.track.thumb.set(
                    0,
                    0,
                    this.dropdown.track.elem.offsetHeight - this.dropdown.track.thumb.elem.offsetHeight,
                    (this.dropdown.track.elem.offsetHeight - this.dropdown.track.thumb.elem.offsetHeight)/hidden_options
                );
            }
        }
    }

    refreshDropdown(options_length){
        this.set(options_length);
    }

    openDropdown(){
        addClass(this.dropdown.elem, 'active');
    }

    closeDropdown(){
        removeClass(this.dropdown.elem, 'active');
    }

    /*
    events() - bind events to the elements
    */
    events(){
        this.elem.addEventListener('keydown', (event) => {
            if(event.keyCode === 40) this.keyMove(1);
            if(event.keyCode === 38) this.keyMove(-1);
            if(event.keyCode === 27) this.closeDropdown();
        });

        window.addEventListener('mousedown', (event) => {
            if(!compareElements(this.elem, event.target, true))
                this.closeDropdown();
        });

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
            this.mouse_hold = true;
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
        window.addEventListener('mousemove', (event) => {
            event.preventDefault();
            if (this.mouse_hold) this.mouseMove(event);
        });
        /*
        When mouse button is released.
        */
        window.addEventListener('mouseup', (event) => {
            event.preventDefault();
            this.mouse_hold = false;
        });
    }

    keyMove(delta){
        this.dropdown.content.scrollMove(-delta);
        this.dropdown.track.thumb.scrollMove(delta);
    }

    /*
    mouseScroll(event)
    */
    mouseScroll(event){
        var delta = event.deltaY / 100;
        this.dropdown.content.scrollMove(-delta);
        this.dropdown.track.thumb.scrollMove(delta);
    }

    mouseMove(event){
        var thumb_delta = event.clientY - this.dropdown.track.elem.getBoundingClientRect().top - this.dropdown.track.thumb.elem.offsetHeight/2,
            content_delta = this.dropdown.content.position.min * (this.dropdown.track.thumb.position.current/this.dropdown.track.thumb.position.max);

        this.dropdown.content.mouseMove(content_delta);
        this.dropdown.track.thumb.mouseMove(thumb_delta);
    }
}