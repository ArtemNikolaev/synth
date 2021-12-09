import { Injectable } from '@angular/core';
import { Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private isListened : any= {};

  public $messages = new Subject<any>();

  public $devices = new Subject<any>();

  constructor() {

    this.getListOfDevices();
  }

  getListOfDevices() {
    navigator.requestMIDIAccess()
      .then((midi: any) => {
        const result = [...midi.inputs.values()]
          .map((el:any) => {
            const result = {
              manufacturer: el.manufacturer,
              name: el.name,
              id: el.id,
              isListened: this.isListened[el.id],
            };

            if (result.isListened) {
              el.onmidimessage = (msg: any) => {
                this.$messages.next(msg.data);
              }
            }

            return result;
          });

        this.$devices.next(result);
    });
  }

  changeListeningStatus(deviceId: any) {
    this.isListened[deviceId] = !this.isListened[deviceId];

    this.getListOfDevices();
  }
}
