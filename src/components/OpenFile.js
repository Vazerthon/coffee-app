import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const HiddenInput = styled.input`
  display: none;
`;

export default function OpenFile({ render, process }) {
  const ref = useRef(null);

  const onClick = () => ref.current.click();

  const onChange = ({ target }) => {
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = () => process(reader.result);
    reader.readAsText(file);
  };

  return (
    <>
      <HiddenInput type="file" ref={ref} onChange={onChange} />
      {render(onClick)}
    </>
  );
}

OpenFile.propTypes = {
  render: PropTypes.func.isRequired,
  process: PropTypes.func.isRequired,
};
