import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { EventsService } from '../../shared/services/events.service';
import { Event } from '../../shared/interfaces/event.interface';

@Component({
  selector: 'app-update',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {


  private userService = inject(UserService)
  private eventsService = inject(EventsService)
  private router = inject(Router)

  form!: FormGroup;
  successful:boolean = false
  storedUser:any;

  constructor() {
    this.storedUser = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) : null;
    this.setForm()
  }

  setForm() {
    this.form = new FormGroup({
      name: new FormControl(this.storedUser.name, [Validators.required]),
      email: new FormControl(this.storedUser.email, [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%+-]+)@(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/)]),
    })
  }

  sendForm() {
    if (this.form.valid) {
      console.log(this.storedUser);
      
      this.userService.update(this.storedUser._id, this.form.value).subscribe({
        next: (response) => {
          console.log(response); 
          this.successful = true;
          this.setForm()
          setTimeout(() => {
            this.successful = false;
          },5000)
          this.saveLogs("update", JSON.stringify(response))
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
      title: "Update",
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
}
