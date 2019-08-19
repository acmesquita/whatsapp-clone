import { Firebase } from "./Firebase";

export class Upload {
  
  static send(file, from) {
    return new Promise((resolve, reject) => {

			let uploadTask = Firebase.hd().ref(from).child(Date.now() + "_" + file.name).put(file);

			uploadTask.on('state_changed',
				e => { console.info('upload', e) },
				error => { reject(error) },
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
						resolve(downloadURL);
					})
				}
			)
		});
  }
}