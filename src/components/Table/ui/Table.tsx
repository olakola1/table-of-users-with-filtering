import React, {useState} from "react";
import {IUser} from "../../../types/user.ts";
import style from "./style.module.scss";

interface ITableProps {
  users: IUser[];
}

export const Table= ({users}:ITableProps) => {
  const [tooltip, setTooltip] = useState<{ visible: boolean; image: string; x: number; y: number }>({
    visible: false,
    image: '',
    x: 0,
    y: 0
  });

      const handleImageMouseEnter = (event: React.MouseEvent, largeImage: string) => {
        setTooltip({
          visible: true,
          image: largeImage,
          x: event.clientX,
          y: event.clientY
        });
      };

      const handleImageMouseLeave = () => {
        setTooltip({
          visible: false,
          image: '',
          x: 0,
          y: 0
        });
      };

      const handleMouseMove = (event: React.MouseEvent) => {
        if (tooltip.visible) {
          setTooltip(prev => ({
            ...prev,
            x: event.clientX,
            y: event.clientY
          }));
        }
      };

      return (
        <div onMouseMove={handleMouseMove}
             className={style.container}>
          <table>
            <thead>
            <tr>
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
                <td>{user.name.first}{user.name.last}</td>
                <td>
                  <img
                    src={user.picture.thumbnail}
                    alt={`${user.name.first} ${user.name.last}`}
                    onMouseEnter={(event) => handleImageMouseEnter(event, user.picture.large)}
                    onMouseLeave={handleImageMouseLeave}/>

                </td>
                <td>{user.location.state}{user.location.city}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.registered.date).toLocaleDateString()}</td>
              </tr>
            ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Пользователи не найдены
            </div>
          )}

          {tooltip.visible && (
            <div
              style={{
                position: 'fixed',
                left: tooltip.x + 10,
                top: tooltip.y + 10,
                zIndex: 1000,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <img
                src={tooltip.image}
                alt="Large preview"
                style={{ width: '150px', height: '150px', display: 'block' }}
              />
            </div>
          )}
        </div>
      );
};





