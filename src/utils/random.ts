export const getRandomVibrantColor = () => {
  while (true) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const maxComponent = Math.max(red, green, blue);
    const minComponent = Math.min(red, green, blue);
    const difference = maxComponent - minComponent;

    const vibrancyThreshold = 80;

    if (difference >= vibrancyThreshold) {
      const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
      console.log(color);
      return color;
    }
  }
};