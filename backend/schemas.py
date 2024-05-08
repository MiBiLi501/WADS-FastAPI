from pydantic import BaseModel


class TodoItemBase(BaseModel):
    title:str
    
class TodoCreate(TodoItemBase):
    pass

class TodoEdit(TodoItemBase):
    pass

class TodoItem(TodoItemBase):
    id: int
    completed:bool

    class Config:
        orm_mode = True