# JeepCity

JeepCity is an ASP.NET Core MVC web application designed to provide information about Jeepney routes, fare matrices, and gather user feedback in Dagupan City.

## Features

- **Routes Viewing**: Interactive map and list of Jeepney routes in Dagupan.
- **Fare Matrix**: Display of current fare rates.
- **User Feedback**: Form for users to submit feedback (stored in database).
- **Admin/User View**: List of registered users/feedback.

## Prerequisites

Before running the application, ensure you have the following installed:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- SQL Server (LocalDB, Express, or Developer edition)

## Setup and Configuration

1.  **Clone/Open the project**
    Navigate to the project folder:

    ```bash
    cd JeepCity
    ```

2.  **Database Configuration**
    The application connects to a SQL Server database. Check `appsettings.json` and update the connection string if necessary to match your local SQL Server instance.

    Current default:

    ```json
    "ConnectionStrings": {
      "JeepCityConnectionString": "server=DESKTOP-IEHS4G5;database=JeepCity;Trusted_connection=true"
    }
    ```

    _Tip: If you are using a different computer, you likely need to change `server=DESKTOP-IEHS4G5` to `server=.` or `server=(localdb)\\mssqllocaldb`._

3.  **Trust HTTPS Certificate**
    For local development, trust the development certificate:
    ```bash
    dotnet dev-certs https --trust
    ```

## How to Run

1.  **Restore Dependencies**

    ```bash
    dotnet restore
    ```

2.  **Run the Application**

    ```bash
    dotnet run
    ```

3.  **Access the Website**
    Look at the terminal output for the localhost URL (typically `https://localhost:7152` or `http://localhost:5287`). Open this URL in your web browser.

## Project Structure

- `Controllers/`: Application logic (Home, Routes, Users).
- `Models/`: Database entities (`Domain`) and View models (`ViewModels`).
- `Views/`: Razor pages for the UI.
- `wwwroot/`: Static files (Issues, CSS, JS).

## Troubleshooting

- **Database Connection Error**: Ensure SQL Server is running and the connection string in `appsettings.json` is correct for your machine.
- **Not Secure Warning**: Run the `dotnet dev-certs https --trust` command and restart the browser.
- **Map Not Loading**: Ensure you have an active internet connection as it uses Google Maps embed.

## Deployment

### Deployment Options

For ASP.NET Core MVC with SQL Server, use one of these services:

1.  **Azure App Service** (Native support)

    - Create an App Service + Azure SQL Database.
    - Deploy directly from Visual Studio or GitHub Actions.
    - Best integration for .NET.

2.  **Railway/Render** (Container based)
    - Create a `Dockerfile` for your project.
    - Connect your GitHub repo to Railway or Render.
    - They will build the Docker container and host it.
