# PostAccountInvitationAcceptV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAccountInvitationAcceptV1**](PostAccountInvitationAcceptV1Api.md#postaccountinvitationacceptv1) | **POST** /v1/expenses/invitations/{token} | Post Account Invitation Accept V1 |



## postAccountInvitationAcceptV1

> AccountV1Response postAccountInvitationAcceptV1(token)

Post Account Invitation Accept V1

Accept an invitation by token (registered user)

### Example

```ts
import {
  Configuration,
  PostAccountInvitationAcceptV1Api,
} from '';
import type { PostAccountInvitationAcceptV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostAccountInvitationAcceptV1Api(config);

  const body = {
    // string
    token: token_example,
  } satisfies PostAccountInvitationAcceptV1Request;

  try {
    const data = await api.postAccountInvitationAcceptV1(body);
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
| **400** | Bad Request |  -  |
| **404** | Not Found |  -  |
| **409** | Conflict |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

