import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service'
import {Router } from '@angular/router';

@Component({
  selector: 'appheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private router:Router) { }

  navLinks = [
    {path:'/officeBearers', label:'officeBearers'},
    {path:'/notification', label:'notification'}
  ];
 
  logout()
  {
    localStorage.removeItem('Userinfo');
    this.router.navigate(['/']);
  }
  ngOnInit() {
    
  }
  
  
}
