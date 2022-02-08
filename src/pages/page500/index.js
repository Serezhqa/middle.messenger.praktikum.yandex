import './page500.sass';
import {errorPageTmpl} from './page500.tmpl';
import {renderToPage} from '../../utils/utils';

const context = {
  title: '500',
  text: 'Мы уже фиксим'
};
renderToPage(errorPageTmpl, context);