import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductResponse } from '../../../interfaces/product.interface';
import { InventoryServiceService } from '../../../services/inventory-service.service';

@Component({
  selector: 'app-create-inventory',
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
    MatSelectModule],
  templateUrl: './create-inventory.component.html',
  styleUrl: './create-inventory.component.scss'
})
export class CreateInventoryComponent implements OnInit{

  public formInventory!: FormGroup;

  constructor(
    private form: FormBuilder, 
    public dialogRef: MatDialogRef<CreateInventoryComponent>,
   @Inject(MAT_DIALOG_DATA) 
   public data: ProductResponse,
   private dialog: MatDialog,
   private inventoryService: InventoryServiceService
  ){ console.log('Data para inventario producto: ',data) }

  ngOnInit(): void {
      this.initForm();
  }

  public initForm(): void {
    this.formInventory = this.form.group({
      product:[this.data.name],
      quantity:['',Validators.compose([Validators.required])]
    });
  }

  public sendForm(): void {
    if(this.formInventory.valid){
      this.formInventory.value['product'] = this.data;
      this.inventoryService.save(this.formInventory.value).subscribe((res) => {
        this.closeDialog();
        alert('Registro creado con exito !!');
      });
    }
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

}
