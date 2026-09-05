# GetAccountInvitationV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountInvitationV1**](GetAccountInvitationV1Api.md#getaccountinvitationv1) | **GET** /v1/expenses/invitations/{token} | Get Account Invitation V1 |



## getAccountInvitationV1

> AccountInvitationPreviewV1Response getAccountInvitationV1(token)

Get Account Invitation V1

Preview an invitation by token

### Example

```ts
import {
  Configuration,
  GetAccountInvitationV1Api,
} from '';
import type { GetAccountInvitationV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetAccountInvitationV1Api(config);

  const body = {
    // string
    token: token_example,
  } satisfies GetAccountInvitationV1Request;

  try {
    const data = await api.getAccountInvitationV1(body);
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
| **token** | `string` |  | [Defaults to `undefined`] |

### Return type

[**AccountInvitationPreviewV1Response**](AccountInvitationPreviewV1Response.md)

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

