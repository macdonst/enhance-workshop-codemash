export const Cart = {
  "id": "Cart",
  "type": "object",
  "properties": {
    "bookings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "workshop_id": {
            "type": "string"
          },
          "seats": {
            "type": "integer"
          }
        },
        "required": [
          "workshop_id",
          "seats"
        ]
      }
    },
    "account": {
      "type": "string"
    },
    "created_at": {
      "type": "string"
    },
    "updated_at": {
      "type": "string"
    },
    "key": {
      "type": "string"
    }
  },
  "definitions": {
    "booking": {
      "type": "object",
      "properties": {
        "workshop_id": {
          "type": "string"
        },
        "seats": {
          "type": "integer"
        }
      },
      "required": [
        "workshop_id",
        "seats"
      ]
    }
  }
}
