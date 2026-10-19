import Checkbox from 'expo-checkbox';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Platform, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import DateTimeField from './src/DateTimeField';

const label = { fontSize: 16, marginBottom: 8, marginTop: 16 };
const input = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#fff',
};
const pickerBox = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  backgroundColor: '#fff',
};
const help = { fontSize: 13, color: '#666', marginTop: -4 };

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

const COUNTRIES = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United States', 'United Kingdom', 'Canada', 'India'];

const EMPTY_FORM = {
  text: '',
  name: '',
  email: '',
  password: '',
  number: '',
  decimal: '',
  telephone: '',
  url: '',
  search: '',
  username: '',
  otp: '',
  creditCard: '',
  postalCode: '',
  address: '',
  date: '',
  time: '',
  multiline: '',
  acceptedTerms: false,
  gender: '',
  country: '',
  notifications: false,
  experience: 5,
  document: null,
  image: null,
};

export default function App() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formKey, setFormKey] = useState(0);

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setFormKey((prev) => prev + 1);
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!result.canceled) {
      const file = result.assets[0];
      update('document', { name: file.name, size: file.size, type: file.mimeType, uri: file.uri });
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'] });
    if (!result.canceled) {
      const asset = result.assets[0];
      update('image', { fileName: asset.fileName, width: asset.width, height: asset.height, uri: asset.uri });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
          Form with All Elements
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 12, textAlign: 'center' }}>
          Default components and props per input purpose
        </Text>

        <Text style={label}>Text</Text>
        <TextInput
          placeholder="Plain text"
          value={formData.text}
          onChangeText={(value) => update('text', value)}
          style={input}
        />

        <Text style={label}>Name</Text>
        <TextInput
          placeholder="Full name"
          value={formData.name}
          onChangeText={(value) => update('name', value)}
          autoComplete="name"
          style={input}
        />

        <Text style={label}>Email</Text>
        <TextInput
          placeholder="name@example.com"
          value={formData.email}
          onChangeText={(value) => update('email', value)}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          style={input}
        />

        <Text style={label}>Password</Text>
        <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => update('password', value)}
          secureTextEntry
          autoComplete="password"
          style={input}
        />

        <Text style={label}>Number</Text>
        <TextInput
          placeholder="123"
          value={formData.number}
          onChangeText={(value) => update('number', value)}
          keyboardType="numeric"
          style={input}
        />

        <Text style={label}>Decimal</Text>
        <TextInput
          placeholder="12.5"
          value={formData.decimal}
          onChangeText={(value) => update('decimal', value)}
          keyboardType="decimal-pad"
          style={input}
        />

        <Text style={label}>Telephone</Text>
        <TextInput
          placeholder="+234 800 000 0000"
          value={formData.telephone}
          onChangeText={(value) => update('telephone', value)}
          keyboardType="phone-pad"
          autoComplete="tel"
          style={input}
        />

        <Text style={label}>URL</Text>
        <TextInput
          placeholder="https://example.com"
          value={formData.url}
          onChangeText={(value) => update('url', value)}
          keyboardType="url"
          autoComplete="url"
          autoCapitalize="none"
          style={input}
        />

        <Text style={label}>Search</Text>
        <TextInput
          placeholder="Search..."
          value={formData.search}
          onChangeText={(value) => update('search', value)}
          inputMode="search"
          style={input}
        />

        <Text style={label}>Username</Text>
        <TextInput
          placeholder="username"
          value={formData.username}
          onChangeText={(value) => update('username', value)}
          autoComplete="username"
          autoCapitalize="none"
          style={input}
        />

        <Text style={label}>OTP / verification code</Text>
        <TextInput
          placeholder="123456"
          value={formData.otp}
          onChangeText={(value) => update('otp', value)}
          autoComplete="one-time-code"
          keyboardType="number-pad"
          maxLength={6}
          style={input}
        />

        <Text style={label}>Credit card number</Text>
        <TextInput
          placeholder="4242 4242 4242 4242"
          value={formData.creditCard}
          onChangeText={(value) => update('creditCard', value)}
          keyboardType="number-pad"
          autoComplete="cc-number"
          maxLength={19}
          style={input}
        />

        <Text style={label}>Postal / ZIP code</Text>
        <TextInput
          placeholder="100001"
          value={formData.postalCode}
          onChangeText={(value) => update('postalCode', value)}
          keyboardType="numeric"
          autoComplete="postal-code"
          style={input}
        />

        <Text style={label}>Address</Text>
        <TextInput
          placeholder="Street address"
          value={formData.address}
          onChangeText={(value) => update('address', value)}
          autoComplete="street-address"
          style={input}
        />

        <DateTimeField
          title="Date"
          mode="date"
          value={formData.date}
          onChange={(value) => update('date', value)}
        />

        <DateTimeField
          title="Time"
          mode="time"
          value={formData.time}
          onChange={(value) => update('time', value)}
        />

        <Text style={label}>Multiline / textarea</Text>
        <TextInput
          placeholder="Write a longer message"
          value={formData.multiline}
          onChangeText={(value) => update('multiline', value)}
          multiline
          numberOfLines={4}
          style={{ ...input, height: 100, textAlignVertical: 'top' }}
        />

        <Text style={label}>Checkbox</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            value={formData.acceptedTerms}
            onValueChange={(value) => update('acceptedTerms', value)}
            color={formData.acceptedTerms ? '#ff6b6b' : undefined}
          />
          <Text style={{ fontSize: 16, marginLeft: 10 }}>I accept the Terms & Conditions</Text>
        </View>

        <Text style={label}>Radio button</Text>
        <RadioForm
          key={formKey}
          radio_props={GENDER_OPTIONS}
          initial={-1}
          buttonSize={12}
          buttonColor="#999"
          selectedButtonColor="#ff6b6b"
          labelStyle={{ fontSize: 16 }}
          onPress={(value) => update('gender', value)}
        />

        <Text style={label}>Select / dropdown</Text>
        <View style={pickerBox}>
          <Picker
            selectedValue={formData.country}
            onValueChange={(value) => update('country', value)}
          >
            <Picker.Item label="Select a country" value="" />
            {COUNTRIES.map((country) => (
              <Picker.Item key={country} label={country} value={country} />
            ))}
          </Picker>
        </View>

        <Text style={label}>Toggle</Text>
        <Switch
          value={formData.notifications}
          onValueChange={(value) => update('notifications', value)}
        />
        <Text style={help}>{formData.notifications ? 'Notifications on' : 'Notifications off'}</Text>

        <Text style={label}>Slider / range ({formData.experience})</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={formData.experience}
          onValueChange={(value) => update('experience', value)}
          minimumTrackTintColor="#ff6b6b"
          maximumTrackTintColor="#ccc"
          style={{ width: '100%', height: 40 }}
        />

        <Text style={label}>File upload</Text>
        <Text style={{ fontSize: 15, color: '#444', marginBottom: 8 }}>
          {formData.document ? formData.document.name : 'No file selected'}
        </Text>
        <Button title="Choose file" onPress={pickDocument} color="#ff6b6b" />

        <Text style={label}>Image selection</Text>
        <Text style={{ fontSize: 15, color: '#444', marginBottom: 8 }}>
          {formData.image ? formData.image.fileName || formData.image.uri : 'No image selected'}
        </Text>
        <Button title="Choose image" onPress={pickImage} color="#ff6b6b" />

        <View style={{ height: 24 }} />
        <Button title="Submit" onPress={handleSubmit} color="#ff6b6b" />
        <View style={{ height: 12 }} />
        <Button title="Reset" onPress={handleReset} color="#666" />
      </ScrollView>
    </View>
  );
}
