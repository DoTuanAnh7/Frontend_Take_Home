import React from 'react'
import { renderWithProviders } from '../../../redux/utils/test-utils'
import Login from '..'
import { Platform } from 'react-native'




describe('Login component', () => {
  Platform.OS = 'android'
  const mockedParams = {
    route: { params: { currentBid: 'whatever-id' } },
    navigation: ''
  };


  test('renders correctly', () => {
    const tree = renderWithProviders(<Login {...mockedParams} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 1 child', () => {
    const tree = renderWithProviders(<Login {...mockedParams} />).toJSON();
    expect(tree.children.length).toBe(1);
  });


})

