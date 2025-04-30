import json
import boto3
import base64
from botocore.exceptions import ClientError

s3 = boto3.client('s3')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    file_name = body['fileName']
    file_content = body['fileContent']
    mime_type = body['mimeType']
    
    file_bytes = base64.b64decode(file_content)
    
    params = {
        'Bucket': 'practica2semi1a1s2025archivosg9',
        'Key': f'Fotos/{file_name}',
        'Body': file_bytes,
        'ContentType': mime_type
    }

    try:
        s3.put_object(**params)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Imagen subida correctamente.',
                'url': f'https://practica2semi1a1s2025archivosg9.s3.amazonaws.com/Fotos/{file_name}'
            })
        }
    
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
