// /app/models/schemas/link.mjs
export const Link = {
  "id": "Link",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 2,
    },
    "url": {
      "type": "string",
      "format": "url",
    },
    "published": {
      "type": "boolean",
    },
    "key": {
      "type": "string"
    }
  },
  "required":["text", "url"],
}