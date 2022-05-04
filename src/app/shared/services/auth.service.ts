import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

interface dataLogin{
  email: string
  senha: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private storageService: StorageService,
    private router: Router
  ) { }

  login(inBody:dataLogin): Promise<any>{
    return this.http.post(`${environment.API_URL}/`, inBody).toPromise()
  }
  logout(): void{
    this.cookieService.delete('finance_token')
    this.storageService.clear()
    this.router.navigateByUrl('/')
  }
}
