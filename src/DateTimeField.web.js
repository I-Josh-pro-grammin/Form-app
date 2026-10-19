import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';

const label = { fontSize: 16, marginBottom: 8, marginTop: 16 };
const picker = { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff' };

const pad = (value) => String(value).padStart(2, '0');

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = Array.from({ length: 31 }, (_, index) => String(index + 1));
const HOURS = Array.from({ length: 24 }, (_, index) => pad(index));
const MINUTES = Array.from({ length: 60 }, (_, index) => pad(index));
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 90 }, (_, index) => String(CURRENT_YEAR - index));

export default function DateTimeField({ title, mode = 'date', value, onChange }) {
  const parts = (value || '').split(mode === 'time' ? ':' : '-');
  const now = new Date();

  if (mode === 'time') {
    const hours = parts[0] || pad(now.getHours());
    const minutes = parts[1] || pad(now.getMinutes());
    return (
      <View>
        <Text style={label}>{title}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={hours}
              onValueChange={(next) => onChange(`${next}:${minutes}`)}
              style={picker}
            >
              {HOURS.map((hour) => (
                <Picker.Item key={hour} label={hour} value={hour} />
              ))}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={minutes}
              onValueChange={(next) => onChange(`${hours}:${next}`)}
              style={picker}
            >
              {MINUTES.map((minute) => (
                <Picker.Item key={minute} label={minute} value={minute} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  }

  const year = parts[0] || String(now.getFullYear());
  const month = parts[1] || pad(now.getMonth() + 1);
  const day = parts[2] || pad(now.getDate());

  return (
    <View>
      <Text style={label}>{title}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={day}
            onValueChange={(next) => onChange(`${year}-${month}-${next}`)}
            style={picker}
          >
            {DAYS.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <View style={{ flex: 2 }}>
          <Picker
            selectedValue={month}
            onValueChange={(next) => onChange(`${year}-${next}-${day}`)}
            style={picker}
          >
            {MONTHS.map((name, index) => (
              <Picker.Item key={name} label={name} value={pad(index + 1)} />
            ))}
          </Picker>
        </View>
        <View style={{ flex: 1.2 }}>
          <Picker
            selectedValue={year}
            onValueChange={(next) => onChange(`${next}-${month}-${day}`)}
            style={picker}
          >
            {YEARS.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}
