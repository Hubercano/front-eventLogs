import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { Event } from '../../shared/interfaces/event.interface';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private userService = inject(UserService)
  private eventsService = inject(EventsService)
  private router = inject(Router)

  form!: FormGroup;
  successful:boolean = false
  error:boolean = false

  constructor() {
    this.setForm();
    sessionStorage.clear();
  }

  setForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%+-]+)@(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/)]),
      password: new FormControl('', [Validators.required])
    })
  }

  sendForm() {
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          sessionStorage.setItem("user", JSON.stringify(response));
          this.successful = true;
          this.setForm()
          this.router.navigate(["update"])
          setTimeout(() => {
            this.successful = false;
          },5000)
          this.saveLogs("success", JSON.stringify(response))
        },
        error: (err) => {
          console.log(err);
          this.error = true;
          this.saveLogs("error", JSON.stringify(err.error.message))
        }
      })
    }
  }

  saveLogs(type:string, description:string) {
  
      const data: Event = {
        title: "login",
        description: description,
        typeEvent: type,
        createDate: new Date()
      }
  
      this.eventsService.createEvents(data).subscribe({
        next: (response) => {
          console.log(response); 
        },
        error: (err) => {
          console.log(err);
        } 
      })
    }
  
  get emailField(): any { return this.form.get("email"); }
  get passwordField(): any { return this.form.get("password"); }
}