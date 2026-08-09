# DeleteCategoryV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteCategoryV1**](DeleteCategoryV1Api.md#deletecategoryv1) | **DELETE** /v1/expenses/categories/{id} | Delete Category V1 |



## deleteCategoryV1

> deleteCategoryV1(id)

Delete Category V1

Delete a category

### Example

```ts
import {
  Configuration,
  DeleteCategoryV1Api,
} from '';
import type { DeleteCategoryV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DeleteCategoryV1Api(config);

  const body = {
    // number | Category identifier
    id: 56,
  } satisfies DeleteCategoryV1Request;

  try {
    const data = await api.deleteCategoryV1(body);
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
| **id** | `number` | Category identifier | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | 204 No Content |  -  |
| **404** | Not Found - Category not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

