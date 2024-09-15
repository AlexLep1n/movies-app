'use strict';

export default function trancateText(text) {
  if (!text) {
    return;
  }
  let maxLength = 200;
  if (text.length <= maxLength) {
    return text;
  }

  let trancated = text.slice(0, maxLength);

  let indexLastWhitespace = trancated.lastIndexOf(' ');

  if (indexLastWhitespace === -1) {
    return `${trancated} ...`;
  }

  return `${trancated.slice(0, indexLastWhitespace)} ...`;
}
