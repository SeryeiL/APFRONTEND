import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn:'root'
})

export class InterceptorService implements HttpInterceptor{
    constructor(private tokenService: TokenService, private router: Router){}

    intercept(
        request: HttpRequest<unknown>, 
        next: HttpHandler
        ): Observable<HttpEvent<unknown>>{
           const token = this.tokenService.getToken();
        if (token) {
            request = request.clone({ 
                setHeaders:{
                    Authorization:`Bearer ${token}`,
        },
    });
}
        console.log("interceptor está corriendo")
        return next.handle(request);
    }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService,  multi: true}];
