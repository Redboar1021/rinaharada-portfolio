import json
import boto3
from botocore.exceptions import ClientError
import os

# Configuration
SENDER_EMAIL = "rinaharada.piano@gmail.com"
RECIPIENT_EMAIL = "rinaharada.piano@gmail.com"
REGION = os.environ.get('REGION', 'ap-northeast-1') 

def handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    method = event.get('httpMethod')
    
    if method != 'POST':
        return response(405, {'error': 'Method not allowed'})

    try:
        body = json.loads(event.get('body'))
        name = body.get('name')
        email = body.get('email')
        message = body.get('message')
        source = body.get('source', 'contact') # 'contact', 'lesson', etc.
        
        if not name or not email or not message:
             return response(400, {'error': 'Missing required fields'})

        # Subject Logic
        subject_prefix = "【HP Contact】お問い合わせ"
        if source == 'lesson':
            subject_prefix = "【HP Lesson】レッスンのお申し込み"
        elif source == 'concert':
            subject_prefix = "【HP Concert】演奏依頼"
            
        email_subject = f"{subject_prefix} by {name}"

        email_body = f"""
        Webサイトより新しいメッセージが届きました。
        
        ■送信元 ({source})
        お名前: {name}
        Email: {email}
        
        ■メッセージ本文
        ----------------------------------------
        {message}
        ----------------------------------------
        """
        
        client = boto3.client('ses', region_name=REGION)
        
        resp = client.send_email(
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
        
        return response(200, {'message': 'Email sent successfully', 'messageId': resp['MessageId']})

    except ClientError as e:
        print(e)
        return response(500, {'error': str(e)})
    except Exception as e:
        print(e)
        return response(400, {'error': 'Invalid request'})

def response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(body)
    }