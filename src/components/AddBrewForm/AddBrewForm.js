import { useState } from 'react';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Button } from '../Buttons';
import LabelledInput from './LabelledInput';

import { brewType } from '../Types';

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
} from '../Icons';
import Time from '../Time';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const brewIsValid = (brew) => !!brew.bean.trim() && !!brew.method.trim();

export default function AddBrewForm({
  defaultBrew,
  addBrew,
  onAddBrew,
  beans,
  methods,
  techniques,
}) {
  const [brew, setBrew] = useState(defaultBrew);
  const patchBrew = (key) => (value) => setBrew({ ...brew, [key]: value });
  const saveBrew = () => {
    addBrew(brew);
    onAddBrew();
  };

  const formatDate = (date) => format(date, "yyyy-MM-dd'T'HH:mm");
  const patchBrewDateTime = (dateString) =>
    patchBrew('dateTime')(new Date(dateString));

  const enableSaveButton = brewIsValid(brew);

  return (
    <Column>
      <LabelledInput
        icon={<Beans />}
        type="text"
        label="bean"
        value={brew.bean}
        onChange={patchBrew('bean')}
        list={beans}
      />
      <LabelledInput
        icon={<CoffeePot />}
        type="text"
        label="method"
        value={brew.method}
        onChange={patchBrew('method')}
        list={methods}
      />
      <LabelledInput
        icon={<Scales />}
        type="number"
        label="grounds weight"
        value={brew.groundsWeight}
        onChange={patchBrew('groundsWeight')}
      />
      <LabelledInput
        icon={<Grinder />}
        type="number"
        label="grind size"
        value={brew.grindSize}
        onChange={patchBrew('grindSize')}
      />
      <LabelledInput
        icon={<WaterDrop />}
        type="number"
        label="water weight"
        value={brew.waterWeight}
        onChange={patchBrew('waterWeight')}
      />
      <LabelledInput
        icon={<Thermometer />}
        type="number"
        label="water temperature"
        value={brew.waterTemperature}
        onChange={patchBrew('waterTemperature')}
      />
      <LabelledInput
        icon={<Timer />}
        type="range"
        label="brew time"
        value={brew.brewTime}
        min={0}
        max={1000}
        display={<Time>{Number.parseInt(brew.brewTime, 10)}</Time>}
        onChange={patchBrew('brewTime')}
      />
      <LabelledInput
        icon={<Technique />}
        type="text"
        label="technique"
        value={brew.technique}
        onChange={patchBrew('technique')}
        list={techniques}
      />
      <LabelledInput
        icon={<Notes />}
        type="text"
        label="notes"
        value={brew.notes}
        onChange={patchBrew('notes')}
      />
      <LabelledInput
        icon={<Calendar />}
        type="datetime-local"
        label="date"
        value={formatDate(brew.dateTime)}
        onChange={patchBrewDateTime}
      />

      <Button onClick={saveBrew} disabled={!enableSaveButton} aria-label="Save brew">Save brew</Button>
    </Column>
  );
}

AddBrewForm.propTypes = {
  defaultBrew: brewType.isRequired,
  addBrew: PropTypes.func.isRequired,
  onAddBrew: PropTypes.func.isRequired,
  beans: PropTypes.arrayOf(PropTypes.string).isRequired,
  methods: PropTypes.arrayOf(PropTypes.string).isRequired,
  techniques: PropTypes.arrayOf(PropTypes.string).isRequired,
};