import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  collapseHeight = '0px';
  private closeTimeout: any;

  constructor(private router: Router) { }
  

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  
  toggleCollapse(isOpen: boolean) {
    clearTimeout(this.closeTimeout);

    if (isOpen) {
      const collapseContent = document.querySelector('.collapse-inner');
      this.collapseHeight = `${collapseContent!.scrollHeight}px`;
    } else {
      this.closeTimeout = setTimeout(() => {
        this.collapseHeight = '0px';
      }, 300); 
    }
  }


}
