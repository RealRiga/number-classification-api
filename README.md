# Number Classification API

## Overview

The Number Classification API is a simple RESTful service that classifies numbers based on various mathematical properties. It provides information about whether a number is prime, perfect, or an Armstrong number, along with its parity (odd/even) and the sum of its digits. Additionally, it fetches a fun fact about the number from the Numbers API.

## Features

- **Prime Number Check**: Determines if a number is prime.
- **Perfect Number Check**: Determines if a number is perfect.
- **Armstrong Number Check**: Determines if a number is an Armstrong (narcissistic) number.
- **Parity Check**: Identifies if a number is odd or even.
- **Digit Sum Calculation**: Computes the sum of the digits of a number.
- **Fun Fact Retrieval**: Fetches a fun fact about the number from the Numbers API.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RealRiga/number-classification-api
   cd number-classification-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and specify the port:

   ```plaintext
   PORT=3000
   ```

4. **Start the Server**

   ```bash
   node index.js
   ```

   The server will start on the port specified in the `.env` file (default is 3000).

## Using PM2 for Process Management

PM2 is a process manager for Node.js applications that allows you to keep your application running in the background, restart it automatically on crashes, and manage logs.

### Install PM2

```bash
npm install pm2 -g
```

### Start the Application with PM2

```bash
pm2 start index.js --name number-classification-api
```

### Common PM2 Commands

- **List all processes**: `pm2 list`
- **Stop a process**: `pm2 stop number-classification-api`
- **Restart a process**: `pm2 restart number-classification-api`
- **Delete a process**: `pm2 delete number-classification-api`
- **View logs**: `pm2 logs number-classification-api`

## Usage

### API Endpoint

- **GET** `/api/classify-number?number=<number>`

  - **Parameters**: 
    - `number` (required): The integer number to classify.

  - **Response**: 
    - `200 OK` with JSON containing the number's properties and a fun fact.
    - `400 Bad Request` if the input is invalid.

### Example Request

```bash
GET http://localhost:3000/api/classify-number?number=371
```

### Example Response

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number."
}
```

## Deployment

To deploy this API to a production environment, ensure that you set the appropriate environment variables and use PM2 to manage the Node.js application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [yisaa79@gmail.com] (mailto:yisaa79@gmail.com).