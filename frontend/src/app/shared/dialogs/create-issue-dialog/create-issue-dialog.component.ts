import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Issue, IssueType, issueTypes, issueTypesSet } from '@app/core/models/task.model';
import { User } from '@app/core/models/user.model';
import { validationMessages } from '@app/core/validation/validation.constants';
import { emptyFieldValidator } from '@app/core/validation/validators';

@Component({
  selector: 'app-create-issue-dialog',
  templateUrl: './create-issue-dialog.component.html',
  styleUrls: ['./create-issue-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateIssueDialogComponent implements OnInit {
  issueForm: FormGroup;
  filteredUsers: User[];

  validationMessages = validationMessages;
  issueTypesSet = issueTypesSet;
  issueTypes = [IssueType.Task, IssueType.Bug];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateIssueDialogComponent>,
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
    const assigneeId = assigneeIdFormValue === 'unassigned' ? '' : assigneeIdFormValue;
    // TODO: add issueModalData model
    handleConfirm({ ...this.issueForm.value, assignee_id: assigneeId } as Issue);
    this.dialogRef.close();
  }

  filterUsers(value: string): void {
    const filterValue = value?.trim().toLowerCase();
    this.filteredUsers = this.data.projectUsers.filter(({ first_name, last_name }) =>
      `${first_name}${last_name}`.toLowerCase().includes(filterValue))
  }

  ngOnInit() {
    this.initializeIssueForm();
  }

  private initializeIssueForm(): void {
    const { issue, isProjectLevel, projectUsers, creationType } = this.data;

    const { name, description, type, assignee_id } = issue || {} as Issue;

    this.filteredUsers = projectUsers;
    
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
      assignee_id: new FormControl(assignee_id || 'unassigned'),
    });
  }
}
