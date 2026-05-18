___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Rewrite Items ID for Google Ads",
  "description": "Rewrites item_id with Google Merchant Center, resolving cart data mismatches in Google Ads caused by item ID format inconsistencies between he data layer and MC.",
  "containerContexts": [
    "SERVER"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "TEXT",
    "name": "itemId",
    "displayName": "Item ID key",
    "simpleValueType": true,
    "defaultValue": "item_id"
  },
  {
    "type": "TEXT",
    "name": "itemVariant",
    "displayName": "Item variant key",
    "simpleValueType": true,
    "defaultValue": "item_variant"
  },
  {
    "type": "TEXT",
    "name": "Prefix",
    "displayName": "new pattern (before item_id + item_variant)",
    "simpleValueType": true,
    "defaultValue": "shopify_FR_"
  }
]


___SANDBOXED_JS_FOR_SERVER___

const getAllEventData = require('getAllEventData');
const Object = require('Object');

const FIELD_TO_UPDATE = data.itemId || 'item_id';
const FIELD_VARIANT = data.itemVariant || 'item_variant';
const PREFIX = data.prefix || 'shopify_FR_';

const items = getAllEventData().items || [];

if (!items.length) return undefined;

return items.map(function(item) {
  const productId = item[FIELD_TO_UPDATE] || '';
  const variantId = item[FIELD_VARIANT] || '';

  const updated = Object.entries(item).reduce(function(acc, entry) {
    acc[entry[0]] = entry[1];
    return acc;
  }, {});

  updated[FIELD_TO_UPDATE] = (productId && variantId) ? PREFIX + productId + '_' + variantId
    : productId;

  return updated;
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

Created on 18/05/2026 16:43:47


