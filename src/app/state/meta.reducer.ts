import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('state');

      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch (e) {
          console.log('Could not parsestored state');
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
}