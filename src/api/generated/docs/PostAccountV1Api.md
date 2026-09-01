# PostAccountV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAccountV1**](PostAccountV1Api.md#postaccountv1operation) | **POST** /v1/expenses/accounts | Post Account V1 |



## postAccountV1

> AccountV1Response postAccountV1(postAccountV1Request)

Post Account V1

Create a new account with default categories

### Example

```ts
import {
  Configuration,
  PostAccountV1Api,
} from '';
import type { PostAccountV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostAccountV1Api(config);

  const body = {
    // PostAccountV1Request
    postAccountV1Request: ...,
  } satisfies PostAccountV1OperationRequest;

  try {
    const data = await api.postAccountV1(body);
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
| **postAccountV1Request** | [PostAccountV1Request](PostAccountV1Request.md) |  | |

### Return type

[**AccountV1Response**](AccountV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | 201 Created |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

