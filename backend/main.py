from fastapi import FastAPI, HTTPException, Depends
from typing import Optional, List, Dict
from pydantic import BaseModel
from uuid import UUID, uuid4
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODEL - usually put in a seperate file
# class TodoItem(BaseModel):
#     id: UUID
#     title: str
#     completed: bool = False

# class UpdateTodo(BaseModel):
#     id: Optional[UUID] = None
#     title: Optional[str] = None
#     completed: Optional[bool] = None

# class Title(BaseModel):
#     title: Optional[str] = None
    
# EMPTY STRING
todos = {}

# To do methods
# - fetch all todos
# @app.get('/todos')
# def get_all_todos():
#     print(todos)
#     return list(todos.values())

@app.get('/todos', response_model=List[schemas.TodoItem])
def get_all_todos(db: Session = Depends(get_db)):
    db_todos = crud.get_todos(db)
    return db_todos


# - fetch by id
# @app.get('/todos/{id}')
# def get_todo(id: UUID):
#     if id not in todos:
#         return {"error":"title not found"}
#     return todos[id]

@app.get('/todos/{id}', response_model=schemas.TodoItem)
def get_todo(id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id=id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

# - post new todo
# @app.post('/todos/new')
# def post_todo(todo: TodoItem) -> dict:
#     todos[todo.id] = todo
#     return {
#         "message": "Todo added." 
#     }

@app.post('/todos/new', response_model=schemas.TodoCreate)
def post_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    db_todo = crud.create_todo(db, todo)

    return db_todo

@app.patch("/todos/edit/{id}")
def edit_todo(id: int, todo: schemas.TodoEdit, db: Session = Depends(get_db)):
    db_todo = crud.edit_todo(db, id, todo)
    return db_todo

# - updates todo
# @app.put("/todos/edit/{id}")
# def update_todo(id: UUID, title: Title):
#     if id not in todos:
#         return {'error':'ID not found'}

#     if title.title:
#         todos[id].title = title.title
    
#     return todos[id]

@app.patch("/todos/toggle/{id}", response_model=schemas.TodoItem)
def toggle_todo(id: int, db: Session = Depends(get_db)):
    db_todo = crud.toggle_todo(db=db, todo_id=id)
    return db_todo

# @app.put("/todos/toggle/{id}")
# def toggle_todo(id: UUID):
#     if id not in todos:
#         return {"error" : "ID not found"}
    
#     todos[id].completed = not todos[id].completed

# - removes an existing todo
# @app.delete("/todos/delete/{id}")
# async def delete_todo(id: UUID):
#     if id not in todos:
#         return {"error":"ID not found"}
#     del todos[id]
#     return {"message":"todo has been deleted successfully"}
@app.delete("/todos/delete/{id}", response_model=None)
def delete_todo(id: int, db: Session = Depends(get_db)):
    crud.delete_todo(db=db, todo_id=id)