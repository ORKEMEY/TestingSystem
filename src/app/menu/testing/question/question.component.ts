import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Question from '../../../core/models/question.model';
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
    this.form = this.testCheckService.getForm(this.Question?.id as number);

    if (!this.form) {
      this.form = new FormGroup({
        Answer: new FormControl(),
      });

      this.testCheckService.addForm(this.form, this.Question);
    }
  }
}
