import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function DateLabel({ children }) {
  return format(children, "do MMM yyyy '@' haaa");
}

DateLabel.propTypes = {
  children: PropTypes.instanceOf(Date).isRequired,
};
