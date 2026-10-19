import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

const label = { fontSize: 16, marginBottom: 8, marginTop: 16 };

const pad = (value) => String(value).padStart(2, '0');

function toDate(value, mode) {
  if (mode === 'time') {
    const [hours, minutes] = (value || '').split(':').map(Number);
    const date = new Date();
    date.setHours(Number.isFinite(hours) ? hours : 0, Number.isFinite(minutes) ? minutes : 0, 0, 0);
    return date;
  }
  const [year, month, day] = (value || '').split('-').map(Number);
  return year ? new Date(year, (month || 1) - 1, day || 1) : new Date();
}

function formatValue(date, mode) {
  if (mode === 'time') {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default function DateTimeField({ title, mode = 'date', value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text style={label}>{title}</Text>
      <Text style={{ fontSize: 16, color: value ? '#000' : '#888', marginBottom: 8 }}>
        {value || `No ${mode} selected`}
      </Text>
      <Button
        title={mode === 'time' ? 'Pick a time' : 'Pick a date'}
        onPress={() => setVisible(true)}
      />
      {visible ? (
        <DateTimePicker
          mode={mode}
          value={toDate(value, mode)}
          onChange={(event, selected) => {
            setVisible(false);
            if (event.type === 'set' && selected) {
              onChange(formatValue(selected, mode));
            }
          }}
        />
      ) : null}
    </View>
  );
}
