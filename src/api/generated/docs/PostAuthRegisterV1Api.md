# PostAuthRegisterV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAuthRegisterV1**](PostAuthRegisterV1Api.md#postauthregisterv1operation) | **POST** /v1/auth/register | Post Auth Register V1 |



## postAuthRegisterV1

> AuthV1Response postAuthRegisterV1(postAuthRegisterV1Request)

Post Auth Register V1

Register a new user with email and password

### Example

```ts
import {
  Configuration,
  PostAuthRegisterV1Api,
} from '';
import type { PostAuthRegisterV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostAuthRegisterV1Api();

  const body = {
    // PostAuthRegisterV1Request
    postAuthRegisterV1Request: ...,
  } satisfies PostAuthRegisterV1OperationRequest;

  try {
    const data = await api.postAuthRegisterV1(body);
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
| **postAuthRegisterV1Request** | [PostAuthRegisterV1Request](PostAuthRegisterV1Request.md) |  | |

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
| **201** | 201 Created |  -  |
| **409** | Conflict |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

