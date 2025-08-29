# E.T.Rukavina DNS

A lightweight, fast, and reliable REST API for performing DNS lookups, supporting a wide range of DNS record types including ```A```, ```AAAA```, ```MX```, ```TXT```, ```PTR```, and more.

Built with simplicity and performance in mind, this API is ideal for developers needing programmatic access to DNS data for applications, monitoring, or automation.

## Features
- **Comprehensive DNS Support**: Query multiple DNS record types (```A```, ```AAAA```, ```MX```, ```TXT```, ```NS```, ```CNAME```, ```SOA```, ```SRV```, ```PTR```, ```NAPTR```, ```HINFO```, ```SPF```, ```ANY```).
- **Lightweight and Fast**: Minimal dependencies and optimized for low latency.
- **Easy Integration**: Simple RESTful endpoints for seamless integration into your applications.
- **Developer-Friendly**: Clear documentation, JSON responses, and open-source codebase.
- **MIT Licensed**: Freely use, modify, and distribute under the MIT License.

## Getting Started

### Prerequisites
- **Node.js**: Version 14.x or higher.
- **npm**: Node package manager (included with Node.js).
- A basic understanding of DNS concepts and REST APIs.

### Installation
Clone the repository and install dependencies to get the API up and running:
```bash
# Clone the repository
git clone https://github.com/etrukavina/dns.git

# Navigate to the project directory
cd dns

# Install dependencies
npm install

# Start the API in production mode
npm start

# Start the API in development mode (with auto-reload)
npm run dev
```
The API will be available at ```http://localhost:3000``` (or your configured port).

## Usage
```bash
# Query A records for a domain
curl http://dns.etrukavina.com/v1/A/example.com

# Perform a reverse DNS lookup for an IP address
curl http://dns.etrukavina.com/v1/reverse/8.8.8.8
```

## Endpoints
### Health Check
Check the API's status and version.
```
GET /health
```
Response:
```json
{ 
  "status": "ok", 
  "version": "x.x.x" 
}
```

### Reverse DNS Lookup
Retrieve the domain name(s) associated with an IP address.
```
GET /reverse/:ip
```
Example:
```
GET /reverse/8.8.8.8
```
Response:
```json
{
  "ip": "8.8.8.8",
  "records": [
    { "type": "PTR", "value": "dns.google" }
  ]
}
```

### DNS Records
Query DNS records for a specific domain and record type.
```
GET /:type/:domain
```
Supported record types: `A, AAAA, MX, TXT, NS, CNAME, SOA, SRV, PTR, NAPTR, HINFO, SPF, ANY`
Example:
```
GET /A/google.com
```
Response:
```json
{
  "domain": "google.com",
  "type": "A",
  "records": [
    { "type": "A", "value": "142.250.72.142" }
  ]
}
```

## Testing
The project includes a comprehensive test suite powered by Jest to ensure reliability and correctness.

Run the tests with:
```bash
npm test
```

This will execute unit and integration tests, verifying the API's functionality across various DNS queries.

## Contributing
Contributions are welcome! To contribute:

- Fork the repository.
- Create a new branch (```git checkout -b feature/your-feature```).
- Make your changes and commit (```git commit -m "Add your feature"```).
- Push to the branch (```git push origin feature/your-feature```).
- Open a pull request.

Please ensure your code follows the project's coding standards and includes tests for new functionality.

## License
This project is licensed under the MIT License. © 2025 E.T.Rukavina
See the LICENSE file for details.

## Contact
For questions, bug reports, or feature requests, please open an issue on the GitHub repository or contact the maintainer at dns@etrukavina.com.