import { Component } from '@angular/core';

// import json file
import data from './244820.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  distantAddresses: Set<string> = new Set();
  counter = 0;
  size = 0;
  func(): void {
    this.counter = 0;
    const jsonData = data.tx;
    for (const tx of jsonData) {
      if (tx.inputs !== undefined) {
        for (const input of tx.inputs) {
          if (input.prev_out !== undefined) {
            if ('addr' in input.prev_out) {
              this.distantAddresses.add(input.prev_out.addr);
              this.counter++;
            }
          }
        }
      }
      if (tx.out !== undefined) {
        for (const output of tx.out) {
          if ('addr' in output) {
            this.distantAddresses.add(output.addr);
            this.counter++;
          }
        }
      }
    }
    console.log(this.distantAddresses);
    this.size = this.distantAddresses.size;
  }

  hiddens(): void {}
}
