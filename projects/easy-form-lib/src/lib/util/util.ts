import {EtUISchema} from '../schema/ui.schema';

export function debug(ui: EtUISchema, ...args: any[]) {
  if (ui.debug) {
    // tslint:disable-next-line:no-console
    console.warn(...args);
  }
}

export function isBlank(o: any) {
  return o == null;
}
