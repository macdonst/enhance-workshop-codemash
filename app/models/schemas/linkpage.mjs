export const Linkpage = {
  "id": "Linkpage",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "path": {
      "type": "string"
    },
    "links":{ 
      "type":"array",
      "items":{
        "type":"object",
        "properties":{
          "url":{"type":"string"},
          "text":{"type":"string"}
        }
      }
    }
  }
}
