# GetAccountsV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountsV1**](GetAccountsV1Api.md#getaccountsv1) | **GET** /v1/expenses/accounts | Get Accounts V1 |



## getAccountsV1

> GetAccountsV1Response getAccountsV1()

Get Accounts V1

List all accounts for the authenticated user

### Example

```ts
import {
  Configuration,
  GetAccountsV1Api,
} from '';
import type { GetAccountsV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetAccountsV1Api(config);

  try {
    const data = await api.getAccountsV1();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetAccountsV1Response**](GetAccountsV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

