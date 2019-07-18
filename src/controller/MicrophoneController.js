import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{
    constructor(){
        super();
        this._available = false;
        this._mimeType = 'audio/webm'
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this._available = true;

            this._stream = stream;
            let audio = new Audio();
            
            this.trigger('ready', this._stream)
        }).catch(err =>{
            console.error(err);
        });
    }

    stop(){
        this._stream.getTracks().forEach(track => {
            track.stop();
        })
    }

    startRecorder(){
        if(this.isAvailable()){
            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            })

            this._recordedChunks = []
            
            this._mediaRecorder.addEventListener('dataavailable', e => {
                if(e.data.size > 0) this._recordedChunks.push(e.data);
            });
            
            this._mediaRecorder.addEventListener('stop', e=>{
                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                })
                let fileName = `rec${Date.now().toString()}.webm`
                let file = new File([blob], fileName, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });
                
                let reader = new FileReader();
                reader.onload = e => {
                    let audio = new Audio(reader.result);
                    audio.play()
                }
                reader.readAsDataURL(file)
            })
            
            this._mediaRecorder.start();
            this.startTimer();
        }
    }
    
    stopRecorder(){
        if(this.isAvailable()){
            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();
        }
    }

    isAvailable(){
        return this._available;
    }

    startTimer(){
        let start = Date.now()
        this._recordMicrophoneInterval = setInterval( ()=> {
            this.trigger('recorderTimer', (Date.now() - start))
        }, 1000)
    }

    stopTimer(){
        clearInterval(this._recordMicrophoneInterval)
    }
}