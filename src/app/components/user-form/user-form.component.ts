import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm : FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required]
  })

  // Geteri za kontrole
  get id() { return this.userForm.controls['id']};
  get name() { return this.userForm.controls['name']};
  get username() { return this.userForm.controls['username']};
  get email() { return this.userForm.controls['email']};
  get phone() { return this.userForm.controls['phone']};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder : FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {

      // Ako postoji id parametar, znaci da je komponenta aktivirana preko rute users/:id/edit
      // Ako ne postoji znaci da je komponenta aktivirana preko rute users/add
      if(params['id']) {

        let id = +params['id'];
        if(Number.isInteger(id)) 
          this.userService.getUserById(id).subscribe( user => this.populateForm(user));
        else 
          this.router.navigate(["/not-found"]);
        
      }

      
    })
  }

  populateForm(user: User) {
    this.id.setValue(user.id);
    this.name.setValue(user.name);
    this.username.setValue(user.username);
    this.email.setValue(user.email);
    this.phone.setValue(user.phone)
  }


  onSubmit() {
    let id = this.userForm.controls['id'].value;
    let user: User = this.userForm.value;

    if(id != null) {
      this.userService.editUser(user).subscribe( user => {
        console.log(user);
        this.notificationService.emitSuccesNotification("Successfuly edited user");
        this.backToUserList();
      })

    } else {
      this.userService.addUser(user).subscribe( user => {
        console.log(user);
        this.notificationService.emitSuccesNotification("Succesfuly added user");
        this.backToUserList();
      })
    }
  }

  backToUserList() {
    this.router.navigate(['']);
    this.notificationService.emitInfoNotification("Navigated back to the user list")
  }

}
