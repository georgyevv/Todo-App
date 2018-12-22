import { ActiveTodosPipe } from './active-todos.pipe';

describe('ActiveTodosPipe', () => {
  it('create an instance', () => {
    const pipe = new ActiveTodosPipe();
    expect(pipe).toBeTruthy();
  });
});
