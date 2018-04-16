import {Component, OnInit, VERSION} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { DataService } from '../data.service';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
//  animations: [
//    trigger('goals', [
//      transition('* => *', [
//        query(':enter', style({ opacity: 0}), {optional: true}),
//        query(':enter', stagger('300ms', [
//         animate('.6s ease-in', keyframes([
//            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0}),
//              style({ opacity: .5, transform: 'translateY(-35%)', offset: .3}),
//              style({ opacity: 1, transform: 'translateY(0)', offset: 1})
//          ]))
//        ]), {optional: true}), // number elment of dom , delay when dom element each imply
//         query(':leave', stagger('300ms', [
//         animate('.6s ease-in', keyframes([
//            style({ opacity: 1, transform: 'translateY(0)', offset: 0}),
//              style({ opacity: .5, transform: 'translateY(35%)', offset: .3}),
//              style({ opacity: 0, transform: 'translateY(-75%)', offset: 1})
//          ]))
//        ]), {optional: true})
//      ])
//    ])
//   ]
})

export class HomeComponent {
  
 
  
  fsData = [{ value: "DID",id:"123", amount:"$100", merchant:"United", traveler:"John", Exception_Category:"Hotel", Exception_Type:"Unusual City"},
              { value: "Exception Type",id:"12", amount:"$120", merchant:"Amrican", traveler:"Dev", Exp_report_title:"test"},
              { value: "Source",id:"23", amount:"$150", merchant:"Southwest", traveler:"Kris"},
              { value: "Exception Categary",id:"1233", amount:"$200", merchant:"Spirit", traveler:"lilly",Exception_Category:"Flight", Exception_Type:"Fair Above"},
              { value: "DID",id:"13", amount: "$300", merchant:"Alaska", traveler:"Jimmy"},
              { value: "GL Account",id:"1", amount: "$400", merchant:"Virgin", traveler:"Michael"},
              { value: "Exception Type",id:"34", amount: "$500", merchant:"Air India",traveler:"Stuart", Exception_Category:"Car", Exception_Type:"Above Average"},
              { value: "Exception Categary",id:"56", amount: "$670", merchant:"Jet Airways", traveler:"Patel"},
              { value: "DID",id:"13", amount: "$800", merchant:"Canada Air", traveler:"Mike"},
              { value: "Source",id:"123", amount: "$570", merchant:"Etihad", traveler:"Rita"},
              { value: "GL Account",id:"113", amount: "$270", merchant:"Emirates", traveler:"Asley", Exception_Category:"Hotel", Exception_Type:"Less than 2 weeks"}]
  
  options =['DID', 'GL Account', 'Source', 'Exception Categary', 'Exception Type']
  
  optionTest =['Travel Meal', 'Flight-Fare Above', 'No Flag', 'Associate Meal']
  
  selected;
  
  selected_DID;
  selected_GL_ACCOUNT;
  selected_SOURCE;
  selected_EX_CAT;
  selected_EX_TYPE;
  
  selectedData;
  
  
  
  constructor(){
    //this.selectedData = this.fsData;
    this.selected_DID = this.fsData;
    this.selected_GL_ACCOUNT = this.fsData;
    this.selected_SOURCE = this.fsData;
    this.selected_EX_CAT = this.fsData;
    this.selected_EX_TYPE = this.fsData;
  }
  
  onSelect(val){
    console.log(val);
    this.selectedData = this.fsData.filter(x => x.value == val)
  }
  

}



//export class HomeComponent implements OnInit {
//
//  itemCount: number;
//  addBtnText: string = 'Add Item';
//  goalText: string;
//  goals = [];
//  
//  
//
//  constructor(private _data: DataService) {}
//
//  ngOnInit() {
//    this._data.goal.subscribe(res => this.goals = res);
//    this.itemCount = this.goals.length;
//    this._data.changeGoal(this.goals);
//  }
//
//
//  addItem() {
//    this.goals.push(this.goalText);
//    this.goalText = '';
//    this.itemCount = this.goals.length;
//    this._data.changeGoal(this.goals);
//
//  }
//
////  deleteItem() {
////    this.goals.splice(this.goals.indexOf(this.goalText), 1);
////    this.goalText = '';
////    this.itemCount = this.goals.length;
////  }
//
//  removeItem(i) {
//    this.goals.splice(i, 1);
//    this.goalText = '';
//    this.itemCount = this.goals.length;
//     this._data.changeGoal(this.goals);
//  }
//
//
//}
