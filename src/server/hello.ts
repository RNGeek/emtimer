import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = (
  _event,
  _context,
  callback,
) => {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}
