import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import Question from '../../../core/models/question.model';
import VariantOfAnswer from '../../../core/models/variant-of-answer.model';
import AnswerFormControl from '../shared/answer-form-control';
import TestCheckService from '../shared/test-check.service';

@Component({
  selector: 'question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
})
export default class QuestionComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public Question: Question = null;

  private index: number = 0;

  @Input()
  public set Index(val: number) {
    this.index = val;
  }

  public get Number(): number {
    return this.index + 1;
  }

  constructor(private testCheckService: TestCheckService) {}

  ngOnInit(): void {
    const formControls: AnswerFormControl[] = [];

    this.form = this.testCheckService.getForm(this.Question?.id as number);

    if (!this.form) {
      if (
        this.Question?.questionType.name === 'Single Choise' ||
        this.Question?.questionType?.name === 'True / False'
      ) {
        this.Question?.answers?.forEach((answer) => {
          const control = this.createControl(false, answer);
          formControls.push(control);
        });
      } else {
        const answer = this.Question?.answers?.[0];
        const control = this.createControl('', answer);
        formControls.push(control);
      }

      this.form = new FormGroup({
        Answers: new FormArray(formControls),
      });

      this.testCheckService.addForm(this.form, this.Question?.id as number);
    }
  }

  private createControl(val: any, answer: VariantOfAnswer) {
    const control = new AnswerFormControl(val);
    control.AnswerId = answer.id as number;
    control.AnswerType = this.Question?.questionType?.name as string;
    return control;
  }
}
