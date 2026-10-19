import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Button,
  PanResponder,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const label = { fontSize: 16, marginBottom: 8, marginTop: 16 };
const input = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#fff',
};

function Checkbox({ text, value, onChange }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={text}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: value ? '#ff6b6b' : '#999',
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          backgroundColor: value ? '#ff6b6b' : '#fff',
        }}
      >
        {value ? <Text style={{ color: '#fff', fontSize: 16 }}>✓</Text> : null}
      </View>
      <Text style={{ fontSize: 16 }}>{text}</Text>
    </Pressable>
  );
}

function RadioGroup({ title, options, value, onChange }) {
  return (
    <View>
      <Text style={label}>{title}</Text>
      {options.map((option) => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityLabel={option}
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: selected ? '#ff6b6b' : '#999',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              {selected ? (
                <View
                  style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff6b6b' }}
                />
              ) : null}
            </View>
            <Text style={{ fontSize: 16 }}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Select({ title, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Text style={label}>{title}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={() => setOpen((prev) => !prev)}
        style={{ ...input, flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Text style={{ fontSize: 16, color: value ? '#000' : '#888' }}>
          {value ? String(value) : placeholder || 'Select an option'}
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            marginTop: 4,
            backgroundColor: '#fff',
            maxHeight: 220,
            overflow: 'hidden',
          }}
        >
          <ScrollView nestedScrollEnabled>
            {options.map((option) => (
              <Pressable
                key={String(option)}
                accessibilityRole="button"
                accessibilityLabel={String(option)}
                onPress={() => {
                  onChange(option);
                  setOpen(false);
                }}
                style={{
                  padding: 12,
                  backgroundColor: option === value ? '#e6f4fe' : '#fff',
                }}
              >
                <Text style={{ fontSize: 16 }}>{String(option)}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

function Slider({ title, value, min, max, step, onChange }) {
  const trackWidth = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setFromX = (x) => {
    const width = trackWidth.current;
    if (!width) return;
    const ratio = Math.max(0, Math.min(1, x / width));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    onChangeRef.current(Math.max(min, Math.min(max, stepped)));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => setFromX(event.nativeEvent.locationX),
      onPanResponderMove: (event) => setFromX(event.nativeEvent.locationX),
    })
  ).current;

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <View>
      <Text style={label}>
        {title} ({value})
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Decrease ${title}`}
          onPress={() => onChange(Math.max(min, value - step))}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#ccc',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>−</Text>
        </Pressable>
        <View
          {...panResponder.panHandlers}
          onLayout={(event) => {
            trackWidth.current = event.nativeEvent.layout.width;
          }}
          style={{ flex: 1, height: 36, justifyContent: 'center', marginHorizontal: 8 }}
        >
          <View style={{ height: 6, borderRadius: 3, backgroundColor: '#ddd' }} />
          <View
            style={{
              position: 'absolute',
              height: 6,
              borderRadius: 3,
              backgroundColor: '#ff6b6b',
              width: `${percent}%`,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: `${percent}%`,
              marginLeft: -10,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#ff6b6b',
            }}
          />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Increase ${title}`}
          onPress={() => onChange(Math.min(max, value + step))}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#ccc',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    bio: '',
    newsletter: false,
    terms: false,
    gender: '',
    country: '',
    experience: 5,
    day: '',
    month: '',
    year: '',
  });

  const update = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      age: '',
      bio: '',
      newsletter: false,
      terms: false,
      gender: '',
      country: '',
      experience: 5,
      day: '',
      month: '',
      year: '',
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          Form with All Elements
        </Text>

        <Text style={label}>First Name</Text>
        <TextInput
          placeholder="Enter first name"
          value={formData.firstName}
          onChangeText={(text) => update('firstName', text)}
          style={input}
        />

        <Text style={label}>Last Name</Text>
        <TextInput
          placeholder="Enter last name"
          value={formData.lastName}
          onChangeText={(text) => update('lastName', text)}
          style={input}
        />

        <Text style={label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          value={formData.email}
          onChangeText={(text) => update('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={input}
        />

        <Text style={label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          value={formData.password}
          onChangeText={(text) => update('password', text)}
          secureTextEntry
          style={input}
        />

        <Text style={label}>Phone</Text>
        <TextInput
          placeholder="Enter phone"
          value={formData.phone}
          onChangeText={(text) => update('phone', text)}
          keyboardType="phone-pad"
          style={input}
        />

        <Text style={label}>Age</Text>
        <TextInput
          placeholder="Enter age"
          value={formData.age}
          onChangeText={(text) => update('age', text)}
          keyboardType="numeric"
          style={input}
        />

        <Text style={label}>Bio</Text>
        <TextInput
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChangeText={(text) => update('bio', text)}
          multiline
          numberOfLines={4}
          style={{ ...input, height: 100, textAlignVertical: 'top' }}
        />

        <Text style={label}>Newsletter (Switch)</Text>
        <Switch
          value={formData.newsletter}
          onValueChange={(value) => update('newsletter', value)}
        />

        <Text style={label}>Checkbox</Text>
        <Checkbox
          text="I accept the Terms & Conditions"
          value={formData.terms}
          onChange={(value) => update('terms', value)}
        />

        <RadioGroup
          title="Gender"
          options={['Male', 'Female', 'Other']}
          value={formData.gender}
          onChange={(value) => update('gender', value)}
        />

        <Select
          title="Country"
          value={formData.country}
          options={[
            'Nigeria',
            'Ghana',
            'Kenya',
            'South Africa',
            'United States',
            'United Kingdom',
            'Canada',
            'India',
          ]}
          onChange={(value) => update('country', value)}
          placeholder="Select your country"
        />

        <Slider
          title="Experience"
          value={formData.experience}
          min={0}
          max={10}
          step={1}
          onChange={(value) => update('experience', value)}
        />

        <Text style={label}>Date of Birth</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Select
              title="Day"
              value={formData.day}
              options={Array.from({ length: 31 }, (_, i) => i + 1)}
              onChange={(value) => update('day', value)}
              placeholder="Day"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Select
              title="Month"
              value={formData.month}
              options={MONTHS}
              onChange={(value) => update('month', value)}
              placeholder="Month"
            />
          </View>
          <View style={{ flex: 1.4 }}>
            <Select
              title="Year"
              value={formData.year}
              options={Array.from({ length: 77 }, (_, i) => 2010 - i)}
              onChange={(value) => update('year', value)}
              placeholder="Year"
            />
          </View>
        </View>

        <View style={{ height: 24 }} />
        <Button title="Submit" onPress={handleSubmit} color="#ff6b6b" />
        <View style={{ height: 12 }} />
        <Button title="Reset" onPress={handleReset} color="#666" />
      </ScrollView>
    </View>
  );
}