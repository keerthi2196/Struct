import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectsService } from '../projects.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  projectId: number = 0;
  project: Project | undefined;
  completedProjects: any[] = [];
  ongoingProjects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.projectService.getProject(id).subscribe(project => {
      this.project = project;
    });
  }

  getProject(id: number) {
    this.http.get('/assets/projects.json').subscribe((data: any) => {
      console.log(data, 'projects');
      this.completedProjects = data.projectscompleted;
      this.ongoingProjects = data.ongoingProjects;
    });
  }
}
