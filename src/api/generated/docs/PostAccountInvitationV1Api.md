# PostAccountInvitationV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAccountInvitationV1**](PostAccountInvitationV1Api.md#postaccountinvitationv1) | **POST** /v1/expenses/accounts/{id}/invitations | Post Account Invitation V1 |



## postAccountInvitationV1

> AccountInvitationV1Response postAccountInvitationV1(id)

Post Account Invitation V1

Create an invitation link for an account (OWNER only)

### Example

```ts
import {
  Configuration,
  PostAccountInvitationV1Api,
} from '';
import type { PostAccountInvitationV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostAccountInvitationV1Api(config);

  const body = {
    // number
    id: 56,
  } satisfies PostAccountInvitationV1Request;

  try {
    const data = await api.postAccountInvitationV1(body);
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

[**AccountInvitationV1Response**](AccountInvitationV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | 201 Created |  -  |
| **403** | Forbidden |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

