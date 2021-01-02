import { isIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {

      let id = +params['id']; // Konvertuje parametar u broj, ako ne uspe u id ce biti upisan NaN
      
      if(Number.isInteger(id)) // Da se osiguramo da je konvertovani broj INT
        this.userService.getUserById(id).subscribe( user => this.user = user)
      else
        this.router.navigate(["/not-found"]);
        
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe( data => {
      console.log(data);
      alert("Successfuly deleted used");
      this.router.navigate(['']);
    })

  }

}
