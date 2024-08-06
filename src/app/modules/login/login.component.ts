import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
      MatFormFieldModule,
      MatInputModule, 
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private form:FormBuilder){}

  public formLogin!: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
   this.initForm();
  }

  public initForm():void {
    this.formLogin = this.form.group({
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required])]
    });
  }

  public sendFormLogin():void {
    console.log(this.formLogin.value);
  }

}
