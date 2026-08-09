# PostExpenseV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**postExpenseV1**](PostExpenseV1Api.md#postexpensev1operation) | **POST** /v1/expenses/expenses | Post Expense V1 |



## postExpenseV1

> ExpenseV1Response postExpenseV1(postExpenseV1Request)

Post Expense V1

Create a new expense

### Example

```ts
import {
  Configuration,
  PostExpenseV1Api,
} from '';
import type { PostExpenseV1OperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PostExpenseV1Api(config);

  const body = {
    // PostExpenseV1Request
    postExpenseV1Request: ...,
  } satisfies PostExpenseV1OperationRequest;

  try {
    const data = await api.postExpenseV1(body);
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
| **postExpenseV1Request** | [PostExpenseV1Request](PostExpenseV1Request.md) |  | |

### Return type

[**ExpenseV1Response**](ExpenseV1Response.md)

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

