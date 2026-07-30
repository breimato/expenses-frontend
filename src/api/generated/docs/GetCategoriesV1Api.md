# GetCategoriesV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getCategoriesV1**](GetCategoriesV1Api.md#getcategoriesv1) | **GET** /v1/expenses/categories | Get Categories V1 |



## getCategoriesV1

> GetCategoriesV1Response getCategoriesV1(id, name, movementType)

Get Categories V1

Get all categories, optionally filtered by search criteria

### Example

```ts
import {
  Configuration,
  GetCategoriesV1Api,
} from '';
import type { GetCategoriesV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GetCategoriesV1Api();

  const body = {
    // number (optional)
    id: 56,
    // string (optional)
    name: name_example,
    // MovementTypeV1 (optional)
    movementType: ...,
  } satisfies GetCategoriesV1Request;

  try {
    const data = await api.getCategoriesV1(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` |  | [Optional] [Defaults to `undefined`] |
| **name** | `string` |  | [Optional] [Defaults to `undefined`] |
| **movementType** | `MovementTypeV1` |  | [Optional] [Defaults to `undefined`] [Enum: EXPENSE, INCOME] |

### Return type

[**GetCategoriesV1Response**](GetCategoriesV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

