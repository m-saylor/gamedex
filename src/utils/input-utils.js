// determine if user input is an email
function isEmail(input) {
  // reg exp to detect email format
  // eslint-disable-next-line no-useless-escape
  const regex = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
  const matches = String(input).match(regex);

  if (matches === null) {
    return true;
  } else {
    return false;
  }
}

export default isEmail;
