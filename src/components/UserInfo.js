export default class UserInfo {
  constructor(selectorName, selectorDescriptions, selectorAvatar) {
    this._fieldName = document.querySelector(selectorName);
    this._fieldDescriptions = document.querySelector(selectorDescriptions);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo = () => {
    const userInfoValues = {
      name: this._fieldName.textContent,
      description: this._fieldDescriptions.textContent,
    };

    return userInfoValues;
  };

  setUserInfo = (data) => {
    this._fieldName.textContent = data['name'];
    this._fieldDescriptions.textContent = data['about'];
  };

  setAvatar = (avatarLink) => {
    this._avatar.src = avatarLink;
  };
}
