import json
import os
import base64
import uuid
import boto3

DEFAULT_ADMIN_PASSWORD = 'EC2|5{Id4o8cWV0gNLTM'
ALLOWED_TYPES = {'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif'}
MAX_SIZE = 5 * 1024 * 1024

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Max-Age': '86400',
}


def resp(status: int, data: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False),
    }


def handler(event: dict, context) -> dict:
    '''Загрузка фото товаров и новостей в файловое хранилище (только для админа)'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}
    if method != 'POST':
        return resp(405, {'error': 'Method not allowed'})

    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    expected = os.environ.get('ADMIN_PASSWORD') or DEFAULT_ADMIN_PASSWORD
    if headers.get('x-admin-password') != expected:
        return resp(401, {'error': 'Нужна авторизация'})

    body = json.loads(event.get('body') or '{}')
    image = body.get('image') or ''
    if not image:
        return resp(400, {'error': 'Нет изображения'})

    content_type = 'image/jpeg'
    if image.startswith('data:') and ';' in image:
        content_type = image[5:image.index(';')]
    if content_type not in ALLOWED_TYPES:
        return resp(400, {'error': 'Поддерживаются только JPG, PNG, WEBP и GIF'})
    if ',' in image:
        image = image.split(',', 1)[1]

    data = base64.b64decode(image)
    if len(data) > MAX_SIZE:
        return resp(400, {'error': 'Размер файла не должен превышать 5 МБ'})

    folder = body.get('folder') if body.get('folder') in ('products', 'news') else 'uploads'
    key = f'{folder}/{uuid.uuid4().hex}.{ALLOWED_TYPES[content_type]}'

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    try:
        s3.put_object(Bucket='files', Key=key, Body=data, ContentType=content_type)
    except Exception as e:
        if '402' in str(e) or 'Payment Required' in str(e):
            return resp(402, {'error': 'Хранилище файлов недоступно: закончился лимит тарифа'})
        return resp(500, {'error': f'Не удалось загрузить фото: {e}'})

    url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
    return resp(200, {'url': url})
