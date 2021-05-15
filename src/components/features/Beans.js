import PropTypes from 'prop-types';

export default function Beans({ beans }) {
  return (
    <>
      {beans.map((bean) => bean)}
    </>
  );
}

Beans.propTypes = {
  beans: PropTypes.arrayOf(PropTypes.string).isRequired,
};
