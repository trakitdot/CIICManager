import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { QuestionService } from '../Services/DynamicForm/question.service';
import { QuestionBase } from '../dynamicFormModel/question-base.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  user: any;

  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    private storage: Storage,
    public toastCtrl: ToastController,
     questionService: QuestionService
  ) { 
    this.checkUser();

    this.questions$ = questionService.getQuestions();
  }

 
  
  async checkUser() {
    await this.storage.get('session_storage_local').then( res => {
      if(res) {
        this.user = res
      alert(JSON.stringify(res))
      }else {
        console.log('not set');
        
      }
      
    })
  }
}