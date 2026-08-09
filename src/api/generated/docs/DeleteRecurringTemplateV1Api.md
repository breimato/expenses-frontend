# DeleteRecurringTemplateV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteRecurringTemplateV1**](DeleteRecurringTemplateV1Api.md#deleterecurringtemplatev1) | **DELETE** /v1/expenses/recurring-templates/{id} | Delete Recurring Template V1 |



## deleteRecurringTemplateV1

> deleteRecurringTemplateV1(id)

Delete Recurring Template V1

Delete a recurring template

### Example

```ts
import {
  Configuration,
  DeleteRecurringTemplateV1Api,
} from '';
import type { DeleteRecurringTemplateV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DeleteRecurringTemplateV1Api(config);

  const body = {
    // number | Recurring template identifier
    id: 56,
  } satisfies DeleteRecurringTemplateV1Request;

  try {
    const data = await api.deleteRecurringTemplateV1(body);
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
| **id** | `number` | Recurring template identifier | [Defaults to `undefined`] |

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
| **404** | Not Found - Recurring template not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

