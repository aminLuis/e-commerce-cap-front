import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { OrderItem } from '../interfaces/order.interface';
import { environment } from '../../enviroments/enviroments';

const API_ORDER_ITEM = environment.API_ORDER_ITEM;

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  
  private refresh = new Subject<void>();

  get reload(){
    return this.refresh;
  }
  constructor(private http: HttpClient) { }

  public getAll(): Observable<OrderItem[]> {
    const url = API_ORDER_ITEM + "/getAll"
    return this.http.get<OrderItem[]>(url)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

  public save(data:OrderItem): Observable<OrderItem> {
    const url = API_ORDER_ITEM + "/save";
    return this.http.post<OrderItem>(url,data)
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

}
