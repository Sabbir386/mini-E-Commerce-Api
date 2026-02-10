import { Router } from 'express';
import { UserRoutes } from '../User/user.route';
import { AuthRoutes } from '../Auth/auth.route';
import { ProductRoutes } from '../Product/product.route';
import { CartRoutes } from '../Cart/cart.route';
import { OrderRoutes } from '../Order/order.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
