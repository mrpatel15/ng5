import {Component, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import {LocalStorage} from '@ngx-pwa/local-storage';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {


  user_role: string;
  fa_deadline: string;
  fa_days_left: number;
  deadline: any[];

  commentstr: string;
  commentdate: string;
  trans_id: number;
  userid: string;
  comment_id: number;
  message: string;

  add: Array<boolean> = [];

  expand:Array<boolean> = [];

  data: any;
  did: any [];
  account: any [];
  trans_src: any [];
  exception_category: any [];
  exception_type: any;
  transactions: any[];
  comments: any[];
  comment_transactions: any;
  resources: any;

  isFinancialAnalyst = true;
  isBusinessLead = false;
  isBusinessDirector = false;
  showMsg = false;

  selectedDid;
  selected_GL_ACCOUNT;
  selected_SOURCE;
  selected_EX_CAT;
  selected_EX_TYPE;


  private selectedDataToPost = {};
  modalRef: BsModalRef;

  ngOnInit() {
    this.showDays();
    this.display();
  }

  constructor(private _dataService: DataService, private modalService: BsModalService, protected localStorage: LocalStorage) {
  }


  commentModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }


  showDays() {
    this._dataService.getFsDetails()
        .subscribe((data: any) => {
          this.data = data;
          this.deadline = data.deadline;

          //console.log('this is deadline ',this.data.deadline);

        }, (err) => console.log(err),);
  }

  display() {
    this._dataService.getFsDetails()
        .subscribe((data: any) => {
          this.localStorage.getItem(this.data);
          this.data = data;
          //this.did = data.resources.did;
          this.did = data.resources.did.map((each, index) => {
            return {id: index, name: each};
          });
          // this.account = data.resources.account;
          this.account = data.resources.account.map((each, index) => {
            return {id: index, name: each};
          });

          //this.trans_src = data.resources.trans_src;
          this.trans_src = data.resources.trans_src.map((each, index) => {
            return {id: index, name: each};
          });

          //this.exception_category = data.resources.exception_category;
          this.exception_category = data.resources.exception_category.map((each, index) => {
            return {id: index, name: each};
          });
          this.exception_category.push({id: this.exception_category.length, name: 'No Flag'});

          //this.exception_type = data.resources.exception_type;
          this.exception_type = data.resources.exception_type['Flight'].map((each, index) => {
            return {id: index, name: each};
          });

          this.transactions = data.transactions;
          this.comment_transactions = data.comment_trans;
          this.comments = data.comments;

          //console.log('this is comments trans...' + this.data.comment_trans);
          // console.log('trans', this.transactions);
          // console.log('this is data' + this.data);
        }, (err) => console.log(err),);
  }

  submitFinAnalystData(fa_submit_template: any) {
    this.modalRef = this.modalService.show(fa_submit_template, {class: 'modal-lg'});
   this._dataService.postFsDetails(this.selectedDataToPost)
    // this.isFinancialAnalyst = false;
    // this.isBusinessLead = true;
    // this.isBusinessDirector = false;
  }

  // submitBusiLeadData() {
  //   // this._dataService.postFsDetails(this.selectedDataToPost)
  //   this.isFinancialAnalyst = false;
  //   this.isBusinessLead = false;
  //   this.isBusinessDirector = true;
  // }
  //
  // submitFinDirector() {
  //   // this._dataService.postFsDetails(this.selectedDataToPost)
  //   this.isFinancialAnalyst = false;
  //   this.isBusinessLead = false;
  //   this.isBusinessDirector = false;
  // }

 onSelectData(value, id){
   console.log('selected value', value, id);
   // this.selectedDataToPost[id] = value;
   Object.defineProperty (
    this.selectedDataToPost,
     id, {value: value, writable: true,}
  );
   console.log('Object is ', this.selectedDataToPost);
 }


   onSelect(val, field) {
     console.log('on select called');
     // this.transactions = this.data.transactions;

     if (field === 'did') {
       console.log('val');
       if (val === 'none' || val.length <= 0) {
           this.transactions = this.data.transactions;
       } else {
         let array = val.map(each => this.did[each].name);
         this.transactions = this.data.transactions.filter(x => array.includes(x.did));
       }
     }
     else if (field === 'ac') {
       if (val === 'none' || val.length <= 0) {
           this.transactions = this.data.transactions;
       } else {
         let array = val.map(each => this.account[each].name);
         this.transactions = this.data.transactions.filter(x => array.includes(x.account));
       }
     }
     else if (field === 'so') {
       if (val === 'none' || val.length <= 0) {
           this.transactions = this.data.transactions;
       } else {
         //this.transactions = this.data.transactions.filter(x => x.src_type === val);
         let array = val.map(each => this.trans_src[each].name);
         this.transactions = this.data.transactions.filter(x => array.includes(x.src_type));
       }
     }
     else if (field === 'ec') {
       if (val === 'none' || val.length <= 0) {
           this.transactions = this.data.transactions;
       } else {
         //this.transactions = this.data.transactions.filter(x => x.exception_cat === val);
         let name = val.map(each => this.exception_category[each].name)[0];
         if (name === 'No Flag')
           name = null;
         this.transactions = this.data.transactions.filter(x => name === x.exception_cat);
         if (name !== null)
           this.exception_type = this.data.resources.exception_type[name].map((each, index) => {
             return {id: index, name: each};
           });
         else
           this.exception_type = [];
       }
     }

     else if (field === 'et') {
       if (val === 'none' || val.length <= 0) {
         this.transactions = this.data.transactions;
       } else {
         //this.transactions = this.data.transactions.filter(x => x.exception_type === val);
         let array = val.map(each => this.exception_type[each].name);
         this.transactions = this.data.transactions.filter(x => array.includes(x.exception_type));
       }

     }

     this.expand = [];

  }

  searchMerchat(val) {
    if(val === ''){
      this.transactions = this.data.transactions;
    } else {
      const reg = new RegExp(val, 'i');
      this.transactions = this.data.transactions.filter(x => x.merchant.search(reg) !== -1);
    }
  }


  decline() {
    this.modalRef.hide();
  }

  // comments: Array<any> = [];
  saveComment(comment, transaction_id) {
    const userid = 'test123';
    const nextCommentId = this.data.comments.slice(this.data.comments.length - 1)[0].comment_id + 1;
    const date = Date();
    console.log('Added comment:  ' + comment, transaction_id, nextCommentId);
    const newComment: comments = {
      comment_id: nextCommentId,
      commentdate: date,
      commentstr: comment,
      trans_id: transaction_id,
      userid: userid
    };

    this.showMsg = true;
    this.message = 'Submitted!';
    this.modalRef.hide();

    setTimeout(function () {
      this.showMsg = false;
      console.log(this.showMsg);
    }.bind(this), 4000);


    this._dataService.postNewComment(newComment).subscribe((response) => {
      if (response) {
        localStorage.setItem('trans_id', this.data.transactions);
      }
    });
    // .catch( (error) => {
    //     // handle error
    //       console.log('Error:' + error)
    //   });
  }


  saveProgressModal(saveTemplate: any) {
    this.modalRef = this.modalService.show(saveTemplate, {class: 'modal-lg'});
  }

  logout() {
    this.modalRef.hide();
  }

  goBack() {
    this.modalRef.hide();
  }

  yesBtn() {
    this.modalRef.hide();
  }

  noBtn() {
    this.modalRef.hide();
  }


}


export interface transactions {
    did: number;
    merchant: string;
    trans_status: number;
    amount: number;
    date_: string;
    expense_report_title: string;
    exception_cat: string;
    exception_type: string;
    src_type: string;
    emp_name: string;
}


export interface comments {
    comment_id: number;
    commentdate: string;
    commentstr: string;
    trans_id: number;
    userid: string;
}

export interface deadline {
    user_role: string;
    fa_deadline: string;
    fa_days_left: number;
}

export interface resources {
  did: Array<string>;
  account: Array<string>;
  exception_type: string;
  exception_category: Array<string>;
  trans_src: Array<string>;
}
