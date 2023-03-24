import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Producto } from './Interface/producto';
import { ProductoService } from './Service/producto.service';

import {MatDialog} from '@angular/material/dialog';

import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Class name: AppComponent
 * Class description: contiene diferentes funciones en conjunto del service
 *                    de peroducto que contiene metodos http
 * Class date: 23-03-2023
 * Developer: David Alvarado
 * Modification:
 *      date + nameDeveloper + change description
 */
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['idProducto', 'Nombre', 'Descripcion', 'Fecha', 'Acciones'];
  dataSource = new MatTableDataSource<Producto>();

  constructor(private _productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ){
    
  }

  /**
   * ejecuta este metodo al momento de inicializar el servidor
   */
  ngOnInit(): void {
      this.mostrarProductos();
  }

  /**
   * obtiene paginacion para inclir en la vista, traida de material 
  */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * establece la paginacion a los datos que estan en la tabla
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * funcion para filtrar los datos 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Description:
   *
   *      esta funcion llama la funcion getList() que se encuentra en el service de Producto
   *
   * Args:
   *
   *      No aplica
   *
   * Return:
   *
   *      Observable de una matriz de objetos Producto
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  mostrarProductos(){
    this._productoService.getList().subscribe({
      next:(dataResponse) =>{
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e) =>{}
    })
  }

  /**
   * Description:
   *
   *      abre un cuadro de diálogo donde se podra agregar productos y una vez cerrado, se suscribe a
   *      el resultado del cuadro de diálogo. 
   *
   * Args:
   *
   *      No aplica
   *
   * Return:
   *
   *      Si el resultado es "Creado", entonces
   *      la función mostrarProductos() es llamada
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  dialogoNuevoProducto() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="Creado"){
        this.mostrarProductos();
      }
    })
  }

  /**
   * Description:
   *
   *      abre un cuadro de diálogo donde se editaran los campos y una vez cerrado, se suscribe a
   *      el resultado del cuadro de diálogo. 
   *
   * Args:
   *
   *      {Producto} dataProducto
   *
   * Return:
   *
   *      Si el resultado es "Actualizado", entonces
   *      la función mostrarProductos() es llamada
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  
  dialogoEditarProducto(dataProducto:Producto) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data:dataProducto
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="Actualizado"){
        this.mostrarProductos();
      }
    })
  }

  /**
   * Description:
   *
   *      muestra una alerta donde se le dan las indicaciones
   *
   * Args:
   *
   *      {string} msg
   *      {string} accion
   *
   * Return:
   *
   *      alerta 
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  /**
   * Description:
   *
   *      esta funcion abre cuadro de dialogo de confirmacion para el eliminado
   * Args:
   *
   *      {Producto} dataProducto
   *
   * Return:
   *
   *      cuadro de dialogo confirmacion
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  dialogoEliminarProducto(dataProducto:Producto){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data:dataProducto
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="eliminar"){
        this._productoService.delete(dataProducto.idProducto).subscribe({
          next:(data) =>{
            this.mostrarAlerta("Producto eliminado", "OK");
            this.mostrarProductos();
          },error:(e) =>{}
        });
      }
    })
  }

}
