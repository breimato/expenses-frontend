
# AccountMemberV1

Account member V1

## Properties

Name | Type
------------ | -------------
`userId` | number
`displayName` | string
`email` | string
`role` | [AccountMemberRoleV1](AccountMemberRoleV1.md)

## Example

```typescript
import type { AccountMemberV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "displayName": null,
  "email": null,
  "role": null,
} satisfies AccountMemberV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountMemberV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


