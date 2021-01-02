import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['name', 'username', 'email', 'action']
  searchTerm = "";

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe( users => {
      this.dataSource = new MatTableDataSource(users);
      this.notificationService.emitSuccesNotification("Successfully loaded users");
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe( data => {
      this.notificationService.emitWarningNotification(`User with ID ${id} has been deleted`);

      // imitira brisanje sa servera
      let index = this.dataSource.data.findIndex(value => value.id == id);
      this.dataSource.data.splice(index,1);
      // okidac za ponovno renderovanje 
      this.dataSource.data = this.dataSource.data;
    })
  }

}
