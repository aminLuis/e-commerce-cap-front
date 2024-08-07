import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './modules/product/product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent,
    DashboardComponent,
    ProductComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-commerce';

  public sesion: boolean = false;

  receivedData: string = 'false';

  receiveData(data: string) {
    this.receivedData = data;
    if(data=='true') {
      this.sesion = true;
    }
  }
}
