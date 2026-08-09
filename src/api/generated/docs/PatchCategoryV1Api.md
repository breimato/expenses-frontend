# PatchCategoryV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**patchCategoryV1**](PatchCategoryV1Api.md#patchcategoryv1operation) | **PATCH** /v1/expenses/categories/{id} | Patch Category V1 |



## patchCategoryV1

> CategoryV1Response patchCategoryV1(id, patchCategoryV1Request)

Patch Category V1

Partially update a category

### Example

```ts
import {
  Configuration,
  PatchCategoryV1Api,
} from '';
import type { PatchCategoryV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PatchCategoryV1Api(config);

  const body = {
    // number | Category identifier
    id: 56,
    // PatchCategoryV1Request
    patchCategoryV1Request: ...,
  } satisfies PatchCategoryV1OperationRequest;

  try {
    const data = await api.patchCategoryV1(body);
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
| **patchCategoryV1Request** | [PatchCategoryV1Request](PatchCategoryV1Request.md) |  | |

### Return type

[**CategoryV1Response**](CategoryV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **404** | Not Found - Category not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

