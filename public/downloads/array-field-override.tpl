___TERMS_OF_SERVICE___

By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.


___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Array Field Override",
  "description": "Overrides a chosen field on every item of an array. Applies a source field value first, falls back to a secondary field if absent, or preserves the original value.",
  "containerContexts": [
    "SERVER"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "TEXT",
    "name": "arrayKey",
    "displayName": "arrayKey",
    "simpleValueType": true,
    "help": "Name of the field to rewrite on every object in the array. Example: item_id",
    "valueHint": "items"
  },
  {
    "type": "TEXT",
    "name": "targetField",
    "displayName": "targetField",
    "simpleValueType": true,
    "help": "Name of the field to rewrite on every object in the array. Example: item_id",
    "valueHint": "item_id"
  },
  {
    "type": "TEXT",
    "name": "newValue",
    "displayName": "newValue",
    "simpleValueType": true,
    "help": "Pattern for the new value. Use {field_name} to inject the value of any field from the current object. Mix static text and dynamic parts freely. Example: shopify_FR_{item_variant_id}_{item_id}",
    "valueHint": "shopify_FR_{item_variant_id}_{item_id}"
  },
  {
    "type": "TEXT",
    "name": "fallbackValue",
    "displayName": "fallbackValue",
    "simpleValueType": true,
    "help": "Optional. Used if the New Value Pattern resolves to an empty value. Same syntax — you can use {field_name} placeholders. Example: {item_id}",
    "valueHint": "{item_id}"
  }
]


___SANDBOXED_JS_FOR_SERVER___

const getAllEventData = require('getAllEventData');
const Object = require('Object');
const makeString = require('makeString');

var arrayKey        = data.arrayKey;
var targetField     = data.targetField;
var newValuePattern = data.newValue;
var fallbackPattern = data.fallbackValue;

var arr = getAllEventData()[arrayKey] || [];
if (!arr.length) return undefined;

function hasValue(val) {
  return val !== undefined && val !== null && val !== '';
}

function buildValue(pattern, obj) {
  var result = pattern;
  var entries = Object.entries(obj);
  for (var i = 0; i < entries.length; i++) {
    result = result.split('{' + entries[i][0] + '}').join(makeString(entries[i][1]));
  }
  // Placeholder non résolu → échec
  if (result.indexOf('{') !== -1) return undefined;
  return result;
}

return arr.map(function(obj) {
  var copy = Object.entries(obj).reduce(function(acc, entry) {
    acc[entry[0]] = entry[1];
    return acc;
  }, {});

  var newVal = buildValue(newValuePattern, obj);

  if (hasValue(newVal)) {
    copy[targetField] = newVal;
  } else if (hasValue(fallbackPattern)) {
    var fallbackVal = buildValue(fallbackPattern, obj);
    if (hasValue(fallbackVal)) {
      copy[targetField] = fallbackVal;
    }
  }

  return copy;
});


___SERVER_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "read_event_data",
        "versionId": "1"
      },
      "param": [
        {
          "key": "eventDataAccess",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 14/09/2026 13:48:33


