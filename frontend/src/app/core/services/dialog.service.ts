import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmActionDialogComponent } from '@app/shared/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { IssueDialogComponent } from '@app/shared/dialogs/issue-dialog/issue-dialog.component';
import { ProjectDialogComponent } from '@app/shared/dialogs/project-dialog/project-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogComponents: any;
  private defaultDialogData: object;

  constructor(public dialog: MatDialog) {
    this.dialogComponents = {
      ConfirmActionDialogComponent,
      ProjectDialogComponent,
      IssueDialogComponent
    };

    this.defaultDialogData = {
      confirmBtnText: 'Submit',
      cancelBtnText: 'Cancel',
      closeOnConfirm: true
    };
  }

  open(dialogComponentName: string, data: any): MatDialogRef<any> {
    const dialogComponent = this.dialogComponents[dialogComponentName];

    return this.dialog.open(dialogComponent, {
      data: {
        ...this.defaultDialogData,
        ...data,
      },
      width: data.width || '600px',
      height: data.height || 'auto',
      maxWidth: data.maxWidth || '600px',
      panelClass: data.panelClass || '',
      disableClose: data.disableClose || false,
      restoreFocus: data.restoreFocus || false,
    });
  }
}
