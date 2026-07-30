
# GetExpensesV1Request

Get Expenses V1 Request

## Properties

Name | Type
------------ | -------------
`categoryId` | number
`expenseDate` | Date
`description` | string
`movementType` | [MovementTypeV1](MovementTypeV1.md)

## Example

```typescript
import type { GetExpensesV1Request } from ''

// TODO: Update the object below with actual values
const example = {
  "categoryId": null,
  "expenseDate": null,
  "description": null,
  "movementType": null,
} satisfies GetExpensesV1Request

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetExpensesV1Request
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


