import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import {ApiService} from 'src/app/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  archive: FormGroup;
  id:string;
  isNew:boolean=true;
  isEdit:boolean=false;
  products: any = [];
  title = 'FateGO-Front';
  displayedColumns: string[] = ['id','name','class', 'deck', 'np', 'editar', 'eliminar'];
  dataSource:any = [];
  constructor(private form: FormBuilder,private api: ApiService){
    this.getServants();
    this.archive = this.form.group({
      Nombre: [''],
      Clase: [''],
      Deck: [''],
      NoblePhantasm: ['']
    });
  }

  getServants(){
    this.api.listServants().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response)
    })
  }

  addProuct(){
    this.api.createServant(this.archive.value).subscribe(response=>{
      console.log("Se ha creado el servant: " + response)
      this.dataSource.data.push(response)
    }, error =>{
      console.log(error)
    })
    //this.getServants();
    location.reload();
  }

  editProduct(item:any){
    this.isNew=false;
    this.isEdit=true;

    this.id=item.id
    this.archive.get('Nombre').setValue(item.Nombre);
    this.archive.get('Clase').setValue(item.Clase);
    this.archive.get('Deck').setValue(item.Deck);
    this.archive.get('NoblePhantasm').setValue(item.NoblePhantasm);
    console.log("id a editar: " + this.id);
  }

  updateProduct(){
    this.isNew= true;
    this.isEdit= false;
    this.api.updateServant(this.archive.value,this.id).subscribe(response=>{
      console.log("Servant actualizado" + response.data)
      const index = this.products.findIndex(x => x.id== this.id);
      this.products[index]= response;
    },error=>{
      console.log(error)
    })

    this.getServants();
    location.reload();
  }

  ngOnInit() {

  }

  deleteProduct(iD){
    this.api.deleteServant(iD).subscribe(response =>{
      const index = this.dataSource.data.findIndex(x=>x.id == iD);
      this.dataSource.data.splice(index,1);
    }, error =>{
      console.log(error)
    })

    //this.getServants();
    location.reload();
  }

  

}

