import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable()
export class ProductoService {
  baseUrl = environment.API_URL_TODOS;
  addUrl = environment.API_URL_TODOS_ADD;
  editUrl = environment.API_URL_TODOS_EDIT;
  deleteUrl = environment.API_URL_TODOS_DELETE;
  dialogData: any;
  dataChange: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  environment: any;
  productoList: Producto[] = [];
  constructor(private httpClient: HttpClient) { }

  get data(): Producto[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  public getData = ( ) => {
    return this.httpClient.get(this.baseUrl);
  }
  
  get(): Observable<Producto[]> {
    
    return this.httpClient.get<Producto[]>('http://localhost:8080/producto/get');
   }
  getAllProducto(): void {
    this.httpClient.get<Producto[]>(this.baseUrl).subscribe(data => {
        //this.dataChange.next(data);
        this.productoList = data;
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!' + "\n" + error.name + ' ' + error.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })

      });
  }
   // ADD, POST METHOD
   addItem(producto: Producto): void {
    this.httpClient.post(this.addUrl, producto).subscribe(data => {
      this.dialogData = producto;
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + "\n" + err.message.toString,
          footer: '<a href="">Why do I have this issue?</a>'
        })
    });
   }

    // UPDATE, PUT METHOD
     updateItem(producto: Producto): void {
    this.httpClient.post(this.editUrl, producto).subscribe(data => {
        this.dialogData = producto;
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + "\n" + err.message.toString,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.deleteUrl + id).subscribe(data => {
      //console.log(data['']);
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + "\n" + err.message.toString,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }
}
