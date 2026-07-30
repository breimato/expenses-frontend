
# GetCategoriesV1Filters

Get Categories V1 Request

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`movementType` | [MovementTypeV1](MovementTypeV1.md)

## Example

```typescript
import type { GetCategoriesV1Filters } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "movementType": null,
} satisfies GetCategoriesV1Filters

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetCategoriesV1Filters
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


