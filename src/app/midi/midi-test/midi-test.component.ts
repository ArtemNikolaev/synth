import {Component, NgZone, OnInit} from '@angular/core';
import { DevicesService } from "../devices.service";

@Component({
  selector: 'app-midi-test',
  templateUrl: './midi-test.component.html',
  styleUrls: ['./midi-test.component.css']
})
export class MidiTestComponent implements OnInit {
  private $messages: any;
  private $devices: any;

  public content: any = [];
  public devices: any = [];

  constructor(private deviceService: DevicesService, private zone: NgZone) {
    this.$messages = deviceService.$messages;
    this.$devices = deviceService.$devices;
  }

  ngOnInit(): void {
    this.$messages.subscribe((msg: any) => {
      this.zone.run(() => {
        this.content.unshift(msg);
      });
    });

    this.$devices.subscribe(
      (msg : any) => {
        this.devices = [...msg];
      },
      (error: any) => {
        this.devices = [error];
      }
    )
  }

  changeStatus(id : any) {
    this.deviceService.changeListeningStatus(id);
  }
}
