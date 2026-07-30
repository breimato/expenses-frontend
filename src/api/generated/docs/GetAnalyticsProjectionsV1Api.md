# GetAnalyticsProjectionsV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAnalyticsProjectionsV1**](GetAnalyticsProjectionsV1Api.md#getanalyticsprojectionsv1operation) | **POST** /v1/expenses/analytics/projections | Get Analytics Projections V1 |



## getAnalyticsProjectionsV1

> GetAnalyticsProjectionsV1Response getAnalyticsProjectionsV1(getAnalyticsProjectionsV1Request)

Get Analytics Projections V1

Get expense projections for the current month

### Example

```ts
import {
  Configuration,
  GetAnalyticsProjectionsV1Api,
} from '';
import type { GetAnalyticsProjectionsV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GetAnalyticsProjectionsV1Api();

  const body = {
    // GetAnalyticsProjectionsV1Request
    getAnalyticsProjectionsV1Request: ...,
  } satisfies GetAnalyticsProjectionsV1OperationRequest;

  try {
    const data = await api.getAnalyticsProjectionsV1(body);
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
| **getAnalyticsProjectionsV1Request** | [GetAnalyticsProjectionsV1Request](GetAnalyticsProjectionsV1Request.md) |  | |

### Return type

[**GetAnalyticsProjectionsV1Response**](GetAnalyticsProjectionsV1Response.md)

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

