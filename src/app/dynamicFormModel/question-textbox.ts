import { QuestionBase } from './question-base.model';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
}