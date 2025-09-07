# MindSoothe API

MindSoothe API is a backend project built with **Django** and **Django REST Framework**. It allows users to securely log daily thoughts, moods, and journal entries to support mental wellness.

## Current Status
Django project initialized (`mindsoothe`)  
Virtual environment set up (`venv`)  
Installed Django REST Framework  
Created `journal` app  
Defined `JournalEntry` model with fields: user, title, content, mood, created_at, updated_at  
Created serializer for `JournalEntry`  
Set up CRUD API views (list, create, retrieve, update, delete)  
Configured URLs (`/api/entries/` and `/api/entries/<id>/`)  
Applied migrations to create the database table  
Git initialized and changes committed  

## Next Steps

- Implement authentication with `users` app (register/login)  
- Connect `JournalEntry` API with authenticated users  
- Add filtering by mood or date  
- Test endpoints using Postman  
- Optionally add features like tags or mood trends  
