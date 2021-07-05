import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private route: Router) { }

  ngOnInit() {
    console.log(this.route.url);

    if (this.route.url === "/") {
      this.items = [
        {
          label: 'Home',
          icon: 'fas fa-home',
          routerLink : "/"
        }
      ];
    } else {
      // inserer ici le menu lorsqu'on est sur un sumonner
    }

  }

}
