import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, ProductResponse } from '../../../interfaces/product.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductServiceService } from '../../../services/product-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatDialogContent,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{

  public product!: ProductResponse;
  public formProduct!: FormGroup;
  public categories: Category[] = [];

  constructor(private productService: ProductServiceService,
     private form: FormBuilder, 
     public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: ProductResponse,
    private dialog: MatDialog ){ }

  ngOnInit(): void {
      this.initForm();
      this.getCategories();
  }

  public initForm(): void {
    this.formProduct = this.form.group({
      id:[this.data.id],
      name:['', Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required])],
      price:['', Validators.compose([Validators.required])],
      category:[this.data.category]
    });
  }

  public getCategories(): void{
    this.productService.getCategory().subscribe((res)=>{
      this.categories = res;
    })
  }

  public sendForm(): void {
    console.log(this.formProduct.value);
    this.productService.update(this.formProduct.value).subscribe((res) => {
      this.closeModal();
      alert('Registro actualizado con exito !!');
    });
  }

  public closeModal(): void {
    this.dialog.closeAll();
  }

}
