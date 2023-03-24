import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS } from '@angular/material/core';

import* as moment from 'moment';

import { Producto } from 'src/app/Interface/producto';

import { ProductoService } from 'src/app/Service/producto.service';

export const MY_DATE_FORMATS={
  parce:{
    dateInput:'DD/MM/YYYY',
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'

  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers:[{
    provide: MAT_DATE_FORMATS, useValue:MY_DATE_FORMATS
  }]
})

/**
 * Class name: DialogAddEditComponent
 * Class description: Esta clase es un componente que se utiliza 
 *                    para agregar o editar un producto
 * Class date: 23-03-2023
 * Developer: David Alvarado
 * Modification:
 *      date + nameDeveloper + change description
 */
export class DialogAddEditComponent implements OnInit {

  /** 
   * variables que se utiliza para crear un formulario, un título y un botón. 
   *
  */
  formProducto:FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaProductos: Producto[]=[];


  /**
   * The constructor is a function that is called when a new instance of a class is created
   * @param dialogoReferencia - MatDialogRef<DialogAddEditComponent>
   * @param {FormBuilder} fb - FormBuilder - This is the Angular FormBuilder service.
   * @param {MatSnackBar} _snackBar - This is the service that will be used to display the snackbar.
   * @param {ProductoService} _productoService - This is the service that we created earlier.
   * @param {Producto} dataProducto - Producto
   */

  /**
   * Description:
   *    
   *      La función constructora se utiliza para inicializar las propiedades del componente.
   *      e inyectar los servicios que necesita el componente.
   *
   * Args:
   *
   *      {FormBuilder} fb
   *      {MatSnackBar} 
   *      {ProductoService} 
   *      {Producto} dataProducto
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
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _productoService:ProductoService,
    @Inject(MAT_DIALOG_DATA) public dataProducto: Producto
  ){
    this.formProducto = this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      fecha:['',Validators.required],

    })

    this._productoService.getList().subscribe({
      next:(data)=>{
        this.listaProductos = data;
      },error:(e)=>{}
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
   * It takes the form data, creates a new object, and then either adds or updates the object based on
   * whether the dataProducto variable is null or not.
   */
  
  /**
   * Description:
   *
   *      Toma los datos del formulario, crea un nuevo objeto y luego agrega o actualiza 
   *      el objeto en función de si la variable dataProducto es nula o no
   *
   * Args:
   *
   *      No aplica
   *
   * Return:
   *
   *      muestra el producto ya sea creado o editado
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  addEditProducto(){
    console.log(this.formProducto.value)
    const modelo:Producto={
      idProducto:0,
      nombre: this.formProducto.value.nombre,
      descripcion: this.formProducto.value.descripcion,
      fecha: this.formProducto.value.fecha
    }
    if(this.dataProducto == null){

      this._productoService.add(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("El producto ha sido registrado", "ok");
          this.dialogoReferencia.close("Creado");
        },error:(e)=>{
          this.mostrarAlerta("No se puedo registrar el producto", "Error")
      }
      })
    }else{
      this._productoService.update(this.dataProducto.idProducto,modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("El producto ha sido actualizado", "ok");
          this.dialogoReferencia.close("Actualizado");
        },error:(e)=>{
          console.log(e)
          this.mostrarAlerta("No se puedo editar el producto", "Error")
      }
      })
    }

    
}

  /**
   * The ngOnInit() function is a lifecycle hook. Angular calls ngOnInit() shortly after creating a
   * component. It's a good place to put initialization logic
   */

  /**
   * Description:
   *
   *      plasma los valores que se encuentran en dataproducto en la tabla
   *
   * Args:
   *
   *      No aplica
   *
   * Return:
   *
   *      datos que ese encuentan registrados
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  ngOnInit(): void {
    
    if(this.dataProducto){
      this.formProducto.patchValue({
        idPrpducto: this.dataProducto.idProducto,
        nombre: this.dataProducto.nombre,
        descripcion: this.dataProducto.descripcion,
        fecha: this.dataProducto.fecha

      })

      this.tituloAccion = "Editar";
      this.botonAccion  = "Actualizar"
    }

  }

}
