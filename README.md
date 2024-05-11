| Endpoint | Method | Description | Body Request | Body Response |
| :---: | :---: | :---: | :---: | :---: |
| /todos | GET | Fetch all todos | - | [{"id":{id}, "title":{title}, "completed":{completed}}] |
| /todos/{id} | GET | Fetch with provided id | - | {"id":{id}, "title":{title}, "completed":{completed}} |
| /todos/new | POST | Create new todo | {"id":{id}, "title":{title}, "completed":{completed}} | {"title":{title}} |
| /todos/edit/{id} | PATCH | Edit title | {"title":{title}} | - |
| /todos/toggle/{id} | PATCH | Toggle todo | - | {"title": {title}, "id": {id}, "completed": {completed}} |
| /todos/delete/{id} | DELETE | Delete todo | - | - |