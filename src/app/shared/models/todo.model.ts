export class TodoModel {
  public id: string;
  public title: string;
  public date: any;
  public order: number;
  public priority: string;
  public isCompleted: boolean;
  public isDeleted: boolean;
  public isEditMode: boolean;

  constructor(title?: string, date?: any, isCompleted?: boolean) {
      this.title = title;
      this.date = date;
      this.priority = 'black';
      this.isCompleted = isCompleted ? isCompleted : false;
      this.isEditMode = false;
      this.isDeleted = false;
  }
}
