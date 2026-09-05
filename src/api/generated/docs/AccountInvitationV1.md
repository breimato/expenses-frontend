
# AccountInvitationV1

Account invitation V1

## Properties

Name | Type
------------ | -------------
`id` | number
`accountId` | number
`token` | string
`expiresAt` | Date
`status` | string

## Example

```typescript
import type { AccountInvitationV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "accountId": null,
  "token": null,
  "expiresAt": null,
  "status": null,
} satisfies AccountInvitationV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountInvitationV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


