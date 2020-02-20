import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {ConfirmationDialogComponent, ConfirmDialogModel} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-denunciations-manager',
  templateUrl: './denunciations-manager.component.html',
  styleUrls: ['./denunciations-manager.component.scss']
})
export class DenunciationsManagerComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.doLogout();
  }

  confirmDialog(): void {
    const message = `Você tem certeza que deseja efetuar Logout?`;

    const dialogData = new ConfirmDialogModel('Confirmação', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.signOut();
      }
    });
  }
}
