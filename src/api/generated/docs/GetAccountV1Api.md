# GetAccountV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountV1**](GetAccountV1Api.md#getaccountv1) | **GET** /v1/expenses/accounts/{id} | Get Account V1 |



## getAccountV1

> AccountV1Response getAccountV1(id)

Get Account V1

Get a single account by id

### Example

```ts
import {
  Configuration,
  GetAccountV1Api,
} from '';
import type { GetAccountV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetAccountV1Api(config);

  const body = {
    // number
    id: 56,
  } satisfies GetAccountV1Request;

  try {
    const data = await api.getAccountV1(body);
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

### Return type

[**AccountV1Response**](AccountV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

