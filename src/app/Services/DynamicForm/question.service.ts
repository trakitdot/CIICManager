import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../../dynamicFormModel/question-dropdown.model';
import { QuestionBase } from '../../dynamicFormModel/question-base.model';
import { TextboxQuestion } from '../../dynamicFormModel/question-textbox';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  createForm: any[] = []; 

  //This is a service that provide us with inputs from the database (backend)
  //for now, it is hard coded, 

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Great Work',
        options: [
         
          {key: 'mad',  value: 'mad'},
          {key: 'best',   value: 'best'},
          {key: 'work', value: 'work'}
        ],
        order: 1
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Khuthy',
        required: true,
        order: 2
      }),
      new TextboxQuestion({
        key: 'Lastname',
        label: 'Last name',
        value: 'Boss',
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 4
      }),
      new TextboxQuestion({
        key: 'idNumber',
        label: 'ID number',
        type: 'text',
        order: 1
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}