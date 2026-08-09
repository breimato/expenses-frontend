# RecurringApplicationsV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postRecurringTemplatesApplyPendingV1**](RecurringApplicationsV1Api.md#postrecurringtemplatesapplypendingv1) | **POST** /v1/expenses/recurring-applications | Post Recurring Applications V1 |



## postRecurringTemplatesApplyPendingV1

> PostRecurringTemplatesApplyPendingV1Response postRecurringTemplatesApplyPendingV1()

Post Recurring Applications V1

Create recurring applications due for the current period

### Example

```ts
import {
  Configuration,
  RecurringApplicationsV1Api,
} from '';
import type { PostRecurringTemplatesApplyPendingV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RecurringApplicationsV1Api(config);

  try {
    const data = await api.postRecurringTemplatesApplyPendingV1();
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

[**PostRecurringTemplatesApplyPendingV1Response**](PostRecurringTemplatesApplyPendingV1Response.md)

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

