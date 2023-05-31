import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = 'assets/projects.json'; // URL to your projects.json file

  constructor(private http: HttpClient) { }

  getProjects(): Observable<{projectsCompleted: Project[], ongoingProjects: Project[]}> {
    return this.http.get<{projectsCompleted: Project[], ongoingProjects: Project[]}>(this.projectsUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.getProjects().pipe(
        map(projects => {
            const allProjects = [...projects.projectsCompleted, ...projects.ongoingProjects];
            const foundProject = allProjects.find(project => project.id === id);
            if (!foundProject) {
                throw new Error(`Project with id ${id} not found.`);
            }
            return foundProject;
        })
    );
}

private activeButtonSubject = new BehaviorSubject<string>('Bridges and Flyovers');
activeButton$ = this.activeButtonSubject.asObservable();

setActiveButton(buttonName: string) {
  this.activeButtonSubject.next(buttonName);
}

}
