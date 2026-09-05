# GetAccountMembersV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountMembersV1**](GetAccountMembersV1Api.md#getaccountmembersv1) | **GET** /v1/expenses/accounts/{id}/members | Get Account Members V1 |



## getAccountMembersV1

> GetAccountMembersV1Response getAccountMembersV1(id)

Get Account Members V1

List members of an account

### Example

```ts
import {
  Configuration,
  GetAccountMembersV1Api,
} from '';
import type { GetAccountMembersV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetAccountMembersV1Api(config);

  const body = {
    // number
    id: 56,
  } satisfies GetAccountMembersV1Request;

  try {
    const data = await api.getAccountMembersV1(body);
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

[**GetAccountMembersV1Response**](GetAccountMembersV1Response.md)

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

