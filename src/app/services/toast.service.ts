import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { selectNotifications } from '../store/settings.selectors';
import { filter, finalize, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private toastr: ToastrService,
    private store: Store,
  ) { }

  notify(message: string) {
    this.store.select(selectNotifications).pipe(
      take(1),
      filter(Boolean),
      tap(() => this.toastr.info(message)),
    ).subscribe();
  }
}
