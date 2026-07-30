
# PatchExpenseV1Request

Patch Expense V1 Request

## Properties

Name | Type
------------ | -------------
`categoryId` | number
`amount` | string
`description` | string
`expenseDate` | Date
`movementType` | [MovementTypeV1](MovementTypeV1.md)
`offsetsSpendingAverage` | boolean

## Example

```typescript
import type { PatchExpenseV1Request } from ''

// TODO: Update the object below with actual values
const example = {
  "categoryId": null,
  "amount": null,
  "description": null,
  "expenseDate": null,
  "movementType": null,
  "offsetsSpendingAverage": null,
} satisfies PatchExpenseV1Request

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PatchExpenseV1Request
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


