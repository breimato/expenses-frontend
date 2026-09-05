# DeleteAccountInvitationV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteAccountInvitationV1**](DeleteAccountInvitationV1Api.md#deleteaccountinvitationv1) | **DELETE** /v1/expenses/accounts/{id}/invitations/{invitationId} | Delete Account Invitation V1 |



## deleteAccountInvitationV1

> deleteAccountInvitationV1(id, invitationId)

Delete Account Invitation V1

Revoke a pending invitation (OWNER only)

### Example

```ts
import {
  Configuration,
  DeleteAccountInvitationV1Api,
} from '';
import type { DeleteAccountInvitationV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DeleteAccountInvitationV1Api(config);

  const body = {
    // number
    id: 56,
    // number
    invitationId: 56,
  } satisfies DeleteAccountInvitationV1Request;

  try {
    const data = await api.deleteAccountInvitationV1(body);
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
| **invitationId** | `number` |  | [Defaults to `undefined`] |

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

