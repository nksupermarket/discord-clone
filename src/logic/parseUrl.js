const parseUrl = (url, item) => {
  const split = url.split('/');
  if (split[1] !== 'channels') return null;

  switch (item) {
    case 'channel':
      return split[2];
    case 'room':
      return split[3];
  }
};

module.exports = parseUrl;
