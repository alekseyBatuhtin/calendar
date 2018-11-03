import { formatWithOptions as format } from 'date-fns/fp';
import ru from 'date-fns/locale/ru';

const formatDate = (date, pattern = 'dd MMMM yyyy') => format({locale: ru}, pattern)(date);

export default formatDate;