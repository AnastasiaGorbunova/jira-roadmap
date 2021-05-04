import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Issue, IssueType, issueTypes, issueTypesSet } from '@app/core/models/task.model';
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
    const name = this.issueForm.get('name').value;
    const description = this.issueForm.get('description').value;
    const type = this.issueForm.get('type').value;
    // const assigneeId = this.issueForm.get('assignee_id').value;

    // TODO: add issueModalData model
    handleConfirm({ name, description, type } as Issue);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeTaskForm();
  }

  private initializeTaskForm(): void {
    const { taskName, description, type, isProjectLevel } = this.data;

    if (!isProjectLevel) {
      this.issueTypes = issueTypes;
    }

    this.issueForm = new FormGroup({
      name: new FormControl(taskName || '', {
        validators: [emptyFieldValidator, Validators.maxLength(50)]
      }),
      description: new FormControl(description || ''),
      type: new FormControl(type || '', Validators.required),
      // assigneeId: new FormControl(''),
    });
  }
}
