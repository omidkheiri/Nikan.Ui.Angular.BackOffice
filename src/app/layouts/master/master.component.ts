import { Component, OnInit } from '@angular/core';
import { MenuHandlerService } from './header/menu-handler.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {
  year = new Date().getFullYear();
  classMenu = 'overlay';
  constructor(private service: MenuHandlerService) {}
  closemenu() {
    // sbar-open sidebar-noneoverflow
    this.service.menuStatus.next(false);
  }
  ngOnInit(): void {
    this.service.menuStatus.subscribe((observer) => {
      if (observer) {
        this.classMenu = 'overlay show';
      } else {
        this.classMenu = 'overlay';
      }
    });
  }
}
