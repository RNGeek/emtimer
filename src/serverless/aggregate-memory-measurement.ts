import { APIGatewayProxyHandler } from 'aws-lambda'
import { BigQuery } from '@google-cloud/bigquery'
import { config } from 'dotenv'

config({ debug: process.env.NODE_ENV !== 'production' }) // load `/.env`

const bigqueryClient = new BigQuery({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
})
const dataset = bigqueryClient.dataset('user_dataset')
const table = dataset.table('memory_measurement')

async function insertMemoryMeasurement (data: any) {
  return new Promise((resolve, reject) => {
    table.insert([data], (err, apiResponse) => {
      if (err) {
        console.log(JSON.stringify(err))
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
