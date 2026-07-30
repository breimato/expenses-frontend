# PostRecurringTemplateQuickAddV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postRecurringTemplateQuickAddV1**](PostRecurringTemplateQuickAddV1Api.md#postrecurringtemplatequickaddv1operation) | **POST** /v1/expenses/recurring-templates/{id}/quick-add | Post Recurring Template Quick Add V1 |



## postRecurringTemplateQuickAddV1

> ExpenseV1Response postRecurringTemplateQuickAddV1(id, postRecurringTemplateQuickAddV1Request)

Post Recurring Template Quick Add V1

Create an expense from a recurring template

### Example

```ts
import {
  Configuration,
  PostRecurringTemplateQuickAddV1Api,
} from '';
import type { PostRecurringTemplateQuickAddV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PostRecurringTemplateQuickAddV1Api();

  const body = {
    // number | Recurring template identifier
    id: 56,
    // PostRecurringTemplateQuickAddV1Request (optional)
    postRecurringTemplateQuickAddV1Request: ...,
  } satisfies PostRecurringTemplateQuickAddV1OperationRequest;

  try {
    const data = await api.postRecurringTemplateQuickAddV1(body);
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
| **postRecurringTemplateQuickAddV1Request** | [PostRecurringTemplateQuickAddV1Request](PostRecurringTemplateQuickAddV1Request.md) |  | [Optional] |

### Return type

[**ExpenseV1Response**](ExpenseV1Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | 201 Created |  -  |
| **404** | Not Found - Recurring template not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

