import ErrorPage from '../../components/errorPage/index';
import renderDOM from '../../utils/renderDOM';

const errorPage = new ErrorPage({
  title: '404',
  text: 'Не туда попали'
});

renderDOM('.app', errorPage);
