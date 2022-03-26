import './index.scss';
import router from './utils/Router';
import Login from './pages/login';
import Register from './pages/register';
import Chats from './pages/chats';
import Profile from './pages/profile';
import ErrorPage from './components/errorPage';
import authController from './controllers/AuthController';
import chatsController from './controllers/ChatsController';

router
  .use('/', Login)
  .use('/sign-up', Register)
  .use('/messenger', Chats)
  .use('/settings', Profile)
  .use('/404', ErrorPage, {
    title: '404',
    text: 'Не туда попали'
  })
  .use('/500', ErrorPage, {
    title: '500',
    text: 'Мы уже фиксим'
  })
  .start();

authController.getUser()
  .then(() => chatsController.getChats());
