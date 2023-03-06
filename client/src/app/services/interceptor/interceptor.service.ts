import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const TOKEN = localStorage.getItem('token');
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtcGxveWVlMSIsImVtYWlsIjoiZW1wbG95ZWUxQGdtYWlsLmNvbSIsInJvbGUiOiJlbXBsb3llZSIsImlhdCI6MTY3ODE0NDU4NiwiZXhwIjoxNjc4MTQ2Mzg2fQ.SgEUBppYwRhj-neAvikQkGdwDFD3DnMSEBEne2vUyUg';
    const BEARER_TOKEN = `BEARER ${TOKEN}`;
    return next.handle(req.clone({ setHeaders: { Authorization: BEARER_TOKEN } }));
  }

  constructor() { }
}
