import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() hidden = true
  @Output() closeRequest = new EventEmitter()

  onBackdropClick() {
    this.closeRequest.emit()
  }
}
