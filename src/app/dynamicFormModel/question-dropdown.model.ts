import { QuestionBase } from './question-base.model';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
}