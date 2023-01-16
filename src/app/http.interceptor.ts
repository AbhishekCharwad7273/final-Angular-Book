import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { retry, catchError, finalize, tap } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { LoginService } from "./services/login.service";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private user: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.user.token ) {
      let modReq:any
      if(req.url=="http://localhost:9091/api/v1/digitalbooks/books"){
        modReq=req;
      }
      else{
       modReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.user.token}`
        }
      });
    }

      return next.handle(modReq).pipe(
        catchError(response => {
          if (response.status === 401) {
            alert(response.error.errorMessage)
            return throwError(() => new Error(response));
          }
          alert(response.error.errorMessage)
          return throwError(() => new Error(response));
        })
      );
    }
    return next.handle(req);
  }
}
