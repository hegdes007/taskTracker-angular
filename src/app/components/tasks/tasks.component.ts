import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  nodue!: string;
  completedCount!: number;
  public overDueCount = 0;

  constructor(
    // private taskService: TaskService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.tasks = JSON.parse(this.cookieService.get('tasks'));
    Number.isNaN(parseInt(this.cookieService.get('completedTasks')))
      ? (this.completedCount = 0)
      : (this.completedCount = parseInt(
          this.cookieService.get('completedTasks')
        ));
    this.nodue = 'No due tasks';
    this.dueTasks();
    console.log('Hey you! I can see you here😏');
  }
  delteTask(task: Task) {
    // this.taskService
    //   .deleteTask(task)
    //   .subscribe(
    //     () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
    //   );
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.cookieService.set('tasks', JSON.stringify(this.tasks));
  }
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.tasks.map((t) => {
      if (task.id == t.id) {
        t = task;
      }
    });
    this.cookieService.set('tasks', JSON.stringify(this.tasks));
    // this.taskService.updateReminder(task).subscribe();
  }
  addTask(task: Task) {
    // this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
    task.id = Math.floor(Math.random() * 10000) + 1;
    this.tasks.push(task);
    this.cookieService.set('tasks', JSON.stringify(this.tasks));
  }

  completeTask(task: Task) {
    document.getElementById(task.id!.toString())!.style.textDecoration =
      'line-through';
    this.completedCount = this.completedCount + 1;
    this.cookieService.set('completedTasks', this.completedCount.toString());
    setTimeout(() => {
      this.delteTask(task);
      location.reload();
    }, 3000);
  }

  dueTasks() {
    for (let i = 0; i < this.tasks.length; i++) {
      if (new Date(this.tasks[i].day) < new Date()) {
        this.overDueCount = this.overDueCount + 1;
      }
    }
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
