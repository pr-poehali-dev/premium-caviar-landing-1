import json
import os
import base64
import uuid
import boto3
import psycopg2
import psycopg2.extras

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p71088692_premium_caviar_landi')
DEFAULT_ADMIN_PASSWORD = 'EC2|5{Id4o8cWV0gNLTM'

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Max-Age': '86400',
}


def resp(status: int, data) -> dict:
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False, default=str),
    }


def is_admin(event: dict) -> bool:
    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    expected = os.environ.get('ADMIN_PASSWORD') or DEFAULT_ADMIN_PASSWORD
    return headers.get('x-admin-password') == expected


def db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def query(sql: str, params=None, fetch: str = 'all'):
    conn = db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(sql, params)
    result = None
    if fetch == 'all':
        result = [dict(r) for r in cur.fetchall()]
    elif fetch == 'one':
        row = cur.fetchone()
        result = dict(row) if row else None
    conn.commit()
    cur.close()
    conn.close()
    return result


def product_out(r: dict) -> dict:
    return {
        'id': str(r['id']),
        'title': r['title'],
        'description': r['description'] or '',
        'fullDescription': r['full_description'] or '',
        'image': r['image'] or '',
        'price': r['price'] or '',
        'promo': r['promo'],
    }


def news_out(r: dict) -> dict:
    return {
        'id': r['id'],
        'title': r['title'],
        'content': r['content'] or '',
        'image': r['image'] or '',
        'is_published': r['is_published'],
        'created_at': r['created_at'].isoformat() if r['created_at'] else None,
    }


def order_out(r: dict) -> dict:
    return {
        'id': r['id'],
        'name': r['name'],
        'phone': r['phone'],
        'comment': r['comment'] or '',
        'status': r['status'] or 'new',
        'created_at': r['created_at'].isoformat() if r['created_at'] else None,
    }


def handle_products(method: str, body: dict, params: dict, admin: bool) -> dict:
    t = f'{SCHEMA}.products'
    if method == 'GET':
        rows = query(f'SELECT * FROM {t} ORDER BY sort_order, id')
        return resp(200, {'products': [product_out(r) for r in rows]})
    if not admin:
        return resp(401, {'error': 'Нужна авторизация'})
    promo = body.get('promo')
    promo_json = json.dumps(promo, ensure_ascii=False) if promo else None
    if method == 'POST':
        row = query(
            f'INSERT INTO {t} (title, description, full_description, image, price, promo, sort_order) '
            f'VALUES (%s, %s, %s, %s, %s, %s, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM {t})) RETURNING *',
            (body.get('title', 'Новый товар'), body.get('description', ''), body.get('fullDescription', ''),
             body.get('image', ''), str(body.get('price', '')), promo_json), 'one')
        return resp(200, {'product': product_out(row)})
    if method == 'PUT':
        row = query(
            f'UPDATE {t} SET title=%s, description=%s, full_description=%s, image=%s, price=%s, promo=%s '
            f'WHERE id=%s RETURNING *',
            (body.get('title', ''), body.get('description', ''), body.get('fullDescription', ''),
             body.get('image', ''), str(body.get('price', '')), promo_json, int(body['id'])), 'one')
        if not row:
            return resp(404, {'error': 'Товар не найден'})
        return resp(200, {'product': product_out(row)})
    if method == 'DELETE':
        query(f'DELETE FROM {t} WHERE id=%s', (int(params.get('id') or body.get('id')),), None)
        return resp(200, {'success': True})
    return resp(405, {'error': 'Method not allowed'})


