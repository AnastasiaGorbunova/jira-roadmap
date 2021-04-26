import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: User;
  @Output() onUserSighOut = new EventEmitter<void>();
  @Output() onNavigateToBoard = new EventEmitter<void>();

  constructor() { }

  get displayName(): string {
    const { first_name, last_name } = this.currentUser || {};
    return `${first_name} ${last_name}`;
  }

  signOut(): void {
    this.onUserSighOut.emit();
  }

  navigateToBoard(): void {
    this.onNavigateToBoard.emit();
  }

  ngOnInit() {
  }

}
