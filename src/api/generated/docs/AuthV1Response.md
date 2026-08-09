
# AuthV1Response


## Properties

Name | Type
------------ | -------------
`accessToken` | string
`user` | [AuthUserV1](AuthUserV1.md)

## Example

```typescript
import type { AuthV1Response } from ''

// TODO: Update the object below with actual values
const example = {
  "accessToken": null,
  "user": null,
} satisfies AuthV1Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthV1Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


