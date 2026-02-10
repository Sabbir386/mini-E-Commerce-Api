import { Router } from 'express';
import { UserRoutes } from '../User/user.route';
import { AdminRoutes } from '../Admin/admin.route';
import { AuthRoutes } from '../Auth/auth.route';
import { NormalUserRoutes } from '../NormalUser/normalUser.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/normalUsers',
    route: NormalUserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },



];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
