import ErrorPage from '../../components/errorPage/index';
import renderDOM from '../../utils/renderDOM';

const errorPage = new ErrorPage({
  title: '500',
  text: 'Мы уже фиксим'
});

renderDOM('.app', errorPage);
