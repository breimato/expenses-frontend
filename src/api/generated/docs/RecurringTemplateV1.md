
# RecurringTemplateV1

Recurring Template V1

## Properties

Name | Type
------------ | -------------
`id` | number
`label` | string
`amount` | string
`categoryId` | number
`sortOrder` | number
`lastUsedAt` | Date
`movementType` | [MovementTypeV1](MovementTypeV1.md)
`offsetsSpendingAverage` | boolean
`frequency` | [RecurringFrequencyV1](RecurringFrequencyV1.md)
`dayOfMonth` | number
`autoApply` | boolean
`enabled` | boolean

## Example

```typescript
import type { RecurringTemplateV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "label": null,
  "amount": null,
  "categoryId": null,
  "sortOrder": null,
  "lastUsedAt": null,
  "movementType": null,
  "offsetsSpendingAverage": null,
  "frequency": null,
  "dayOfMonth": null,
  "autoApply": null,
  "enabled": null,
} satisfies RecurringTemplateV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RecurringTemplateV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


