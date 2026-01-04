import json
import os
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import uuid
from datetime import datetime
from decimal import Decimal

# Helper class to convert a DynamoDB item to JSON
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def get_table_name():
    # 環境変数からテーブル名を取得。設定されていない場合はデフォルト（ローカル用などのフォールバック）
    return os.environ.get('STORAGE_SCHEDULES_NAME')

def handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    method = event.get('httpMethod')
    path = event.get('path')
    
    dynamodb = boto3.resource('dynamodb')
    table_name = get_table_name()
    
    if not table_name:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': 'Table name not configured'})
        }

    table = dynamodb.Table(table_name)

    if method == 'GET':
        # /schedules: Retrieve all schedules
        try:
            # Note: Scan is clear for small datasets. For large datasets, consider Query with Index.
            response = table.scan()
            items = response.get('Items', [])
            
            # Sort by date (ascending)
            # Assuming date is YYYY-MM-DD format string
            items.sort(key=lambda x: x.get('date', ''))
            
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(items, cls=DecimalEncoder)
            }
        except ClientError as e:
            print(e)
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': str(e)})
            }

    elif method == 'POST':
        # /schedules: Create a new schedule (Admin only - Auth check is done by API Gateway usually, but good to check context if passed)
        # Assuming API Gateway is configured with Cognito User Pool Authorizer
        
        try:
            body = json.loads(event.get('body'))
            
            # Basic Validation
            if not body.get('date') or not body.get('title'):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': json.dumps({'error': 'Missing required fields: date, title'})
                }

            item = {
                'id': str(uuid.uuid4()),
                'date': body['date'], # Expecting YYYY-MM-DD
                'title': body['title'],
                'description': body.get('description', ''),
                'location': body.get('location', ''),
                'url': body.get('url', ''),
                'createdAt': datetime.utcnow().isoformat()
            }
            
            table.put_item(Item=item)
            
            return {
                'statusCode': 201,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(item, cls=DecimalEncoder)
            }
        except ClientError as e:
            print(e)
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': str(e)})
            }
        except Exception as e:
            print(e)
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': 'Invalid request body'})
            }

    else:
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }