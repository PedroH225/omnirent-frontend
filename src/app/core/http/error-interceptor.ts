import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { ApiException } from "../../../shared/models/api-exception";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const router = inject(Router);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const apiError = error.error as ApiException;

            switch (apiError?.errorCode) {
                case "INVALID_TOKEN":
                    router.navigate(['/login']);
                    localStorage.removeItem("token");
                    break;
                default:
                    break;
            }
            return throwError(() => error);
        })
    );
};