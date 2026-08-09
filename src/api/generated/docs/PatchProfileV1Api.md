# PatchProfileV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**patchProfileV1**](PatchProfileV1Api.md#patchprofilev1operation) | **PATCH** /v1/expenses/profile | Patch Profile V1 |



## patchProfileV1

> ProfileV1Response patchProfileV1(patchProfileV1Request)

Patch Profile V1

Partially update the app profile

### Example

```ts
import {
  Configuration,
  PatchProfileV1Api,
} from '';
import type { PatchProfileV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PatchProfileV1Api(config);

  const body = {
    // PatchProfileV1Request
    patchProfileV1Request: ...,
  } satisfies PatchProfileV1OperationRequest;

  try {
    const data = await api.patchProfileV1(body);
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
| **patchProfileV1Request** | [PatchProfileV1Request](PatchProfileV1Request.md) |  | |

### Return type

[**ProfileV1Response**](ProfileV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

