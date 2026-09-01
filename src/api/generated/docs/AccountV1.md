
# AccountV1

Account V1

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`isDefault` | boolean
`balance` | string

## Example

```typescript
import type { AccountV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "isDefault": null,
  "balance": null,
} satisfies AccountV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


