
# PostAccountTransferV1Request

Post Account Transfer V1 Request

## Properties

Name | Type
------------ | -------------
`fromAccountId` | number
`toAccountId` | number
`amount` | string
`transferDate` | Date
`description` | string

## Example

```typescript
import type { PostAccountTransferV1Request } from ''

// TODO: Update the object below with actual values
const example = {
  "fromAccountId": null,
  "toAccountId": null,
  "amount": null,
  "transferDate": null,
  "description": null,
} satisfies PostAccountTransferV1Request

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostAccountTransferV1Request
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


