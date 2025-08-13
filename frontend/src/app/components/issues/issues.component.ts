import { Component } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/app.model';

@Component({
  selector: 'app-issues',
  imports: [FormsModule,CommonModule],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css'
})
export class IssuesComponent {
   message: string = '';

  constructor(private reportService: IssuesService, private activeModal: NgbActiveOffcanvas, private offcanvas: NgbActiveOffcanvas) {}

 submit() {
    if (!this.message.trim()) return;

    const issue: Issue = {
      message: this.message.trim(),
      date: new Date().toISOString()
    };

    this.reportService.sendIssue(issue).subscribe(() => {
      this.offcanvas.dismiss();
    });
  }

  close() {
    this.offcanvas.dismiss();
  }

}
