import { Component, OnInit } from '@angular/core';
import { MenuHandlerService } from './menu-handler.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private menuService: MenuHandlerService) {}
  showProfile = '';
  ngOnInit(): void {}
  openmenu() {
    this.menuService.menuStatus.next(true);
  }
  openProfile() {
    this.showProfile = this.showProfile === '' ? 'show' : '';
  }
}
