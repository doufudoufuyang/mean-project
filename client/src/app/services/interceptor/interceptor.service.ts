import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/register') || req.url.includes('/login')) {
      return next.handle(req);
    }
    // const TOKEN = localStorage.getItem('JWT_TOKEN');
    const TOKEN = 'getAllProfiles';
    const BEARER_TOKEN = `BEARER ${TOKEN}`;
    return next.handle(req.clone({ setHeaders: { Authorization: BEARER_TOKEN } }));
  }

  constructor() { }
}
