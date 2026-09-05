# DeleteAccountMemberV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteAccountMemberV1**](DeleteAccountMemberV1Api.md#deleteaccountmemberv1) | **DELETE** /v1/expenses/accounts/{id}/members/{userId} | Delete Account Member V1 |



## deleteAccountMemberV1

> deleteAccountMemberV1(id, userId)

Delete Account Member V1

Remove a MEMBER from an account (OWNER only)

### Example

```ts
import {
  Configuration,
  DeleteAccountMemberV1Api,
} from '';
import type { DeleteAccountMemberV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DeleteAccountMemberV1Api(config);

  const body = {
    // number
    id: 56,
    // number
    userId: 56,
  } satisfies DeleteAccountMemberV1Request;

  try {
    const data = await api.deleteAccountMemberV1(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | 204 No Content |  -  |
| **403** | Forbidden |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

