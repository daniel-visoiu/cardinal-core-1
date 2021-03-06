const config = {
  "theme": "default",
  "appVersion": "1.0.0",
  "profile": {
    "username": "Cardinal App" ,
    "email": "privatesky@axiologic.net",
    "avatar": "https://privatesky.xyz/assets/images/privatesky.png"
  },
  "menu": {
    "defaultMenuConfig": {
      "icon": "fa-bars",
      "type": "route",
      "component": "psk-page-loader",
      "exact": false,
      "indexed": true,
      "historyType": "browser"
    },
    "pages": [
      {
        "name": "Home",
        "path": "/home",
        "pageSrc": "index.html"
      }
    ]
  }
}

export default config;
