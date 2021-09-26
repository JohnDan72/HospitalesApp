import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  menuItems: any[];

  constructor(private sidebarSevice: SidebarService) { 
    this.menuItems = sidebarSevice.menu;
    // console.log(this.menuItems)
  }

  ngOnInit(): void {
  }

}
