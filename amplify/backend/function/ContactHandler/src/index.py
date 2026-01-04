import json
import boto3
from botocore.exceptions import ClientError
import os

# Configuration
# TODO: Move to Environment Variables if needed
SENDER_EMAIL = "rinaharada.piano@gmail.com"  # Must be verified in SES Sandbox
RECIPIENT_EMAIL = "rinaharada.piano@gmail.com"
REGION = os.environ.get('REGION', 'ap-northeast-1') 

def handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    method = event.get('httpMethod')
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body = json.loads(event.get('body'))
        name = body.get('name')
        email = body.get('email')
        message = body.get('message')
        
        if not name or not email or not message:
             return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST'
                },
                'body': json.dumps({'error': 'Missing required fields'})
            }

        # Create email body
        email_subject = f"[Portfolio Contact] Message from {name}"
        email_body = f"""
        You have received a new message from your portfolio website.
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        """
        
        client = boto3.client('ses', region_name=REGION)
        
        response = client.send_email(
            Destination={
                'ToAddresses': [RECIPIENT_EMAIL],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': email_body,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': email_subject,
                },
            },
            Source=SENDER_EMAIL,
            ReplyToAddresses=[email]
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'message': 'Email sent successfully', 'messageId': response['MessageId']})
        }

    except ClientError as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
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
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({'error': 'Invalid request'})
        }