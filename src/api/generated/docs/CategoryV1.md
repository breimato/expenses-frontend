
# CategoryV1

Category V1

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`color` | string
`icon` | string
`sortOrder` | number
`movementType` | [MovementTypeV1](MovementTypeV1.md)

## Example

```typescript
import type { CategoryV1 } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "color": null,
  "icon": null,
  "sortOrder": null,
  "movementType": null,
} satisfies CategoryV1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CategoryV1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


