import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Question from '../../../core/models/question.model';
import TestCheckService from '../shared/test-check.service';

@Component({
  selector: 'question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.scss'],
})
export default class QuestionComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public Question: Question = null;

  @Input()
  public Index: number = 0;

  public get Number(): number {
    return this.Index + 1;
  }

  constructor(private testCheckService: TestCheckService) {}

  ngOnInit(): void {
    this.form = this.testCheckService.getForm(this.Question?.id as number);

    if (!this.form) {
      this.form = new FormGroup({
        Answer: new FormControl(),
      });

      this.testCheckService.addForm(this.form, this.Question);
    }
  }
}
