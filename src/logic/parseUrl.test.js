const parseUrl = require('./parseUrl');

it('/channels/channel/room to equal room', () => {
  expect(parseUrl('/channels/channel/room', 'room')).toBe('room');
});

it('/channels/channel/room to equal room', () => {
  expect(parseUrl('/channels/channel', 'channel')).toBe('channel');
});
