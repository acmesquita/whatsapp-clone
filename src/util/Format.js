export class Format{

    static getCamelCase(text){
        let div = document.createElement('div')
        div.innerHTML = `<div data-${text}="id"></div>`;
        return Object.keys(div.firstChild.dataset)[0];
    }
    
    static toTime(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / 1000 * 60) % 60);
        let hours = parseInt((duration / 1000 * 60 * 60) % 60);

        if(hours > 0){
           return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}` 
        }else{
           return `${minutes}:${seconds.toString().padStart(2, '0')}` 
        }
    }

    static timeStampToTime(timeStamp){
        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
    }

    static dateToTime(date, locale = 'pt-BR'){
        return date.toLocaleTimeString(locale, {
            hours: '2-digit',
            minutes: '2-digit'
        })
    }
}