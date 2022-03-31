export const setBackgroundColor = (type: string) => {
  switch (type) {
    case 'grass':
      return 'rgb(120,200,79)';
    case 'ghost':
      return 'rgb(112,88,152)';
    case 'ice':
      return 'rgb(152,216,216)';
    case 'ground':
      return 'rgb(224,192,104)';
    case 'electric':
      return 'rgb(248,207,48)';
    case 'poison':
      return 'rgb(159,64,159)';
    case 'dragon':
      return 'rgb(112,56,248)';
    case 'normal':
      return 'rgb(168,168,119)';
    case 'steel':
      return 'rgb(184,184,208)';
    case 'flying':
      return 'rgb(168,144,240)';
    case 'fairy':
      return 'rgb(238,153,172)';
    case 'fire':
      return 'rgb(239,128,48)';
    case 'water':
      return 'rgb(103,144,240)';
    case 'bug':
      return 'rgb(168,183,32)';
    case 'dark':
      return 'rgb(112,88,72)';
    case 'rock':
      return 'rgb(184,160,56)';
    case 'psychic':
      return 'rgb(248,87,135)';
    case 'fighting':
      return 'rgb(192,48,40)';
    default:
      return 'white';
  }
};
