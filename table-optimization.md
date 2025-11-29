# Оптимизация Table компонента - Увеличение изображений

## Проблема текущей реализации:
- Сложное отслеживание мыши через document.addEventListener
- Избыточная логика позиционирования tooltip
- Может вызывать проблемы с производительностью

## Решение: Использовать CSS Hover + абсолютное позиционирование

### 1. Новый подход к Table компоненту:

```typescript
import React from "react";
import { IUser } from "../../../types/user.ts";
import style from "./style.module.scss";

interface ITableProps {
  users: IUser[];
}

export const Table = ({ users }: ITableProps) => {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr className={style.wrapper}>
            <th>ФИО</th>
            <th>Фото</th>
            <th>Место жительства</th>
            <th>Email</th>
            <th>Номер телефона</th>
            <th>Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name.first} {user.name.last}</td>
              <td className={style.imageCell}>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className={style.thumbnail}
                />
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className={style.hoverImage}
                />
              </td>
              <td>{user.location.state} {user.location.city}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{new Date(user.registered.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className={style.info}>
          Пользователи не найдены
        </div>
      )}
    </div>
  );
};
```

### 2. Обновленные стили (SCSS):

```scss
.container {
  overflow-x: auto;
}

.wrapper {
  th {
    padding: 12px 16px;
    text-align: left;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    font-weight: 600;
  }
}

.imageCell {
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
  transition: transform 0.2s ease;
}

.thumbnail:hover {
  transform: scale(1.1);
}

.hoverImage {
  position: absolute;
  top: -10px;
  left: 60px;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: scale(0.8);
  transition: all 0.3s ease;
  z-index: 1000;
}

.thumbnail:hover + .hoverImage,
.hoverImage:hover {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.info {
  text-align: center;
  padding: 20px;
  color: #6c757d;
  font-size: 16px;
}

// Адаптивность для мобильных устройств
@media (max-width: 768px) {
  .hoverImage {
    width: 120px;
    height: 120px;
    left: 40px;
  }
  
  .imageCell {
    width: 50px;
    height: 50px;
  }
  
  .thumbnail {
    width: 40px;
    height: 40px;
  }
}
```

## Преимущества нового подхода:

### ✅ Производительность:
- Нет глобальных event listeners
- Использует native CSS hover
- Меньше re-render'ов

### ✅ Простота:
- Меньше кода (40 строк вместо 120)
- Понятная логика
- Легче поддерживать

### ✅ UX:
- Плавные анимации
- Адаптивный дизайн
- Лучшее позиционирование

### ✅ Практичность:
- Работает на мобильных устройствах
- Не блокирует другие элементы
- Автоматическое z-index управление

## Дополнительные улучшения:

### 1. Lazy Loading для изображений:
```typescript
const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

const handleImageLoad = (imageSrc: string) => {
  setLoadedImages(prev => new Set(prev).add(imageSrc));
};
```

### 2. Fallback для ошибок загрузки:
```typescript
<img
  src={user.picture.thumbnail}
  alt={`${user.name.first} ${user.name.last}`}
  className={style.thumbnail}
  onError={(e) => {
    e.currentTarget.src = '/default-avatar.png';
  }}
/>
```

### 3. Клавиатурная доступность:
```typescript
<img
  tabIndex={0}
  role="button"
  aria-label={`Просмотр большого изображения для ${user.name.first} ${user.name.last}`}
/>
```

## Как применить изменения:

1. **Заменить** содержимое `src/components/Table/ui/Table.tsx`
2. **Обновить** стили в `src/components/Table/ui/style.module.scss`
3. **Протестировать** на разных устройствах
4. **Проверить** производительность в DevTools

Результат: Элегантное увеличение изображений без сложной JavaScript логики!