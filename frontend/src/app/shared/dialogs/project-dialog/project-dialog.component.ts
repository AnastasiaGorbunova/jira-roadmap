import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Project } from '@app/core/models/project.model';
import { User } from '@app/core/models/user.model';
import { validationMessages } from '@app/core/validation/validation.constants';
import { emptyFieldValidator } from '@app/core/validation/validators';
import { UsersStoreSelectors } from '@app/root-store/features/users';
import { AppState } from '@app/root-store/state';

@UntilDestroy()
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDialogComponent implements OnInit {
  projectForm: FormGroup;
  users: User[];
  filteredUsers: User[];

  validationMessages = validationMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    private _store$: Store<AppState>
  ) { }

  get isSubmitDisabled(): boolean {
    return !this.projectForm.valid;
  }

  hasFieldValidationError(fieldName: string, errorName: string): boolean {
    return this.projectForm.get(fieldName)?.hasError(errorName);
  }

  saveProject(): void {
    const { handleConfirm } = this.data;

    const { participants_ids, ...formValues } = this.projectForm.value;

    const participants = this.makeParticipantsMap(participants_ids);

    handleConfirm({ ...formValues, participants } as Project);
    this.dialogRef.close();
  }

  filterUsers(value: string): void {
    const filterValue = value?.trim().toLowerCase();
    this.filteredUsers = this.users.filter(({ first_name, last_name }) =>
      `${first_name}${last_name}`.toLowerCase().includes(filterValue))
  }

  resetFilteredUsers(): void {
    this.filteredUsers = this.users;
  }

  ngOnInit() {
    this.getUsers();
    this.initializeProjectForm();
  }

  private initializeProjectForm(): void {
    this.filteredUsers = this.users;
    
    const { name, description, leader_id, participants } = (this.data || {}).project || {} as Project;
    const participantsIds = Object.keys(participants || {});

    this.projectForm = new FormGroup({
      name: new FormControl(name || '', {
        validators: [emptyFieldValidator, Validators.maxLength(50)]
      }),
      leader_id: new FormControl({ 
        value: leader_id || '', 
        disabled: !this.data.isCurrentUserAdmin 
      }, Validators.required),
      participants_ids: new FormControl(participantsIds || '', Validators.required),
      description: new FormControl(description || ''),
    });
  }

  private makeParticipantsMap(participantsIds: string[]): { [participantId: string]: true } {
    const participantsMap = {};
    participantsIds.forEach(participantId => {
      participantsMap[participantId] = true;
    });

    return participantsMap;
  }

  private getUsers(): void {
    this._store$.pipe(
      select(UsersStoreSelectors.usersSelector),
      untilDestroyed(this)
    ).subscribe(users => this.users = users);
  }
}
