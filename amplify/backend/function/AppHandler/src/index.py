import json
import os
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import uuid
from datetime import datetime
from decimal import Decimal
import re

# Helper class to convert a DynamoDB item to JSON
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def get_table_name(resource_name):
    # Amplify sets environment variables as STORAGE_{RESOURCE_NAME}_NAME
    return os.environ.get(f'STORAGE_{resource_name.upper()}_NAME')

def extract_youtube_id(url):
    """
    Extracts the YouTube Video ID from various URL formats.
    Supported:
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    """
    if not url: return None
    
    # Regular expression for YouTube ID
    # Matches 11 characters (alphanumeric, -, _) after v=, embed/, or pure short domain
    regex = r'(?:v=|\/)([0-9A-Za-z_-]{11}).*'
    match = re.search(regex, url)
    
    if match:
        return match.group(1)
    return url # Return original if extraction fails (fallback)

def handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    path = event.get('path')
    method = event.get('httpMethod')
    
    # Determine which resource is requested
    if '/schedules' in path:
        return handle_schedules(method, event)
    elif '/videos' in path:
        return handle_videos(method, event)
    else:
        return response(404, {'error': 'Resource not found'})

def handle_schedules(method, event):
    table_name = get_table_name('Schedules')
    if not table_name: return response(500, {'error': 'Schedules Table not configured'})
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    
    if method == 'GET':
        try:
            # Full scan
            resp = table.scan()
            items = resp.get('Items', [])
            
            # Sort: Sort Key is 'date' (String). 
            items.sort(key=lambda x: x.get('date', ''))
            
            return response(200, items)
        except ClientError as e:
            return response(500, {'error': str(e)})

    elif method in ['POST', 'PUT']:
        try:
            body = json.loads(event.get('body'))
            
            # Validation
            if not body.get('date') or not body.get('title'):
                return response(400, {'error': 'Missing required fields: date, title'})

            item_id = body.get('id', str(uuid.uuid4()))
            
            item = {
                'id': item_id,
                'date': body['date'], # ISO8601 String
                'title': body['title'],
                'location': body.get('location', ''),
                'details': body.get('details', ''),
                'imageUrl': body.get('imageUrl', None), # S3 URL
                'isArchived': body.get('isArchived', False),
                'updatedAt': datetime.utcnow().isoformat()
            }
            
            table.put_item(Item=item)
            return response(201, item)
            
        except Exception as e:
            print(e)
            return response(400, {'error': 'Invalid request'})
            
    elif method == 'DELETE':
        try:
            qs = event.get('queryStringParameters') or {}
            item_id = qs.get('id')
            item_date = qs.get('date') # Sort Key needed for Delete
            
            if not item_id or not item_date:
                if event.get('body'):
                     body = json.loads(event.get('body'))
                     item_id = body.get('id')
                     item_date = body.get('date')

            if not item_id or not item_date:
                return response(400, {'error': 'Missing id or date for deletion'})
                
            table.delete_item(
                Key={
                    'id': item_id,
                    'date': item_date
                }
            )
            return response(200, {'message': 'Deleted'})
        except Exception as e:
            return response(500, {'error': str(e)})

    return response(405, {'error': 'Method not allowed'})

def handle_videos(method, event):
    table_name = get_table_name('Videos')
    if not table_name: return response(500, {'error': 'Videos Table not configured'})
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    
    if method == 'GET':
        try:
            resp = table.scan()
            items = resp.get('Items', [])
            
            # Sort by displayOrder (number)
            items.sort(key=lambda x: int(x.get('displayOrder', 999)))
            
            return response(200, items)
        except ClientError as e:
            return response(500, {'error': str(e)})

    elif method in ['POST', 'PUT']:
        try:
            body = json.loads(event.get('body'))
            
            if not body.get('url') or not body.get('title'):
                return response(400, {'error': 'Missing required fields: url, title'})

            # Extract Video ID if possible
            raw_url = body['url']
            video_id = extract_youtube_id(raw_url)

            item_id = body.get('id', str(uuid.uuid4()))
            
            item = {
                'id': item_id,
                'displayOrder': int(body.get('displayOrder', 0)),
                'url': raw_url,     # Keep original
                'videoId': video_id, # Store extracted ID
                'title': body['title'],
                'updatedAt': datetime.utcnow().isoformat()
            }
            
            table.put_item(Item=item)
            return response(201, item)
        except Exception as e:
            print(e)
            return response(400, {'error': 'Invalid request'})

    elif method == 'DELETE':
        try:
            qs = event.get('queryStringParameters') or {}
            item_id = qs.get('id')
            item_order = qs.get('displayOrder')
            
            if not item_id or item_order is None:
                if event.get('body'):
                    body = json.loads(event.get('body'))
                    item_id = body.get('id')
                    item_order = body.get('displayOrder')

            if not item_id or item_order is None:
                 return response(400, {'error': 'Missing id or displayOrder'})

            table.delete_item(
                Key={
                    'id': item_id,
                    'displayOrder': int(item_order)
                }
            )
            return response(200, {'message': 'Deleted'})
        except Exception as e:
            return response(500, {'error': str(e)})

    return response(405, {'error': 'Method not allowed'})
    
def response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        },
        'body': json.dumps(body, cls=DecimalEncoder)
    }