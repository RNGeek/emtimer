import { APIGatewayProxyHandler } from 'aws-lambda'

// BigQuery にメモリ使用量を送信するためのプロキシ

export const handler: APIGatewayProxyHandler = (
  event,
  _context,
  callback,
) => {
  if (event.httpMethod !== 'POST') {
    return callback(null, { statusCode: 405, body: 'Method Not Allowed' })
  }
  if (event.body === null) {
    return callback(null, { statusCode: 400, body: 'Bad Request' })
  }
  const data = JSON.parse(event.body)
  console.log(data) // TODO: BigQuery に data を送信する
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}
