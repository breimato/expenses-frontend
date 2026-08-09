# DeleteExpenseV1Api

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteExpenseV1**](DeleteExpenseV1Api.md#deleteexpensev1) | **DELETE** /v1/expenses/expenses/{id} | Delete Expense V1 |



## deleteExpenseV1

> deleteExpenseV1(id)

Delete Expense V1

Delete an expense

### Example

```ts
import {
  Configuration,
  DeleteExpenseV1Api,
} from '';
import type { DeleteExpenseV1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DeleteExpenseV1Api(config);

  const body = {
    // number | Expense identifier
    id: 56,
  } satisfies DeleteExpenseV1Request;

  try {
    const data = await api.deleteExpenseV1(body);
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
| **id** | `number` | Expense identifier | [Defaults to `undefined`] |

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
| **404** | Not Found - Expense not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

