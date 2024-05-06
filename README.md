| Endpoint | Method | Description | Body Request | Body Response |
| :---: | :---: | :---: | :---: | :---: |
| /todos | GET | Fetch all todos | - | [{"id":{id}, "title":{title}, "completed":{completed}}] |
| /todos/{id} | GET | Fetch with provided id | - | {"id":{id}, "title":{title}, "completed":{completed}} |
| /todos/new | POST | Create new todo | {"id":{id}, "title":{title}, "completed":{completed}} | {"message":{message}} |
| /todos/edit/{id} | PUT | Edit title | {"title":{title}} | {"error":{error}} \| {"id":{id}, "title":{title}, "completed":{completed}} |
| /todos/toggle/{id} | PUT | Toggle todo | - | {"error":{error}} \| - |
| /todos/delete/{id} | DELETE | Delete todo | - | {"error":{error}} \| {"message":{message}} |