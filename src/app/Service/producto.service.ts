import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environments';
import {Observable} from 'rxjs';
import { Producto } from '../Interface/producto';

@Injectable({
  providedIn: 'root'
})


/**
 * Class name: ProductoService
 * Class description: Servicio que utiliza HttpClient para realizar solicitudes HTTP al backend
 * Class date: 23-03-2023
 * Developer: David Alvarado
 * Modification:
 *      date + nameDeveloper + change description
 */
export class ProductoService {

  
  // variable que almacena el punto final del backend
  private endpoint:string = environment.endPoint;

  // esta variable almacena el punto final y se le concatena la ruta base ubicada en backend
  private apiUrl:string = this.endpoint + "api/product/"

  constructor(private http:HttpClient) { }

/**
   * Description:
   *
   *      Funcion para mostrar todos los elementos de la coleccion
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
  getList():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.apiUrl}findAll`);
  }

  
/**
   * Description:
   *
   *      Funcion para agregar Productos
   *
   * Args:
   *
   *      {Producto} modelo
   *
   * Return:
   *
   *      observable de tipo Producto
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
   */
  add(modelo:Producto):Observable<Producto>{
    return this.http.post<Producto>(`${this.apiUrl}save`, modelo);
  }


  /**
   * Description:
   *
   *      Funcion para actualizar los Productos que se encuentran registrados
   *
   * Args:
   *      
   *      {number} idProducto
   *      {Producto} modelo
   *
   * Return:
   *
   *      observable de tipo Producto
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  update(idProducto:number, modelo:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.apiUrl}update/${idProducto}`, modelo);
  }

  /**
   * Description:
   *
   *      Funcion para eliminar Productos
   *
   * Args:
   *      
   *      {number} idProducto
   *
   * Return:
   *
   *      Observable<void>
   *
   * method date: 23-03-2023
   * Developer: David Alvarado
   * Modification:
   *      date + nameDeveloper + change description
  */
  delete(idProducto:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete/${idProducto}`);
  }
}
