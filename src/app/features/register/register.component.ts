import { Component, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { Event } from '../../shared/interfaces/event.interface';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private userService = inject(UserService)
  private eventsService = inject(EventsService)
  private router = inject(Router)

  form!: FormGroup;
  successful:boolean = false

  constructor() {
    this.setForm()
  }

  setForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%+-]+)@(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/)]),
      password: new FormControl('', [Validators.required])
    })
  }

  sendForm() {
    if (this.form.valid) {
      this.userService.register(this.form.value).subscribe({
        next: (response) => {
          console.log(response); 
          this.successful = true;
          this.setForm()
          this.router.navigate(["login"])
          setTimeout(() => {
            this.successful = false;
          },5000)
          this.saveLogs("success", JSON.stringify(response))
        },
        error: (err) => {
          console.log(err);
          this.saveLogs("error", JSON.stringify(err))
        }
      })
    }
  }

  saveLogs(type:string, description:string) {

    const data: Event = {
      title: "register",
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

  get nameField(): any { return this.form.get("name"); }
  get emailField(): any { return this.form.get("email"); }
  get passwordField(): any { return this.form.get("password"); }
}