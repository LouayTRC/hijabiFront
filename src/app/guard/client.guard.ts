import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const clientGuard: CanActivateFn = async (route, state) => {
  let response = false;
  const token = sessionStorage.getItem("Token");
  const authService = inject(AuthService);
  const roleService = inject(RoleService);
  const router = inject(Router);

  if (token) {
    try {
      const res = await authService.verifyToken(token).toPromise();
      console.log("res", res);
      if (res.login) {
        const role = await roleService.getRoleById(res.data.user_Role).toPromise();
        if (role && role.name === "Client") {
          response = true;
        } else {
          response = false;
          router.navigate(['/client']);
        }
      } else {
        response = false;
        router.navigate(['/client']);
      }
    } catch (error) {
      response = false;
      router.navigate(['/client']);
    }
  } else {
    response = false;
    router.navigate(['/client']);
  }

  console.log("response", response);
  return response;
};
