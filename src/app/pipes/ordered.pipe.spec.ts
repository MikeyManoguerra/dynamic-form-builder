import { OrderedPipe } from './ordered.pipe';

describe('OrderedPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderedPipe();
    expect(pipe).toBeTruthy();
  });
});
