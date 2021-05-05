import { useState } from 'react';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Span } from './Typography';
import { Button } from './Buttons';
import { brewType } from './Types';

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
} from './Icons';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.units(3)};
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.spacing.units(4)};
  font-family: ${({ theme }) => theme.typography.fontFamilyBody};
  height: ${({ theme }) => theme.spacing.units(6)};
  color: ${({ theme }) => theme.colour.primary};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconLabel = styled(Span)`
  display: flex;
`;

const IconWrapper = styled(Span)`
  margin-left: ${({ theme }) => theme.spacing.units(2)};
`;

const LabelledInput = ({ label, value, onChange, type, icon, list }) => {
  const handleChange = (e) => onChange(e.currentTarget.value);
  return (
    <Label>
      <IconLabel>
        {label}
        <IconWrapper>{icon}</IconWrapper>
      </IconLabel>
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        list={list ? label : undefined}
      />
      {list && (
        <datalist id={label}>
          {list.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </datalist>
      )}
    </Label>
  );
};

LabelledInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
};

LabelledInput.defaultProps = {
  list: undefined,
};

const brewIsValid = (brew) => !!brew.bean.trim() && !!brew.method.trim();

export default function AddBrewForm({
  defaultBrew,
  addBrew,
  onAddBrew,
  beans,
  methods,
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
        type="number"
        label="brew time"
        value={brew.brewTime}
        onChange={patchBrew('brewTime')}
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

      <Button onClick={saveBrew} disabled={!enableSaveButton}>add</Button>
    </Column>
  );
}

AddBrewForm.propTypes = {
  defaultBrew: brewType.isRequired,
  addBrew: PropTypes.func.isRequired,
  onAddBrew: PropTypes.func.isRequired,
  beans: PropTypes.arrayOf(PropTypes.string).isRequired,
  methods: PropTypes.arrayOf(PropTypes.string).isRequired,
};
