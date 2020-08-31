import { APIGatewayProxyHandler } from 'aws-lambda'
import { BigQuery } from '@google-cloud/bigquery'

const bigqueryClient = new BigQuery({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON ?? '{}'),
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
})
const dataset = bigqueryClient.dataset('user_dataset')
const table = dataset.table('memory_measurement')

async function insertMemoryMeasurement (data: any) {
  return new Promise((resolve, reject) => {
    table.insert([{
      json: data,
    }], (err, apiResponse) => {
      if (err) {
        return reject(err)
      }
      resolve(apiResponse)
    })
  })
}

// BigQuery にメモリ使用量を送信するためのプロキシ

export const handler: APIGatewayProxyHandler = async (
  event,
  _context,
) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  if (event.body === null) {
    return { statusCode: 400, body: 'Bad Request' }
  }
  const data = JSON.parse(event.body)
  console.log(data)
  await insertMemoryMeasurement(data)
  return {
    statusCode: 200,
    body: 'success',
  }
}
