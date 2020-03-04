import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel,
  DialogUserModel
} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../shared/user';
import {UserDialogComponent} from './shared/components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-denunciations-manager',
  templateUrl: './denunciations-manager.component.html',
  styleUrls: ['./denunciations-manager.component.scss']
})
export class DenunciationsManagerComponent implements OnInit {
  public name = 'Carregando...';
  private user: User;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.name  = this.user.name;
    console.log(this.authService)
    console.log(this.authService.currentUser.name)
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

  dialogUser() {
      const user = this.user;
      const dialogData = new DialogUserModel(user.name, user.department, user.contact, user.email, user.administrator );
      const dialogRef = this.dialog.open(UserDialogComponent, {
        maxWidth: '500px',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          // this.signOut();
        }
      });


  }
}
