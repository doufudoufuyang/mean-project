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
    // const TOKEN = localStorage.getItem('token');
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtcGxveWVlMSIsImVtYWlsIjoiZW1wbG95ZWUxQGdtYWlsLmNvbSIsInJvbGUiOiJlbXBsb3llZSIsImlhdCI6MTY3ODIyMTI5NiwiZXhwIjoxNjc4MjI4NDk2fQ.MX--ISQ1U2whrnHIUTf2WbrJ0Wc-NmLVr6o5gVupXNQ';
    const BEARER_TOKEN = `BEARER ${TOKEN}`;
    return next.handle(req.clone({ setHeaders: { Authorization: BEARER_TOKEN } }));
  }

  constructor() { }
}
