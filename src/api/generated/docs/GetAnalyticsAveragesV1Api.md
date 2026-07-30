# GetAnalyticsAveragesV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAnalyticsAveragesV1**](GetAnalyticsAveragesV1Api.md#getanalyticsaveragesv1operation) | **POST** /v1/expenses/analytics/averages | Get Analytics Averages V1 |



## getAnalyticsAveragesV1

> GetAnalyticsAveragesV1Response getAnalyticsAveragesV1(getAnalyticsAveragesV1Request)

Get Analytics Averages V1

Get expense averages by period

### Example

```ts
import {
  Configuration,
  GetAnalyticsAveragesV1Api,
} from '';
import type { GetAnalyticsAveragesV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GetAnalyticsAveragesV1Api();

  const body = {
    // GetAnalyticsAveragesV1Request
    getAnalyticsAveragesV1Request: ...,
  } satisfies GetAnalyticsAveragesV1OperationRequest;

  try {
    const data = await api.getAnalyticsAveragesV1(body);
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
| **getAnalyticsAveragesV1Request** | [GetAnalyticsAveragesV1Request](GetAnalyticsAveragesV1Request.md) |  | |

### Return type

[**GetAnalyticsAveragesV1Response**](GetAnalyticsAveragesV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