def handle_news(method: str, body: dict, params: dict, admin: bool) -> dict:
    t = f'{SCHEMA}.news'
    if method == 'GET':
        where = '' if admin else 'WHERE is_published = TRUE'
        rows = query(f'SELECT * FROM {t} {where} ORDER BY created_at DESC, id DESC')
        return resp(200, {'news': [news_out(r) for r in rows]})
    if not admin:
        return resp(401, {'error': 'Нужна авторизация'})
    if method == 'POST':
        row = query(
            f'INSERT INTO {t} (title, content, image, is_published) VALUES (%s, %s, %s, %s) RETURNING *',
            (body.get('title', 'Новая новость'), body.get('content', ''), body.get('image', ''),
             bool(body.get('is_published', True))), 'one')
        return resp(200, {'item': news_out(row)})
    if method == 'PUT':
        row = query(
            f'UPDATE {t} SET title=%s, content=%s, image=%s, is_published=%s WHERE id=%s RETURNING *',
            (body.get('title', ''), body.get('content', ''), body.get('image', ''),
             bool(body.get('is_published', True)), int(body['id'])), 'one')
        if not row:
            return resp(404, {'error': 'Новость не найдена'})
        return resp(200, {'item': news_out(row)})
    if method == 'DELETE':
        query(f'DELETE FROM {t} WHERE id=%s', (int(params.get('id') or body.get('id')),), None)
        return resp(200, {'success': True})
    return resp(405, {'error': 'Method not allowed'})


def handle_orders(method: str, body: dict, params: dict, admin: bool) -> dict:
    t = f'{SCHEMA}.orders'
    if method == 'POST':
        name = (body.get('name') or '').strip()
        phone = (body.get('phone') or '').strip()
        if not name or not phone:
            return resp(400, {'error': 'Имя и телефон обязательны'})
        row = query(f'INSERT INTO {t} (name, phone) VALUES (%s, %s) RETURNING id', (name[:255], phone[:50]), 'one')
        return resp(200, {'success': True, 'order_id': row['id'],
                          'message': 'Заявка принята! Мы свяжемся с вами в ближайшее время.'})
    if not admin:
        return resp(401, {'error': 'Нужна авторизация'})
    if method == 'GET':
        rows = query(f'SELECT * FROM {t} ORDER BY created_at DESC, id DESC')
        return resp(200, {'orders': [order_out(r) for r in rows]})
    if method == 'PUT':
        row = query(
            f'UPDATE {t} SET name=%s, phone=%s, comment=%s, status=%s WHERE id=%s RETURNING *',
            (body.get('name', ''), body.get('phone', ''), body.get('comment', ''),
             body.get('status', 'new'), int(body['id'])), 'one')
        if not row:
            return resp(404, {'error': 'Заявка не найдена'})
        return resp(200, {'order': order_out(row)})
    if method == 'DELETE':
        query(f'DELETE FROM {t} WHERE id=%s', (int(params.get('id') or body.get('id')),), None)
        return resp(200, {'success': True})
    return resp(405, {'error': 'Method not allowed'})


ALLOWED_TYPES = {'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif'}


def handle_upload(method: str, body: dict, admin: bool) -> dict:
    if method != 'POST':
        return resp(405, {'error': 'Method not allowed'})
    if not admin:
        return resp(401, {'error': 'Нужна авторизация'})
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
    if len(data) > 5 * 1024 * 1024:
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
    return resp(200, {'url': f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"})


def handler(event: dict, context) -> dict:
    '''Единое API сайта: товары, новости, заявки и вход в админку'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    resource = params.get('resource', '')
    raw = event.get('body') or '{}'
    if event.get('isBase64Encoded'):
        raw = base64.b64decode(raw).decode('utf-8')
    body = json.loads(raw) if raw.strip() else {}
    admin = is_admin(event)

    if resource == 'login':
        return resp(200 if admin else 401, {'success': admin})
    if resource == 'products':
        return handle_products(method, body, params, admin)
    if resource == 'news':
        return handle_news(method, body, params, admin)
    if resource == 'upload':
        return handle_upload(method, body, admin)
    if resource == 'orders':
        return handle_orders(method, body, params, admin)
    return resp(404, {'error': 'Unknown resource'})