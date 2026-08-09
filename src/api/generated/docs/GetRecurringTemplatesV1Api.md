# GetRecurringTemplatesV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getRecurringTemplatesV1**](GetRecurringTemplatesV1Api.md#getrecurringtemplatesv1) | **GET** /v1/expenses/recurring-templates | Get Recurring Templates V1 |



## getRecurringTemplatesV1

> GetRecurringTemplatesV1Response getRecurringTemplatesV1(categoryId)

Get Recurring Templates V1

Get all recurring templates, optionally filtered by search criteria

### Example

```ts
import {
  Configuration,
  GetRecurringTemplatesV1Api,
} from '';
import type { GetRecurringTemplatesV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetRecurringTemplatesV1Api(config);

  const body = {
    // number (optional)
    categoryId: 56,
  } satisfies GetRecurringTemplatesV1Request;

  try {
    const data = await api.getRecurringTemplatesV1(body);
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
| **categoryId** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**GetRecurringTemplatesV1Response**](GetRecurringTemplatesV1Response.md)

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

