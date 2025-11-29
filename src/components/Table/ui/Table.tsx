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