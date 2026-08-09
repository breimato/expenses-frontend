# PostRecurringTemplateV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postRecurringTemplateV1**](PostRecurringTemplateV1Api.md#postrecurringtemplatev1operation) | **POST** /v1/expenses/recurring-templates | Post Recurring Template V1 |



## postRecurringTemplateV1

> RecurringTemplateV1Response postRecurringTemplateV1(postRecurringTemplateV1Request)

Post Recurring Template V1

Create a new recurring template

### Example

```ts
import {
  Configuration,
  PostRecurringTemplateV1Api,
} from '';
import type { PostRecurringTemplateV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostRecurringTemplateV1Api(config);

  const body = {
    // PostRecurringTemplateV1Request
    postRecurringTemplateV1Request: ...,
  } satisfies PostRecurringTemplateV1OperationRequest;

  try {
    const data = await api.postRecurringTemplateV1(body);
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
| **postRecurringTemplateV1Request** | [PostRecurringTemplateV1Request](PostRecurringTemplateV1Request.md) |  | |

### Return type

[**RecurringTemplateV1Response**](RecurringTemplateV1Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | 201 Created |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

