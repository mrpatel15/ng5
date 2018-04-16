import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; // Share data between component

@Injectable()
export class DataService {
  private goals = new BehaviorSubject<any>(['The intial goal', 'Another silly life goal']);
  goal = this.goals.asObservable();
  constructor() { }
  changeGoal(goal) {
    this.goals.next(goal);
  }

}
