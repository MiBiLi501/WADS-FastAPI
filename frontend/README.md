|Endpoint|Method|Server request|Server Response|
|---|---|---|---|
|/todos/{todo_id}|GET|None|{"title": str, "completed": bool, "id": str}|
|/todos|GET|{"title": str}|{"title": str, "completed": bool, "id": str}|
|/get-by-title-and-id|GET|{"title": str, "id": str}|{"title": str, "completed": bool, "id": str}|
|/todos/get/{todo_id}|GET|None|{"title": str, "completed": bool, "id": str}|
|/todos/post/{todo_id}|POST|{"id": str, "todo": Todo object}|{"title": str, "completed": bool, "id": str}|
|/todos/put/{todo_id}|PUT|{"id": str, "todo": Todo object}|None|
|/todos/delete/{todo_id}|DELETE|{"id": str}||