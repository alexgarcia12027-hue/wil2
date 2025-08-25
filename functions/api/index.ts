import { IttyRouter } from 'itty-router';
import EbooksRouter from './ebooks';
import ConsultationsRouter from './consultations';
import ForumRouter from './forum';
import AuthRouter from './auth';
import CoursesRouter from './courses';

const router = IttyRouter();

// Registrar las rutas de los diferentes módulos
router.all('/ebooks/*', EbooksRouter.handle);
router.all('/consultations/*', ConsultationsRouter.handle);
router.all('/forum/*', ForumRouter.handle);
router.all('/auth/*', AuthRouter.handle);
router.all('/courses/*', CoursesRouter.handle);

router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
  fetch: router.handle,
};
