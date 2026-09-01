
# AccountTransferV1

Account transfer V1

## Properties

Name | Type
------------ | -------------
`id` | number
`fromAccountId` | number
`toAccountId` | number
`amount` | string
`transferDate` | Date
`description` | string

## Example

```typescript
import type { AccountTransferV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "fromAccountId": null,
  "toAccountId": null,
  "amount": null,
  "transferDate": null,
  "description": null,
} satisfies AccountTransferV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountTransferV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


