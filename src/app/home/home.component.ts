import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../projects.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('scaleAndFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit , OnChanges {
  activeButton = 'BridgesAndFlyovers';
  querySubscription!: Subscription;
  @ViewChild('contentContainer')
  contentContainer!: ElementRef;
  @Input() newButton: string = 'Bridges andflyovers';

  constructor( private projectService: ProjectsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activeButton,'button')
    this.querySubscription = this.projectService.activeButton$.subscribe(
      buttonName => {
        this.activeButton = buttonName;
       this.scrollToSection(buttonName);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.newButton && changes.newButton.currentValue){
      }
  }

  setActiveButton(buttonName: string) {

    this.activeButton = buttonName;

  }
  // ngAfterViewInit() {
  //   this.route.fragment.subscribe((fragment: string | null) => {
  //     const element = document.querySelector('#' + fragment);
  //     if (element) element.scrollIntoView({ behavior: 'smooth' });
  //   });
  // }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
