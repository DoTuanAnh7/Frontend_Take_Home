import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@@react-navigation/stack', () => createStackNavigator)
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

global.navigator = {
  ClientDevice_Browser: jest.fn().mockImplementation(() => Promise.resolve()),
};