import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onCompleteTask: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  public isChecked = false;
  constructor() {}

  ngOnInit(): void {}
  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
  onComplete(task: Task) {
    this.onCompleteTask.emit(task);
  }
}
