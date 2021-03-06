import { useState } from 'react';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Button } from '../Buttons';
import LabelledInput from './LabelledInput';
import Time from '../Time';
import TasteLabel from '../TasteLabel';
import BrewTimer from '../BrewTimer/BrewTimer';
import { Input, Textarea } from '../FormControls';

import {
  Beans,
  CoffeePot,
  Scales,
  WaterDrop,
  Thermometer,
  Timer,
  Grinder,
  Notes,
  Calendar,
  Technique,
  Taste,
} from '../Icons';

import { brewType } from '../../Types';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const FixedWidthTasteLabel = styled(TasteLabel)`
  min-width: ${({ theme }) => theme.spacing.units(40)};
  white-space: nowrap;
  text-align: right;
`;

const brewIsValid = (brew) => !!brew.bean.trim() && !!brew.method.trim();
const formatDate = (date) => format(date, "yyyy-MM-dd'T'HH:mm");

export default function AddBrewForm({
  initialBrew,
  save,
  onSave,
  beans,
  methods,
  showTimer,
}) {
  const [brew, setBrew] = useState(initialBrew);
  const patchBrew = (key) => (value) => setBrew({ ...brew, [key]: value });
  const saveBrew = () => {
    save(brew);
    onSave();
  };

  const patchBrewDateTime = (dateString) =>
    patchBrew('dateTime')(new Date(dateString));

  const patchBrewTime = patchBrew('brewTime');

  const enableSaveButton = brewIsValid(brew);

  return (
    <>
      {showTimer && <BrewTimer onStop={patchBrewTime} />}
      <Column>
        <LabelledInput
          Component={Input}
          icon={<Beans />}
          type="text"
          label="bean"
          value={brew.bean}
          onChange={patchBrew('bean')}
          list={beans}
        />
        <LabelledInput
          Component={Input}
          icon={<CoffeePot />}
          type="text"
          label="method"
          value={brew.method}
          onChange={patchBrew('method')}
          list={methods}
        />
        <LabelledInput
          Component={Input}
          icon={<Scales />}
          type="number"
          label="grounds weight"
          value={brew.groundsWeight}
          onChange={patchBrew('groundsWeight')}
        />
        <LabelledInput
          Component={Input}
          icon={<Grinder />}
          type="number"
          label="grind size"
          value={brew.grindSize}
          onChange={patchBrew('grindSize')}
        />
        <LabelledInput
          Component={Input}
          icon={<WaterDrop />}
          type="number"
          label="water weight"
          value={brew.waterWeight}
          onChange={patchBrew('waterWeight')}
        />
        <LabelledInput
          Component={Input}
          icon={<Thermometer />}
          type="number"
          label="water temperature"
          value={brew.waterTemperature}
          onChange={patchBrew('waterTemperature')}
        />
        <LabelledInput
          Component={Input}
          icon={<Timer />}
          type="range"
          label="brew time"
          value={brew.brewTime}
          min={0}
          max={1000}
          display={<Time>{Number.parseInt(brew.brewTime, 10)}</Time>}
          onChange={patchBrewTime}
        />
        <LabelledInput
          Component={Textarea}
          icon={<Technique />}
          type="text"
          label="technique"
          value={brew.technique}
          onChange={patchBrew('technique')}
        />
        <LabelledInput
          Component={Input}
          icon={<Taste />}
          type="range"
          label="taste"
          value={brew.taste}
          onChange={patchBrew('taste')}
          min={-10}
          max={10}
          display={
            <FixedWidthTasteLabel>
              {Number.parseInt(brew.taste, 10)}
            </FixedWidthTasteLabel>
          }
        />
        <LabelledInput
          Component={Textarea}
          icon={<Notes />}
          type="text"
          label="notes"
          value={brew.notes}
          onChange={patchBrew('notes')}
        />
        <LabelledInput
          Component={Input}
          icon={<Calendar />}
          type="datetime-local"
          label="date"
          value={formatDate(brew.dateTime)}
          onChange={patchBrewDateTime}
        />

        <Button
          onClick={saveBrew}
          disabled={!enableSaveButton}
          aria-label="Save brew"
        >
          Save brew
        </Button>
      </Column>
    </>
  );
}

AddBrewForm.propTypes = {
  initialBrew: brewType.isRequired,
  save: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  beans: PropTypes.arrayOf(PropTypes.string).isRequired,
  methods: PropTypes.arrayOf(PropTypes.string).isRequired,
  showTimer: PropTypes.bool,
};

AddBrewForm.defaultProps = {
  showTimer: false,
};
