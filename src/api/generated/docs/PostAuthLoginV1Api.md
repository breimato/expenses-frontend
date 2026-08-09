# PostAuthLoginV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAuthLoginV1**](PostAuthLoginV1Api.md#postauthloginv1operation) | **POST** /v1/auth/login | Post Auth Login V1 |



## postAuthLoginV1

> AuthV1Response postAuthLoginV1(postAuthLoginV1Request)

Post Auth Login V1

Login with email and password

### Example

```ts
import {
  Configuration,
  PostAuthLoginV1Api,
} from '';
import type { PostAuthLoginV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostAuthLoginV1Api();

  const body = {
    // PostAuthLoginV1Request
    postAuthLoginV1Request: ...,
  } satisfies PostAuthLoginV1OperationRequest;

  try {
    const data = await api.postAuthLoginV1(body);
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
| **postAuthLoginV1Request** | [PostAuthLoginV1Request](PostAuthLoginV1Request.md) |  | |

### Return type

[**AuthV1Response**](AuthV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

