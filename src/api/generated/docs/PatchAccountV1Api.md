# PatchAccountV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**patchAccountV1**](PatchAccountV1Api.md#patchaccountv1operation) | **PATCH** /v1/expenses/accounts/{id} | Patch Account V1 |



## patchAccountV1

> AccountV1Response patchAccountV1(id, patchAccountV1Request)

Patch Account V1

Partially update an account

### Example

```ts
import {
  Configuration,
  PatchAccountV1Api,
} from '';
import type { PatchAccountV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PatchAccountV1Api(config);

  const body = {
    // number
    id: 56,
    // PatchAccountV1Request
    patchAccountV1Request: ...,
  } satisfies PatchAccountV1OperationRequest;

  try {
    const data = await api.patchAccountV1(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |
| **patchAccountV1Request** | [PatchAccountV1Request](PatchAccountV1Request.md) |  | |

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
| **200** | 200 OK |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

