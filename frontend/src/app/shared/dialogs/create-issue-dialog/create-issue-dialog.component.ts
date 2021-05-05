import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';

import { Issue, IssueType, issueTypes, issueTypesSet } from '@app/core/models/issue.model';
import { unassigned, User } from '@app/core/models/user.model';
import { validationMessages } from '@app/core/validation/validation.constants';
import { emptyFieldValidator } from '@app/core/validation/validators';
import { UsersStoreSelectors } from '@app/root-store/features/users';
import { AppState } from '@app/root-store/state';

@UntilDestroy()
@Component({
  selector: 'app-create-issue-dialog',
  templateUrl: './create-issue-dialog.component.html',
  styleUrls: ['./create-issue-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateIssueDialogComponent implements OnInit {
  issueForm: FormGroup;
  users: User[];
  filteredUsers: User[];

  validationMessages = validationMessages;
  unassigned = unassigned;
  issueTypesSet = issueTypesSet;
  issueTypes = [IssueType.Task, IssueType.Bug];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateIssueDialogComponent>,
    private _store$: Store<AppState>
  ) { }

  get isSubmitDisabled(): boolean {
    return !this.issueForm.valid;
  }

  hasFieldValidationError(fieldName: string, errorName: string): boolean {
    return this.issueForm.get(fieldName)?.hasError(errorName);
  }

  saveIssue(): void {
    const { handleConfirm } = this.data;
    const assigneeIdFormValue = this.issueForm.get('assignee_id').value;
    const assigneeId = assigneeIdFormValue === unassigned ? '' : assigneeIdFormValue;

    handleConfirm({ ...this.issueForm.value, assignee_id: assigneeId } as Issue);
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
    this.initializeIssueForm();
  }

  private initializeIssueForm(): void {
    const { issue, creationType } = this.data;

    const { name, description, type, assignee_id } = issue || {} as Issue;

    this.filteredUsers = this.users;
    
    if (type === IssueType.SubTask || creationType === IssueType.SubTask) {
      this.issueTypes = issueTypes;
    }
    
    // subtask can`t be changed to another type
    const isSubtask = type === IssueType.SubTask;
    const issueType = type || creationType || '';
    const isIssueTypeDisabled = isSubtask || creationType === IssueType.SubTask;

    this.issueForm = new FormGroup({
      name: new FormControl(
        name || '',
        {
          validators: [emptyFieldValidator, Validators.maxLength(50)]
        }
      ),
      description: new FormControl(description || ''),
      type: new FormControl({ value: issueType, disabled: isIssueTypeDisabled }, Validators.required),
      assignee_id: new FormControl(assignee_id || unassigned),
    });
  }

  private getUsers(): void {
    this._store$.pipe(
      select(UsersStoreSelectors.usersSelector),
      untilDestroyed(this)
    ).subscribe(users => this.users = users);
  }
}
