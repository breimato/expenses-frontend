# PostCategoryV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postCategoryV1**](PostCategoryV1Api.md#postcategoryv1operation) | **POST** /v1/expenses/categories | Post Category V1 |



## postCategoryV1

> CategoryV1Response postCategoryV1(postCategoryV1Request)

Post Category V1

Create a new category

### Example

```ts
import {
  Configuration,
  PostCategoryV1Api,
} from '';
import type { PostCategoryV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostCategoryV1Api();

  const body = {
    // PostCategoryV1Request
    postCategoryV1Request: ...,
  } satisfies PostCategoryV1OperationRequest;

  try {
    const data = await api.postCategoryV1(body);
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
| **postCategoryV1Request** | [PostCategoryV1Request](PostCategoryV1Request.md) |  | |

### Return type

[**CategoryV1Response**](CategoryV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | 201 Created |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

