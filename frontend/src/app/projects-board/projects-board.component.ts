import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-board',
  templateUrl: './projects-board.component.html',
  styleUrls: ['./projects-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
