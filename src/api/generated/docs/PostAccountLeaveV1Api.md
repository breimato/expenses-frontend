# PostAccountLeaveV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postAccountLeaveV1**](PostAccountLeaveV1Api.md#postaccountleavev1) | **POST** /v1/expenses/accounts/{id}/leave | Post Account Leave V1 |



## postAccountLeaveV1

> postAccountLeaveV1(id)

Post Account Leave V1

Leave a shared account (MEMBER only)

### Example

```ts
import {
  Configuration,
  PostAccountLeaveV1Api,
} from '';
import type { PostAccountLeaveV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostAccountLeaveV1Api(config);

  const body = {
    // number
    id: 56,
  } satisfies PostAccountLeaveV1Request;

  try {
    const data = await api.postAccountLeaveV1(body);
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

