
# AccountInvitationPreviewV1

Account invitation preview V1

## Properties

Name | Type
------------ | -------------
`accountId` | number
`accountName` | string
`status` | string
`expiresAt` | Date
`alreadyMember` | boolean

## Example

```typescript
import type { AccountInvitationPreviewV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "accountId": null,
  "accountName": null,
  "status": null,
  "expiresAt": null,
  "alreadyMember": null,
} satisfies AccountInvitationPreviewV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountInvitationPreviewV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


