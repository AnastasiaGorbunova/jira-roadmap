import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Project } from '@app/core/models/project.model';
import { validationMessages } from '@app/core/validation/validation.constants';
import { emptyFieldValidator } from '@app/core/validation/validators';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm: FormGroup;

  validationMessages = validationMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
  ) { }

  get isSubmitDisabled(): boolean {
    return !this.projectForm.valid;
  }

  hasFieldValidationError(fieldName: string, errorName: string): boolean {
    return this.projectForm.get(fieldName)?.hasError(errorName);
  }

  saveProject(): void {
    const { handleConfirm } = this.data;
    const projectName = this.projectForm.get('name').value;
    const description = this.projectForm.get('description').value;

    handleConfirm({ name: projectName, description } as Project);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeProjectForm();
  }

  private initializeProjectForm(): void {
    const { projectName, description } = this.data;
    this.projectForm = new FormGroup({
      name: new FormControl(projectName || '', {
        validators: [emptyFieldValidator, Validators.maxLength(50)]
      }),
      description: new FormControl(description || '')
    });
  }
}
