import './page404.scss';
import { errorPageTmpl } from './page404.tmpl';
import { renderToPage } from '../../utils/utils';

const context = {
  title: '404',
  text: 'Не туда попали'
};
renderToPage(errorPageTmpl, context);
