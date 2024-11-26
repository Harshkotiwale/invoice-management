# Invoice Management System

A full-stack invoice management application built with Django REST Framework and React.

## Features

- Create, read, update, and delete invoices
- Add multiple line items to each invoice
- Automatic calculation of line totals and invoice totals
- Search and filter invoices
- Responsive design
- Docker support for easy deployment

## Tech Stack

### Backend
- Django 5.0
- Django REST Framework
- SQLite (can be easily switched to PostgreSQL)
- CORS headers for frontend communication

### Frontend
- React 18
- React Hook Form for form management
- Tailwind CSS for styling
- Axios for API communication
- React Hot Toast for notifications
- Heroicons for icons

## Setup Instructions

### Without Docker

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### With Docker

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/

## API Documentation

### Endpoints

#### GET /api/invoices/
- Returns a paginated list of invoices
- Supports search parameter: `/api/invoices/?search=term`

#### POST /api/invoices/
- Creates a new invoice
- Request body example:
  ```json
  {
    "invoice_number": "INV001",
    "customer_name": "John Doe",
    "date": "2024-11-12",
    "details": [
      {
        "description": "Product A",
        "quantity": 2,
        "unit_price": 50.00
      },
      {
        "description": "Product B",
        "quantity": 1,
        "unit_price": 75.00
      }
    ]
  }
  ```

#### PUT /api/invoices/{id}/
- Updates an existing invoice
- Request body format same as POST

#### DELETE /api/invoices/{id}/
- Deletes an invoice

## Additional Information

### Code Organization

The project follows a standard structure for both Django and React applications:

- Backend:
  - `invoiceapi/`: Main Django project directory
  - `invoices/`: Django app containing models, views, and serializers
  - `requirements.txt`: Python dependencies

- Frontend:
  - `src/components/`: React components
  - `src/contexts/`: React context for state management
  - `src/App.js`: Main application component

### Security Considerations

- CORS is configured to allow frontend access
- Form validation is implemented on both frontend and backend
- Django's built-in security features are enabled

### Deployment

The application can be deployed to any platform that supports Docker containers. Some recommended platforms:
- Heroku
- DigitalOcean
- AWS ECS
- Google Cloud Run

## Future Improvements

1. Add authentication and user management
2. Implement export to PDF functionality
3. Add more detailed reporting and analytics
4. Implement email notifications
5. Add unit tests for both frontend and backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- [Django REST Framework Documentation](https://www.django-rest-framework.org/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)