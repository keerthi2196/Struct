import { Component, HostListener, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  constructor(private projectService: ProjectsService, private viewportScroller: ViewportScroller, private route: ActivatedRoute,
    private router: Router){}
  title = 'projectApp';
  isNavbarTransparent = true;


  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isNavbarTransparent = true;
    } else {
      this.isNavbarTransparent = false;
    }
  }

  ngOnInit() {
    this.route.fragment.pipe(
      filter(f => !!f),
    ).subscribe(anchor => {
      // Now we're sure that anchor can't be null
      this.viewportScroller.scrollToAnchor(anchor!);
    });
  }

  setActiveButton(buttonName: string) {
    this.projectService.setActiveButton(buttonName);
    this.router.navigate(['/home'], { fragment: buttonName });
  }

  navigateToSection(id: string) {
    if (id) {
      let el = document.querySelector('#' + id);
      if (el) {
        el.scrollIntoView();
      }
    }
  }


}
