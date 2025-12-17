import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-primary hover:text-accent transition-colors">
            <Icon name="ArrowLeft" size={20} />
            <span>Вернуться на главную</span>
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Icon name="Fish" size={32} className="text-background" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">EcoFish</h1>
              <p className="text-muted-foreground">Рыбное хозяйство</p>
            </div>
          </div>

          <Card className="p-8 rounded-3xl bg-secondary border-border">
            <h2 className="text-3xl font-bold mb-6 text-primary">Условия работы сайта</h2>
            
            <div className="space-y-6 text-foreground">
              <p>
                Соглашаясь с Условиями работы сайта (далее – Условия) и оставляя свои данные на сайте ekofish.shop (далее – Сайт), путем заполнения полей онлайн-заявки Пользователь:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>подтверждает, что указанные им данные принадлежат лично ему;</li>
                <li>признает и подтверждает, что он внимательно и в полном объеме ознакомился с настоящими Условиями;</li>
                <li>признает и подтверждает, что все положения настоящего Условий ему понятны;</li>
                <li>дает согласие на обработку Сайтом предоставляемых данных в целях для идентификации Пользователя, как клиента и связи с Пользователем для оказания услуг;</li>
                <li>выражает согласие с данными Условиями без каких-либо оговорок и ограничений.</li>
              </ul>

              <p className="font-semibold">
                Настоящее Условия применяются в отношении обработки следующих данных:
              </p>

              <ul className="list-disc pl-6">
                <li>номера телефонов;</li>
              </ul>

              <p>
                Пользователь предоставляет Сайту ekofish.shop право осуществлять следующие действия (операции) с пользовательскими данными:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>сбор и накопление;</li>
                <li>уточнение (обновление, изменение);</li>
                <li>использование в целях связи с Пользователем для указания услуг;</li>
                <li>уничтожение.</li>
              </ul>

              <p>
                Данные, собираемые на сайте, используются только для исполнения конкретного договора.
              </p>

              <p>
                Отзыв согласия с Условиями работы сайта может быть осуществлен путем направления Пользователем соответствующего распоряжения в простой письменной форме на адрес электронной почты:{' '}
                <a href="mailto:ahtuba-777@mail.ru" className="text-primary hover:text-accent underline">
                  ahtuba-777@mail.ru
                </a>
              </p>

              <p>
                Сайт не несет ответственности за использование (как правомерное, так и неправомерное) третьими лицами информации, размещенной Пользователем на Сайте, включая её воспроизведение и распространение, осуществленные всеми возможными способами.
              </p>

              <p>
                Сайт имеет право вносить изменения в настоящие Условия. При внесении изменений в актуальной редакции указывается дата последнего обновления. Новая редакция Условий вступает в силу с момента ее размещения, если иное не предусмотрено новой редакцией Условий.
              </p>

              <p>
                Действующая редакция всегда находится на странице по адресу:{' '}
                <a href="https://ekofish.shop/privacy" className="text-primary hover:text-accent underline break-all">
                  https://ekofish.shop/privacy
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;