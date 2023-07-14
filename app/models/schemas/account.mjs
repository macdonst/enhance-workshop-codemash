export const Account = {
  "id": "Accounts",
  "type": "object",
  "required": [
    "displayName", 
    "username", 
    "password"
  ],
  "properties": {
    "displayName": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_\-]*$",
      "maxLength": 30
    },
    "username": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_\-]*$",
      "maxLength": 30
    },
    "password": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 8
        },
        {
          "type": "string",
          "maxLength": 0
        }
      ]
    },
    "scopes": {
      "type": "array",
      "items": {"type":"string"}
    },
    "key": {
      "type": "string"
    }
  }
}
