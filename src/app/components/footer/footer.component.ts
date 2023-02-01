import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  toggleButton() {
    if (this.uiService.showAddTask === true) {
      this.uiService.toggleAddTask();
    }
  }
}
