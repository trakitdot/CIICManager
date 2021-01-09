import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractFormGroupDirective } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { QuestionBase } from '../../dynamicFormModel/question-base.model';
import { QuestionControlService } from '../../Services/DynamicForm/question-control.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    console.log(this.form);
    
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}