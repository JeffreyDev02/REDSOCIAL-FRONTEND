import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url:string;

  constructor() { 
    this.url = Global.url;
  }

  makeFile(url:string, params:Array<string>, file:Array<File>, token:string, name:string){
    return new Promise(function(resolve, reject){
      let form = new FormData();
      let xhr = new XMLHttpRequest();
      
      for(let i=0; i <= file.length; i++){
        form.append(name, file[i]);
      }
      
      xhr.addEventListener("readystatechange", e=>{
        if(xhr.readyState != 4 ) return

        if(xhr.status >= 200 && xhr.status <300 ){
          
          resolve(JSON.parse(xhr.response))
          
        }else{
          reject(xhr.responseText)
          
        }
      })
      
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Authorization", token);
      xhr.send(form);

    });

  }
}
