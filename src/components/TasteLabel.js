import PropTypes from 'prop-types';
import { Span } from './Typography';

const inRange = (min, max) => (value) => value >= min && value <= max;
const inVerySourRange = inRange(-10, -8)
const inSourRange = inRange(-7, -5);
const inSlightlySourRange = inRange(-4, -3)
const inBalancedRange = inRange(-2, 2);
const inSlightlyBitterRange = inRange(3, 4);
const inBitterRange = inRange(5, 7);
const inVeryBitterRange = inRange(8, 10);

export default function TasteLabel({ children }) {

  return (
    <Span>
      { children === 0 && 'perfect' ||
        inVerySourRange(children) && 'very sour' ||
        inSourRange(children) && 'sour' ||
        inSlightlySourRange(children) && 'slightly sour' ||
        inBalancedRange(children) && 'balanced' ||
        inSlightlyBitterRange(children) && 'slightly bitter' ||
        inBitterRange(children) && 'bitter' ||
        inVeryBitterRange(children) && 'very bitter'
      }
    </Span>
  )
}

TasteLabel.propTypes = {
  children: PropTypes.number.isRequired,
};
