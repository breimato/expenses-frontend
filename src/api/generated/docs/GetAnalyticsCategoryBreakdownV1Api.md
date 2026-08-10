# GetAnalyticsCategoryBreakdownV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAnalyticsCategoryBreakdownV1**](GetAnalyticsCategoryBreakdownV1Api.md#getanalyticscategorybreakdownv1) | **POST** /v1/expenses/analytics/category-breakdown | Get Analytics Category Breakdown V1 |



## getAnalyticsCategoryBreakdownV1

> GetAnalyticsCategoryBreakdownV1Response getAnalyticsCategoryBreakdownV1(getAnalyticsAveragesV1Request)

Get Analytics Category Breakdown V1

Get monthly expense totals grouped by category

### Example

```ts
import {
  Configuration,
  GetAnalyticsCategoryBreakdownV1Api,
} from '';
import type { GetAnalyticsCategoryBreakdownV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GetAnalyticsCategoryBreakdownV1Api(config);

  const body = {
    // GetAnalyticsAveragesV1Request
    getAnalyticsAveragesV1Request: ...,
  } satisfies GetAnalyticsCategoryBreakdownV1Request;

  try {
    const data = await api.getAnalyticsCategoryBreakdownV1(body);
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

[**GetAnalyticsCategoryBreakdownV1Response**](GetAnalyticsCategoryBreakdownV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

