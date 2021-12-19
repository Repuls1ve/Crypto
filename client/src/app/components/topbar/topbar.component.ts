import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() onSidebarToggle = new EventEmitter()

  constructor(public media: MediaObserver) {}

  toggleSidebar() {
    this.onSidebarToggle.emit()
  }
}
