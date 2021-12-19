const slider = tns({
    container: '.slider__wrapper',
    items: 1,
    gutter: 50,
    touch: true,
    mouseDrag: true,    
    nav: false,
    controlsContainer: '.slider__controls',
    responsive: {
        720: {
            touch: false,
            mouseDrag: false,
        }
    }
});

let scrollToElement = (id) => {
    let target = document.querySelector(`${id}`);

    targetYCoord = target.getBoundingClientRect().y + globalThis.scrollY;

    globalThis.scrollTo({
        top: targetYCoord,
        behavior: 'smooth'
    });
}

let numberMask = (event) => {
    let target = event.currentTarget;
    let value = target.value;

    value = value.replace(/[A-Za-zА-Яа-яЁё]/gi, '');

    target.value = value;
}

let createTimer = ({
    hours = 0,
    minutes = 1,
    seconds = 60,
    selector = ''
} = {}) => {
    
    let done = false;
    let time = {
        hours,
        minutes,
        seconds
    };

    let render = () => {
        let element = document.querySelector(selector);

        element.innerText = `${time.hours}:${time.minutes}:${time.seconds}`
    }

    Object.entries(time).forEach(([key, value]) => {
        let timeInterval = 0;

        switch (key) {
            case 'hours':
                timeInterval = (1000 * 60) * 60;
            break;

            case 'minutes':
                timeInterval = 1000 * 60; 
            break;

            case 'seconds':
                timeInterval = 1000;
            break;
        } 

        let timer = setInterval(() => {
            if (time[key] === 0) {
                return;
            } 

            if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
                clearInterval(time);
            }

            time[key] = time[key] - 1;

            if (key === 'minutes') {
                time.seconds = 59;
            } else if (key === 'hours') {
                time.minutes = 59;
                time.seconds = 59;
            }

            render();
        }, timeInterval)
    });


}

createTimer({
    minutes: 30,
    selector: '.timer'
})