import React from 'react'
import { setupStore } from '../../../redux/store'
import { renderWithProviders } from '../../../redux/utils/test-utils'
import Dashboard from '..'
import { GET_USER } from "../../../redux/auth/types"



describe('Dashboard component', () => {

  it('renders a view', () => {
    const navigation = { navigate: jest.fn(), navigation: jest.fn(), addListener: jest.fn() };
    renderWithProviders(<Dashboard navigation={navigation} />)
  });


  test('renders correctly', () => {
    const navigation = { navigate: jest.fn(), navigation: jest.fn(), addListener: jest.fn() };


    const tree = renderWithProviders(<Dashboard navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Uses preloaded state to render', () => {
    const navigation = { navigate: jest.fn(), navigation: jest.fn(), addListener: jest.fn() };


    const initialWallet = [{ value: 123123, completed: false }]

    const initialFcm = [{ id: 1, name: test, completed: false }]

    const { getByText } = renderWithProviders(<Dashboard navigation={navigation} />, {
      preloadedState: {
        wallet: initialWallet,
        user: initialFcm
      }
    })
  })


  const thunkMiddleware =
    ({ dispatch, getState }) =>
      next =>
        action => {
          if (typeof action === 'function') {
            return action(dispatch, getState)
          }

          return next(action)
        }

  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn()
    }
    const next = jest.fn()

    const invoke = action => thunkMiddleware(store)(next)(action)

    return { store, next, invoke }
  }


  test('calls the function', () => {
    const { invoke } = create()
    const fn = jest.fn()
    invoke(fn)
    expect(fn).toHaveBeenCalled()
  })

  test('passes User details dispatch and getState', () => {
    const { store, invoke } = create()
    invoke((dispatch, getState) => {
      dispatch(GET_USER)
      getState()
    })
    expect(store.dispatch).toHaveBeenCalledWith(GET_USER)
    expect(store.getState).toHaveBeenCalled()
  })

})

