
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user-route';
import { BlogRoutes } from '../modules/blog/blog-route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
