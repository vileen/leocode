import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';

import { userResponseMock } from './__mocks__/mock-users-response';
import originalGetUsers from './dataProviders/getUsers';
import App from './App';

const getUsers = originalGetUsers as jest.Mock<
  ReturnType<typeof originalGetUsers>
>;

jest.mock('./dataProviders/getUsers');

describe('<App />', () => {
  it('displays empty message if response empty', async () => {
    getUsers.mockResolvedValue([]);

    // wait for data to fetch
    await act(async () => {
      render(<App />);
    });

    const loadingElement = screen.queryByText('Loading...');
    expect(loadingElement).not.toBeInTheDocument();

    const linkElement = screen.getByText('Users list');
    expect(linkElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText('Search by user name...');
    expect(inputElement).toBeInTheDocument();

    const emptyFeedback = screen.getByText('No users found :(');
    expect(emptyFeedback).toBeInTheDocument();
  });

  it('displays elements if response exists', async () => {
    getUsers.mockResolvedValue(userResponseMock);

    // wait for data to fetch
    await act(async () => {
      render(<App />);
    });

    const emptyFeedback = screen.queryByText('No users found :(');
    expect(emptyFeedback).not.toBeInTheDocument();

    // check if at least 2 users are displayed
    const user1 = screen.getByText('Leanne Graham');
    expect(user1).toBeInTheDocument();

    const user2 = screen.getByText('Mrs. Dennis Schulist');
    expect(user2).toBeInTheDocument();
  });

  it('renders error message if fetch failed', async () => {
    getUsers.mockRejectedValue({});

    // wait for data to fetch
    await act(async () => {
      render(<App />);
    });

    const emptyFeedback = screen.queryByText('No users found :(');
    expect(emptyFeedback).not.toBeInTheDocument();

    const errorFeedback = screen.getByText('Error occurred! Try refreshing the page.');
    expect(errorFeedback).toBeInTheDocument();
  });

  it('filters the list properly', async () => {
    getUsers.mockResolvedValue(userResponseMock);

    // wait for data to fetch
    await act(async () => {
      render(<App />);
    });

    const inputElement = screen.getByPlaceholderText('Search by user name...');
    fireEvent.change(inputElement, { target: { value: 'Graham' }});

    // check if at least 2 users are displayed
    const user1 = screen.getByText('Leanne Graham');
    expect(user1).toBeInTheDocument();

    const user2 = screen.queryByText('Mrs. Dennis Schulist');
    expect(user2).not.toBeInTheDocument();
  });

  it("displays empty message if filter didn't match any value", async () => {
    getUsers.mockResolvedValue(userResponseMock);

    // wait for data to fetch
    await act(async () => {
      render(<App />);
    });

    const inputElement = screen.getByPlaceholderText('Search by user name...');
    fireEvent.change(inputElement, { target: { value: '999999' }});

    // check if at least 2 users are displayed
    const user1 = screen.queryByText('Leanne Graham');
    expect(user1).not.toBeInTheDocument();

    const user2 = screen.queryByText('Mrs. Dennis Schulist');
    expect(user2).not.toBeInTheDocument();

    const emptyFeedback = screen.getByText('No users found :(');
    expect(emptyFeedback).toBeInTheDocument();
  });
});
