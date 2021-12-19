import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarFolded = this.media.isActive('lt-md') ? true : false

  constructor(public media: MediaObserver) {}

  toggleSidebar() {
    this.sidebarFolded = !this.sidebarFolded
  }
}
