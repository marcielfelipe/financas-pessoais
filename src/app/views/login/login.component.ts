import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroupLogin: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.formGroupLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      senha: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.formGroupLogin.value)
    if(this.formGroupLogin.valid){
      const model = this.formGroupLogin.value
      this.authService.login(model).then((res)=>{
        this.cookieService.set('finance_token',res.token)
        this.storageService.save('finance_usuario',res.usuario)
        this.router.navigateByUrl('home')
      })
    }
  }
}
