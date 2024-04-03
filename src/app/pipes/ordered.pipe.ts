import { Pipe, PipeTransform } from '@angular/core';

// this is a little redundant now that we order qs on save...

@Pipe({
  name: 'ordered',
  standalone: true
})
export class OrderedPipe implements PipeTransform {
  transform<T extends { order: number }>(value: T[], ...args: unknown[]): T[] {
    return value.sort((a, b) => a.order - b.order);
  }
}
