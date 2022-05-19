export default class UserInfo {
  constructor(selectorName, selectorDescriptions) {
    this._fieldName = document.querySelector(selectorName);
    this._fieldDescriptions = document.querySelector(selectorDescriptions);
  }

  getUserInfo = () => {
    const userInfoValues = {
      name: this._fieldName.textContent,
      description: this._fieldDescriptions.textContent,
    };

    return userInfoValues;
  };

  setUserInfo = ({ name, description }) => {
    this._fieldName.textContent = name;
    this._fieldDescriptions.textContent = description;
  };
}
