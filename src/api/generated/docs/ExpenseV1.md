
# ExpenseV1

Expense V1

## Properties

Name | Type
------------ | -------------
`id` | number
`categoryId` | number
`amount` | string
`description` | string
`expenseDate` | Date
`movementType` | [MovementTypeV1](MovementTypeV1.md)
`offsetsSpendingAverage` | boolean
`reimbursedExpenseId` | number
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { ExpenseV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "categoryId": null,
  "amount": null,
  "description": null,
  "expenseDate": null,
  "movementType": null,
  "offsetsSpendingAverage": null,
  "reimbursedExpenseId": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies ExpenseV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExpenseV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


