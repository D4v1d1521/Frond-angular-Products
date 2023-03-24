import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Producto } from 'src/app/Interface/producto';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
/**
 * Class name: DialogDeleteComponent
 * Class description: Esta clase es un componente que se utiliza para 
 *                    mostrar un cuadro de diálogo que pregunta al usuario 
 *                    si desea eliminar un producto
 * Class date: 23-03-2023
 * Developer: David Alvarado
 * Modification:
 *      date + nameDeveloper + change description
 */
export class DialogDeleteComponent implements OnInit {

  /**
   * The constructor function is used to initialize the class
   * @param dialogoReferencia - MatDialogRef<DialogDeleteComponent>
   * @param {Producto} dataProducto - Producto
   */

  /**
   * Description:
   *
   *      Constructor para inicializar la clase
   *
   * Args:
   *
   *      {Producto} dataProducto
   *      {MatDialogRef<DialogDeleteComponent>} dialogoReferencia
   *
   * Return:
   *
   *      No aplica
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  constructor(
    private dialogoReferencia: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataProducto: Producto
  ){

  }

  ngOnInit(): void {
      
  }

  /**
   * The function above is called when the user clicks the "Delete" button in the dialog box
   */

  /**
   * Description:
   *
   *       cuando el usuario hace clic en el botón "Eliminar" se hace llamado de esta funcion
   *       la cual confirma la eliminacion de un producto
   *
   * Args:
   *
   *      {Producto} dataProducto
   *      {MatDialogRef<DialogDeleteComponent>} dialogoReferencia
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
  confirmarEliminar(){
    if(this.dataProducto){
      this.dialogoReferencia.close("eliminar")
    }
  }

}
