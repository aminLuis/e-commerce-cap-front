import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem } from '../../../interfaces/order.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderServiceService } from '../../../services/order-service.service';

@Component({
  selector: 'app-generate-order',
  standalone: true,
  imports: [MatDialogContent,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './generate-order.component.html',
  styleUrl: './generate-order.component.scss'
})
export class GenerateOrderComponent implements OnInit{

  public formOrder!: FormGroup;

  constructor(public dialogRef: MatDialogRef<GenerateOrderComponent>,
   @Inject(MAT_DIALOG_DATA) 
   public data: OrderItem,
   private dialog: MatDialog,
   private form: FormBuilder,
   private orderService: OrderServiceService
  ){ console.log('Data order: ',data) }

   ngOnInit(): void {
       this.initForm();
   }

   public initForm(): void {
    this.formOrder = this.form.group({
      order:[this.data.order.id],
      product:[this.data.product.name],
      quantity:['', Validators.compose([Validators.required])],
      price:['', Validators.compose([Validators.required])]
    });
   }

   public sendForm(): void {
    this.formOrder.value['product'] = this.data.product;
    this.formOrder.value['order'] = this.data.order;
    console.log(this.formOrder.value);
    this.orderService.save(this.formOrder.value).subscribe((res) => {
      console.log('ressss', res);
    });
   }


}
