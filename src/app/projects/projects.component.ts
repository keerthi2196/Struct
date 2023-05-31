import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
projects: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('/assets/projects.json').subscribe((data) => {
      console.log(data);
      this.projects = data;
    })
  }

  navigateToDetail(){
    this.router.navigate(['/project-details', ])
  }

}
