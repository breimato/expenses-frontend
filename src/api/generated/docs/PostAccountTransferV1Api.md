# PostAccountTransferV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAccountTransferV1**](PostAccountTransferV1Api.md#postaccounttransferv1operation) | **POST** /v1/expenses/account-transfers | Post Account Transfer V1 |



## postAccountTransferV1

> AccountTransferV1Response postAccountTransferV1(postAccountTransferV1Request)

Post Account Transfer V1

Transfer money between two accounts owned by the user

### Example

```ts
import {
  Configuration,
  PostAccountTransferV1Api,
} from '';
import type { PostAccountTransferV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostAccountTransferV1Api(config);

  const body = {
    // PostAccountTransferV1Request
    postAccountTransferV1Request: ...,
  } satisfies PostAccountTransferV1OperationRequest;

  try {
    const data = await api.postAccountTransferV1(body);
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
| **postAccountTransferV1Request** | [PostAccountTransferV1Request](PostAccountTransferV1Request.md) |  | |

### Return type

[**AccountTransferV1Response**](AccountTransferV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | 201 Created |  -  |
| **400** | Bad Request |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

