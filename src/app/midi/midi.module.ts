import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidiTestComponent } from './midi-test/midi-test.component';

@NgModule({
  declarations: [
    MidiTestComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MidiTestComponent,
  ]
})
export class MidiModule { }
