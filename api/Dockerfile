# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project files
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the app
COPY . ./
RUN dotnet publish -c Release -o out


# Use the ASP.NET runtime image for running
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .


COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
# Expose the default port
EXPOSE 80

# Run the app
ENTRYPOINT ["/wait-for-it.sh","postgres:5432", "--" , "dotnet", "api.dll"]