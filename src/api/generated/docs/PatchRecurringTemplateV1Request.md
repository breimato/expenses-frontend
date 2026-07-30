
# PatchRecurringTemplateV1Request

Patch Recurring Template V1 Request

## Properties

Name | Type
------------ | -------------
`label` | string
`amount` | string
`categoryId` | number
`sortOrder` | number
`movementType` | [MovementTypeV1](MovementTypeV1.md)
`offsetsSpendingAverage` | boolean
`frequency` | [RecurringFrequencyV1](RecurringFrequencyV1.md)
`dayOfMonth` | number
`autoApply` | boolean
`enabled` | boolean

## Example

```typescript
import type { PatchRecurringTemplateV1Request } from ''

// TODO: Update the object below with actual values
const example = {
  "label": null,
  "amount": null,
  "categoryId": null,
  "sortOrder": null,
  "movementType": null,
  "offsetsSpendingAverage": null,
  "frequency": null,
  "dayOfMonth": null,
  "autoApply": null,
  "enabled": null,
} satisfies PatchRecurringTemplateV1Request

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchRecurringTemplateV1Request
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


