from fastapi import HTTPException
from sqlalchemy.orm import Session
import models, schemas

# Read
def get_todo(db: Session, todo_id: int):
    return db.query(models.TodoItem).filter(models.TodoItem.id == todo_id).first()

def get_todos(db: Session):
    return db.query(models.TodoItem)

# Create
def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.TodoItem(title=todo.title, completed=False)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

# Patch
def edit_todo(db: Session, todo_id: int, todo: schemas.TodoEdit):
    db_todo = db.query(models.TodoItem).filter(models.TodoItem.id == todo_id).first()
    if not db_todo:
        return db_todo
    db_todo.title = todo.title
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)

def toggle_todo(db: Session, todo_id: int):
    db_todo = db.query(models.TodoItem).filter(models.TodoItem.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db_todo.completed = not db_todo.completed
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

# Delete
def delete_todo(db: Session, todo_id: int):
    db_todo = db.query(models.TodoItem).filter(models.TodoItem.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()