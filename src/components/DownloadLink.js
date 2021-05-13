import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const makeObjectUrl = (data) => URL.createObjectURL(data);
const revoke = (url) => URL.revokeObjectURL(url);
const makeBlob = (data) =>
  new Blob([JSON.stringify(data)], { type: 'application/json' });

const HiddenLink = styled.a`
  display: none;
`;

export default function DownloadLink({ render, data, filename }) {
  const ref = useRef(null);

  const onClick = () => {
    const blob = makeBlob(data);
    const url = makeObjectUrl(blob);

    const element = ref.current;
    element.setAttribute('href', url);
    element.setAttribute('download', filename);

    element.click();

    revoke(url);
  };

  return (
    <>
      <HiddenLink ref={ref} />
      {render(onClick)}
    </>
  );
}

DownloadLink.propTypes = {
  render: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  filename: PropTypes.string.isRequired,
};
