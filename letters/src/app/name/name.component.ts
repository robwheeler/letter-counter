import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  names: string[] = [
    "",
  ]
  counts: {[key: string]: number} = {};

  constructor() { }

  ngOnInit(): void {

  }

  addName() {
    this.names.push("");
    this.updateRequired();
  }

  removeName(nameIndex: number) {
    this.names.splice(nameIndex, 1);
    this.updateRequired();
  }

  trackBy(index: number, name: string) {
    return index;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.updateRequired();
  }

  updateRequired() {
    var n;
    this.counts = {};
    for (n in this.names) {
      var name = this.names[n];
      var count: {[key: string]: number} = {};
      name.toUpperCase().split("").forEach(val => count[val] = (count[val] || 0) + 1);
      for (var c in count) {
        this.counts[c] = Math.max(count[c], (this.counts[c] || 0));
      }
    }
    console.log(this.counts);
  }
}
