# GetAnalyticsPeriodAverageV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAnalyticsPeriodAverageV1**](GetAnalyticsPeriodAverageV1Api.md#getanalyticsperiodaveragev1operation) | **POST** /v1/expenses/analytics/period-average | Get Analytics Period Average V1 |



## getAnalyticsPeriodAverageV1

> GetAnalyticsPeriodAverageV1Response getAnalyticsPeriodAverageV1(getAnalyticsPeriodAverageV1Request)

Get Analytics Period Average V1

Get daily average net spending for an inclusive date range

### Example

```ts
import {
  Configuration,
  GetAnalyticsPeriodAverageV1Api,
} from '';
import type { GetAnalyticsPeriodAverageV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetAnalyticsPeriodAverageV1Api(config);

  const body = {
    // GetAnalyticsPeriodAverageV1Request
    getAnalyticsPeriodAverageV1Request: ...,
  } satisfies GetAnalyticsPeriodAverageV1OperationRequest;

  try {
    const data = await api.getAnalyticsPeriodAverageV1(body);
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
| **getAnalyticsPeriodAverageV1Request** | [GetAnalyticsPeriodAverageV1Request](GetAnalyticsPeriodAverageV1Request.md) |  | |

### Return type

[**GetAnalyticsPeriodAverageV1Response**](GetAnalyticsPeriodAverageV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **400** | Bad Request |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

