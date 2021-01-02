import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from '../models/user';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: MatTableDataSource<User>, searchTerm: string): any {
    if(searchTerm == "" || users == undefined) 
      return users;

    let lowerCaseTerm = searchTerm.toLowerCase();

    let filteredUsers = users.data.filter(user => {
      let nameLower = user.name.toLowerCase();
      let usernameLower = user.username.toLowerCase();

      return nameLower.includes(lowerCaseTerm) || usernameLower.includes(lowerCaseTerm);
    })

    return filteredUsers;
  }

}
