import { Component, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../interfaces/product.interface';
import { ProductServiceService } from '../../../services/product-service.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [MatDialogContent, 
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {

  public categories: Category[] = [];
  public formProduct!: FormGroup;
  public subscription: any;

  constructor(private form: FormBuilder, private productService: ProductServiceService){}

  ngOnInit(): void {
      this.initForm();
      this.getCategories();
      this.subscription = this.productService.reload.subscribe(()=>{
        this.getCategories();
      });
  }

  public initForm(): void {
    this.formProduct = this.form.group({
      name:['', Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required])],
      price:['', Validators.compose([Validators.required])],
      category:['', Validators.compose([Validators.required])]
    });
  }

  public getCategories(): void{
    this.productService.getCategory().subscribe((res)=>{
      this.categories = res;
      console.log(this.categories);
    })
  }

  public sendFormProduct(): void {
    if(this.formProduct.valid) {
      this.productService.save(this.formProduct.value).subscribe((res) => {
        console.log(res);
      })
    }
    console.log(this.formProduct.value);
  }

}
