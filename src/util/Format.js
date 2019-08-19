export class Format{

    static getCamelCase(text){
        let div = document.createElement('div')
        div.innerHTML = `<div data-${text}="id"></div>`;
        return Object.keys(div.firstChild.dataset)[0];
    }
    
    static toTime(duration){
        let seconds = parseInt((duration / 1000));
        if(parseInt(seconds / 60 / 60) > 0){
            return [
                parseInt(seconds / 60 / 60),
                parseInt(seconds / 60 % 60),
                parseInt(seconds % 60).toString().padStart(2, '0')
            ].join(":")

        }else{
            return [
                parseInt(seconds / 60 % 60),
                parseInt(seconds % 60).toString().padStart(2, '0')
            ].join(":")
        }

    }

    static timeStampToTime(timeStamp){
        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
    }

    static dateToTime(date, locale = 'pt-BR'){
        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}