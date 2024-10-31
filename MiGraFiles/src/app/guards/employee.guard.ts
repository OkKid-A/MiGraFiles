import { CanActivateFn } from '@angular/router';
import {LocalVariableNames} from '../shared/local-variable-names';
import {Roles} from '../shared/roles';

export const employeeGuard: CanActivateFn = (route, state) => {
  const rol = localStorage.getItem(LocalVariableNames.LOCAL_ROLE);
  return !!(rol && rol == Roles.EMPLEADO);
};
