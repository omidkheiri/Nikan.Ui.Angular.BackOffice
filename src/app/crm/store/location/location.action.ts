import { createAction, props } from '@ngrx/store';
import { Location } from '../../model/location.model';

export const setLocationList = createAction(
  '[LocationList Page] get Locations',
  props<{ payload: any }>()
);

export const loadLocations = createAction(
  '[Locations API] load Locations',
  props<{ payload: string }>()
);
// export const retrievedBookList = createAction(
//     '[Book List/API] Retrieve Books Success',
//     props<{ books: ReadonlyArray<Location> }>()
//   );
