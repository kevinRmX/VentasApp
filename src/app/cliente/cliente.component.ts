import { Component, OnInit } from '@angular/core';
import { ApiClienteService } from '../services/api-cliente.service';
import { Response } from '../models/response';
import { MatDialog } from '@angular/material/dialog';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { DialogRef } from '@angular/cdk/dialog';
import { cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public lst: any[0];
  public columnas:string[] = ['id', 'nombre', 'actions'];
  readonly width: string = '300px';
  constructor(
    private apiCliente: ApiClienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    
    //apiCliente.getClientes().subscribe( response =>{
      //console.log(response);
   // })
   }
   
  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(){
    this.apiCliente.getClientes().subscribe( response => {
      this.lst = response.data;
    });
  }

  openAdd(){
    const DialogRef = this.dialog.open(DialogClienteComponent,{
      width: this.width
    });
    DialogRef.afterClosed().subscribe(result =>{
      this.getCliente();
    });
    console.log('add');
  }

  openEdit(cliente: cliente){
    const DialogRef = this.dialog.open(DialogClienteComponent,{
      width: this.width,
      data: cliente
    });
    DialogRef.afterClosed().subscribe(result =>{
      this.getCliente();
    });
    console.log('edit');

  }
  delete(cliente: cliente){
    const DialogRef = this.dialog.open(DialogDeleteComponent,{
      width: this.width
    });
    DialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apiCliente.delete(cliente.id).subscribe(response =>{
          if(response.exito == 1){
            this.snackBar.open('Cliente elminado con éxito','',{
              duration: 2000
            })
            this.getCliente();
          }
        })
      }
    });
    console.log('delete');

  }

}
