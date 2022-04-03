window.addEventListener('DOMContentLoaded', function() {

    let tabContent = document.querySelector('.tab-content'),
        tab = document.querySelectorAll('.tab'),
        info = document.querySelectorAll('.info-tab');

    function oneTab () {
        tab[0].classList.add('fade');
    }
    oneTab();

    function hideContent(a) {
        for (let i=a; i < info.length; i++) {
            info[i].classList.remove('show');
            info[i].classList.add('hide');
            tab[i].classList.remove('fade');
            tab[i].classList.add('prade');
        }
    }

    hideContent(1);

    function showContent(b) {
        if (info[b].classList.contains('hide')) {
            info[b].classList.remove('hide');
            info[b].classList.add('show');
            tab[b].classList.remove('prade');
            tab[b].classList.add('fade');
        }
    }

    tabContent.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('tab')) {
            for (let i = 0; i < info.length; i++) {
                if (tab[i] == target) {
                    hideContent(0);
                    showContent(i);
                }              
            }
        }
    });

    // Timer

    let deadLine = '2021-12-28';

    function getRemainingTime(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            hours = (t/1000/60/60),
            minutes = ((t/1000/60) % 60),
            seconds = ((t/1000) % 60);

        return {
            'total': t,
            'hours':  hours.toFixed(),
            'minutes':  minutes.toFixed(),
            'seconds':  seconds.toFixed()
        };
    }  
    
    function setClock(id, endtime) {

        let timer = document.querySelector('.timer'),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            interval = setInterval(goTime, 1000);

        function appZero(num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        };

        function goTime() {
            let t = getRemainingTime(endtime);

            hours.textContent = appZero(t.hours) + ' :';
            minutes.textContent = appZero(t.minutes) + ' :';
            seconds.textContent = appZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(interval);
                hours.textContent = '00' + ' :';
                minutes.textContent = '00' + ' :';
                seconds.textContent = '00';
            }
        }

        
    }

    setClock('timer', deadLine);

    // Modal
    
    let overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        but = document.getElementById('but');

    but.addEventListener('click', function() {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // Slider
});

