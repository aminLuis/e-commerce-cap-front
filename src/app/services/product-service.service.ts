import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Category, ProductRequest, ProductResponse } from '../interfaces/product.interface';

const API_PRODUCT = environment.API_PRODUCT;
const API_CATEGORY = environment.API_CATEGORY;

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private refresh = new Subject<void>();

  get reload(){
    return this.refresh;
  }
  constructor(private http:HttpClient) { }

  public getAll(): Observable<ProductResponse[]> {
    const url = API_PRODUCT+"/getAll"
    return this.http.get<ProductResponse[]>(url)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

  public save(product: ProductRequest): Observable<ProductResponse> {
    const url = API_PRODUCT+"/save"
    return this.http.post<ProductResponse>(url, product)
    .pipe(
      tap(()=>{
        this.refresh.next();
      }),
      catchError(error=>{
        console.log(error);
        return throwError(error);
      })
    );
  }

  public getCategory(): Observable<Category[]> {
    const url = API_CATEGORY + "/getAll";
    return this.http.get<Category[]>(url)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

}
